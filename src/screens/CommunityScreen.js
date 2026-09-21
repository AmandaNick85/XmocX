import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { activities } from '../data/activities';
import { friends } from '../data/users';
import { getGameById } from '../data/games';
import { useApp } from '../context/AppContext';
import ActivityCard from '../components/ActivityCard';
import ScreenHeader from '../components/ScreenHeader';
import SectionHeader from '../components/SectionHeader';
import UserAvatar from '../components/UserAvatar';

export default function CommunityScreen({ navigation }) {
  const { colors } = useApp();
  const onlineFriends = friends.filter((user) => user.status === 'online');

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Comunidade" subtitle={`${onlineFriends.length} amigos online`} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionHeader title="Amigos online" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
          {onlineFriends.map((user) => {
            const currentGame = user.currentGameId ? getGameById(user.currentGameId) : null;
            return (
              <Pressable
                key={user.id}
                onPress={() => navigation.navigate('UserProfile', { userId: user.id })}
                style={[styles.friendCard, { backgroundColor: colors.surface }]}
              >
                <UserAvatar user={user} size={54} showStatus />
                <Text numberOfLines={1} style={[styles.friendName, { color: colors.text }]}>
                  {user.name}
                </Text>
                <Text style={[styles.online, { color: colors.online }]}>● Online</Text>
                <Text numberOfLines={1} style={[styles.friendGame, { color: colors.textSecondary }]}>
                  {currentGame ? `Jogando ${currentGame.title}` : 'Disponível'}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <SectionHeader title="Feed" />
        <View style={styles.feed}>
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onPressUser={(user) => navigation.navigate('UserProfile', { userId: user.id })}
              onPressGame={(game) => navigation.navigate('GameDetails', { gameId: game.id })}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 28,
  },
  hList: {
    paddingHorizontal: 16,
    paddingBottom: 18,
    gap: 10,
  },
  friendCard: {
    width: 148,
    borderRadius: 18,
    padding: 14,
    gap: 6,
  },
  friendName: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: '800',
  },
  online: {
    fontSize: 12,
    fontWeight: '700',
  },
  friendGame: {
    fontSize: 12,
  },
  feed: {
    paddingHorizontal: 16,
    gap: 12,
  },
});
