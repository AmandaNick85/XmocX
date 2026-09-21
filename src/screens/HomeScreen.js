import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { activities } from '../data/activities';
import { currentUser } from '../data/users';
import { useApp } from '../context/AppContext';
import ActivityCard from '../components/ActivityCard';
import GameCard from '../components/GameCard';
import GameCover from '../components/GameCover';
import GameHorizontalCard from '../components/GameHorizontalCard';
import PrimaryButton from '../components/PrimaryButton';
import SectionHeader from '../components/SectionHeader';
import UserAvatar from '../components/UserAvatar';

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { colors, games } = useApp();
  const featured = games.find((game) => game.id === 1) || games[0];
  const continuePlaying = games.filter((game) => game.inContinue);
  const spotlight = games.filter((game) => game.featured && game.id !== featured.id);
  const recommended = games.filter((game) => game.recommended);
  const friendActivity = activities.slice(0, 5);
  const cardWidth = Math.min(188, width * 0.46);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
          <View>
            <Text style={[styles.brand, { color: colors.accent }]}>XmocX</Text>
            <Text style={[styles.welcome, { color: colors.textSecondary }]}>Olá, {currentUser.name}</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable
              onPress={() => navigation.navigate('Search')}
              style={[styles.iconButton, { backgroundColor: colors.surfaceAlt }]}
            >
              <Ionicons name="search" size={18} color={colors.text} />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Notifications')}
              style={[styles.iconButton, { backgroundColor: colors.surfaceAlt }]}
            >
              <Ionicons name="notifications-outline" size={18} color={colors.text} />
              <View style={[styles.badge, { backgroundColor: colors.accent }]} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Profile')}>
              <UserAvatar user={currentUser} size={38} showStatus />
            </Pressable>
          </View>
        </View>

        <Pressable onPress={() => navigation.navigate('GameDetails', { gameId: featured.id })} style={styles.bannerWrap}>
          <GameCover game={featured} showTitle={false} style={styles.banner} />
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.88)']} style={styles.bannerOverlay}>
            <Text style={styles.bannerLabel}>{featured.bannerLabel}</Text>
            <Text style={styles.bannerTitle}>{featured.title.toUpperCase()}</Text>
            <Text style={styles.bannerTagline}>{featured.tagline}</Text>
            <View style={styles.bannerButtons}>
              <PrimaryButton
                label="JOGAR"
                onPress={() => navigation.navigate('GameDetails', { gameId: featured.id })}
                style={{ flex: 1 }}
              />
              <PrimaryButton
                label="+ LISTA"
                variant="outline"
                onPress={() => navigation.navigate('GameDetails', { gameId: featured.id })}
                style={{ flex: 1 }}
              />
            </View>
          </LinearGradient>
        </Pressable>

        <SectionHeader title="Continuar jogando" actionLabel="Ver tudo" onAction={() => navigation.navigate('Library')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
          {continuePlaying.map((game) => (
            <GameHorizontalCard
              key={game.id}
              game={game}
              onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
            />
          ))}
        </ScrollView>

        <SectionHeader title="Em destaque" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
          {spotlight.map((game) => (
            <View key={game.id} style={{ width: width * 0.72 }}>
              <Pressable onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}>
                <GameCover game={game} showTitle={false} style={styles.spotlightCover} />
                <View style={[styles.spotlightBody, { backgroundColor: colors.surface }]}>
                  <Text style={[styles.spotlightTitle, { color: colors.text }]}>{game.title}</Text>
                  <Text style={{ color: colors.textSecondary }}>
                    {game.genre} · {game.rating.toFixed(1)}
                  </Text>
                  <PrimaryButton
                    label="Ver detalhes"
                    variant="outline"
                    onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
                  />
                </View>
              </Pressable>
            </View>
          ))}
        </ScrollView>

        <SectionHeader title="Recomendados para você" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
          {recommended.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              width={cardWidth}
              onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
            />
          ))}
        </ScrollView>

        <SectionHeader title="Atividade dos amigos" actionLabel="Comunidade" onAction={() => navigation.navigate('Community')} />
        <View style={styles.feed}>
          {friendActivity.map((activity) => (
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
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0.6,
  },
  welcome: {
    marginTop: 2,
    fontSize: 13,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bannerWrap: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 24,
    overflow: 'hidden',
  },
  banner: {
    height: 280,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 18,
  },
  bannerLabel: {
    color: '#8BF000',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  bannerTitle: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
  bannerTagline: {
    marginTop: 4,
    marginBottom: 14,
    color: '#B3B3B3',
    fontSize: 14,
  },
  bannerButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  hList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  spotlightCover: {
    height: 180,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  spotlightBody: {
    gap: 8,
    padding: 14,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  spotlightTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  feed: {
    paddingHorizontal: 16,
    gap: 12,
  },
});
