import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getGameById } from '../data/games';
import { getUserById } from '../data/users';
import { useApp } from '../context/AppContext';
import GameHorizontalCard from '../components/GameHorizontalCard';
import ScreenHeader from '../components/ScreenHeader';
import UserAvatar from '../components/UserAvatar';

export default function UserProfileScreen({ navigation, route }) {
  const { colors, games } = useApp();
  const user = getUserById(route.params.userId);
  const currentGame = user?.currentGameId ? getGameById(user.currentGameId) : null;
  const recent = games.slice(0, 3);

  if (!user) {
    return (
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <ScreenHeader title="Perfil" onBack={() => navigation.goBack()} />
        <Text style={{ color: colors.text, padding: 16 }}>Usuário não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader title={user.name} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: colors.surface }]}>
          <UserAvatar user={user} size={84} showStatus />
          <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
          <Text style={{ color: colors.textSecondary }}>@{user.handle}</Text>
          <Text style={[styles.status, { color: user.status === 'online' ? colors.online : colors.textMuted }]}>
            {user.status === 'online'
              ? currentGame
                ? `Jogando ${currentGame.title}`
                : 'Online'
              : user.lastSeen || 'Offline'}
          </Text>
        </View>
        <View style={styles.statsRow}>
          <MiniStat label="Gamerscore" value={user.gamerscore} colors={colors} />
          <MiniStat label="Nível" value={user.level} colors={colors} />
          <MiniStat label="Amigos" value={user.friendsCount} colors={colors} />
        </View>
        <Text style={[styles.section, { color: colors.text }]}>Jogos recentes</Text>
        {recent.map((game) => (
          <GameHorizontalCard
            key={game.id}
            game={game}
            onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function MiniStat({ label, value, colors }) {
  return (
    <View style={[styles.stat, { backgroundColor: colors.surface }]}>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  hero: {
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 26,
    fontWeight: '900',
  },
  status: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  stat: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 11,
  },
  section: {
    fontSize: 18,
    fontWeight: '800',
  },
});
