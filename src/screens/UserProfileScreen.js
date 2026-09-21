import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { getGameById } from '../data/games';
import { getUserById } from '../data/users';
import { useApp } from '../context/AppContext';
import CoverTile from '../components/CoverTile';
import ScreenHeader from '../components/ScreenHeader';
import UserAvatar from '../components/UserAvatar';

export default function UserProfileScreen({ navigation, route }) {
  const { width } = useWindowDimensions();
  const { colors, games } = useApp();
  const user = getUserById(route.params.userId);
  const currentGame = user?.currentGameId ? getGameById(user.currentGameId) : null;
  const recent = games.slice(0, 4);
  const tile = (width - 32 - 8) / 2;

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
        <LinearGradient colors={user.avatarColors} style={styles.hero}>
          <UserAvatar user={user} size={88} showStar={user.favorite} />
          <Text style={styles.name}>{user.name}</Text>
          {user.realName ? <Text style={styles.real}>{user.realName}</Text> : null}
          <Text style={styles.status}>
            {currentGame ? `Jogando ${currentGame.title}` : user.lastSeen || 'Offline'}
          </Text>
        </LinearGradient>
        <View style={styles.followRow}>
          <MiniStat label="Gamerscore" value={`${user.gamerscore} G`} />
          <MiniStat label="Amigos" value={user.friendsCount} />
          <MiniStat label="Nível" value={user.level} />
        </View>
        <Text style={[styles.section, { color: colors.text }]}>Jogos recentes</Text>
        <View style={styles.grid}>
          {recent.map((game) => (
            <CoverTile
              key={game.id}
              game={game}
              width={tile}
              onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function MiniStat({ label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
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
  hero: {
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    gap: 6,
  },
  name: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
  },
  real: {
    color: '#DDD',
    fontSize: 14,
  },
  status: {
    color: '#EEE',
    fontSize: 13,
  },
  followRow: {
    paddingVertical: 16,
    flexDirection: 'row',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    marginTop: 2,
    color: '#B3B3B3',
    fontSize: 12,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '700',
  },
  grid: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },
});
