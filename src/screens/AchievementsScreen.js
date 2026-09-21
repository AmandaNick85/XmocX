import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { currentUser } from '../data/users';
import { achievements, achievementStats } from '../data/achievements';
import { useApp } from '../context/AppContext';
import AchievementCard from '../components/AchievementCard';
import AppHeader from '../components/AppHeader';
import ProgressBar from '../components/ProgressBar';

export default function AchievementsScreen({ navigation }) {
  const { colors } = useApp();
  const completed = Math.round((achievementStats.unlocked / achievementStats.total) * 100);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppHeader
        user={currentUser}
        title="Conquistas"
        onAvatar={() => navigation.navigate('Profile')}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <StatBox label="Gamerscore" value={`${achievementStats.gamerscore} G`} colors={colors} />
          <StatBox label="Conquistas" value={String(achievementStats.unlocked)} colors={colors} />
          <StatBox label="Completado" value={`${completed}%`} colors={colors} />
        </View>
        <ProgressBar progress={completed} height={6} />
        <Text style={[styles.helper, { color: colors.textMuted }]}>
          {achievementStats.unlocked} de {achievementStats.total} desbloqueadas
        </Text>
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </ScrollView>
    </View>
  );
}

function StatBox({ label, value, colors }) {
  return (
    <View style={styles.statBox}>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textMuted }]}>{label}</Text>
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
    paddingBottom: 32,
  },
  statsRow: {
    flexDirection: 'row',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  helper: {
    fontSize: 13,
  },
});
