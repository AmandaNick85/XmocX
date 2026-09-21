import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { currentUser } from '../data/users';
import { useApp } from '../context/AppContext';
import GameHorizontalCard from '../components/GameHorizontalCard';
import PrimaryButton from '../components/PrimaryButton';
import UserAvatar from '../components/UserAvatar';

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { colors, games } = useApp();
  const recent = [...games].sort((a, b) => b.progress - a.progress).slice(0, 4);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#12322A', '#0B0B0B']} style={styles.hero}>
          <View style={styles.heroTop}>
            <Text style={[styles.brand, { color: colors.accent }]}>Perfil</Text>
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              style={[styles.settingsButton, { backgroundColor: colors.surfaceAlt }]}
            >
              <Ionicons name="settings-outline" size={20} color={colors.text} />
            </Pressable>
          </View>
          <UserAvatar user={currentUser} size={92} showStatus />
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.handle}>@{currentUser.handle} · Nível {currentUser.level}</Text>
          <Text style={styles.bio}>{currentUser.bio}</Text>
        </LinearGradient>

        <View style={styles.statsRow}>
          <Stat label="Gamerscore" value={currentUser.gamerscore} colors={colors} />
          <Stat label="Jogos" value={currentUser.gamesCount} colors={colors} />
          <Stat label="Conquistas" value={currentUser.achievementsCount} colors={colors} />
          <Stat label="Amigos" value={currentUser.friendsCount} colors={colors} />
        </View>

        <PrimaryButton label="Configurações" variant="outline" onPress={() => navigation.navigate('Settings')} />

        <Text style={[styles.section, { color: colors.text }]}>Jogados recentemente</Text>
        <View style={styles.recent}>
          {recent.map((game) => (
            <GameHorizontalCard
              key={game.id}
              game={game}
              onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ label, value, colors }) {
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
    gap: 14,
    paddingBottom: 32,
  },
  hero: {
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    gap: 8,
  },
  heroTop: {
    width: '100%',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    fontSize: 18,
    fontWeight: '800',
  },
  settingsButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
  },
  handle: {
    color: '#B3B3B3',
    fontSize: 13,
  },
  bio: {
    color: '#D4D4D4',
    textAlign: 'center',
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  stat: {
    width: '48%',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  section: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: '800',
  },
  recent: {
    gap: 10,
  },
});
