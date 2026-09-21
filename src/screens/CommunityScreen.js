import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { currentUser, friends } from '../data/users';
import { getGameById } from '../data/games';
import { useApp } from '../context/AppContext';
import AppHeader from '../components/AppHeader';
import TextTabs from '../components/TextTabs';
import UserAvatar from '../components/UserAvatar';

const TABS = ['Amigos', 'Grupos', 'Chats'];

export default function CommunityScreen({ navigation }) {
  const { colors } = useApp();
  const [tab, setTab] = useState('Amigos');
  const favorites = friends.filter((user) => user.favorite);

  const subtitle = (user) => {
    const game = user.currentGameId ? getGameById(user.currentGameId) : null;
    if (game) return game.title;
    return user.lastSeen || 'Offline';
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppHeader
        user={currentUser}
        title="Social"
        onAvatar={() => navigation.navigate('Profile')}
        right={
          <>
            <Pressable style={[styles.iconBtn, { backgroundColor: colors.surfaceAlt }]}>
              <Ionicons name="add" size={22} color={colors.text} />
            </Pressable>
            <Pressable
              style={[styles.iconBtn, { backgroundColor: colors.surfaceAlt }]}
              onPress={() => navigation.navigate('Search')}
            >
              <Ionicons name="search" size={18} color={colors.text} />
            </Pressable>
          </>
        }
      />
      <TextTabs options={TABS} selected={tab} onSelect={setTab} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {tab === 'Amigos' ? (
          <>
            <Pressable style={[styles.request, { backgroundColor: colors.surface }]}>
              <Text style={[styles.requestText, { color: colors.text }]}>Solicitações de amizade</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </Pressable>

            <Text style={[styles.group, { color: colors.text }]}>Favoritos</Text>
            {favorites.map((user) => (
              <FriendRow
                key={user.id}
                user={user}
                subtitle={subtitle(user)}
                colors={colors}
                onPress={() => navigation.navigate('UserProfile', { userId: user.id })}
              />
            ))}

            <Text style={[styles.group, { color: colors.text }]}>Todos os amigos</Text>
            {friends
              .filter((user) => !user.favorite)
              .map((user) => (
                <FriendRow
                  key={user.id}
                  user={user}
                  subtitle={subtitle(user)}
                  colors={colors}
                  onPress={() => navigation.navigate('UserProfile', { userId: user.id })}
                />
              ))}
          </>
        ) : (
          <Text style={[styles.empty, { color: colors.textMuted }]}>
            {tab} é uma área mockada para a experiência em aula.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

function FriendRow({ user, subtitle, colors, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <UserAvatar user={user} size={52} showStar={user.favorite} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.name, { color: colors.text }]}>
          {user.name}
          {user.realName ? <Text style={{ color: colors.textMuted, fontWeight: '400' }}> {user.realName}</Text> : null}
        </Text>
        <Text numberOfLines={1} style={[styles.sub, { color: colors.textMuted }]}>
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingTop: 12,
    paddingBottom: 28,
  },
  request: {
    marginHorizontal: 16,
    marginBottom: 18,
    borderRadius: 12,
    minHeight: 52,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  requestText: {
    fontSize: 16,
  },
  group: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 8,
    fontSize: 20,
    fontWeight: '700',
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  sub: {
    marginTop: 2,
    fontSize: 13,
  },
  empty: {
    padding: 24,
    textAlign: 'center',
  },
});
