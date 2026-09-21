import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { achievements, achievementStats } from '../data/achievements';
import { useApp } from '../context/AppContext';
import AchievementCard from '../components/AchievementCard';
import ProgressBar from '../components/ProgressBar';
import ScreenHeader from '../components/ScreenHeader';

export default function AchievementsScreen() {
  const { colors } = useApp();
  const completed = Math.round((achievementStats.unlocked / achievementStats.total) * 100);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Conquistas" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <StatBox label="Gamerscore" value={String(achievementStats.gamerscore)} colors={colors} />
          <StatBox label="Conquistas" value={String(achievementStats.unlocked)} colors={colors} />
          <StatBox label="Completado" value={`${completed}%`} colors={colors} />
        </View>
        <ProgressBar progress={completed} height={8} />
        <Text style={[styles.helper, { color: colors.textSecondary }]}>
          {achievementStats.unlocked} de {achievementStats.total} conquistas desbloqueadas
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
    <View style={[styles.statBox, { backgroundColor: colors.surface }]}>
      <Text style={[styles.statValue, { color: colors.accent }]}>{value}</Text>
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
    paddingBottom: 32,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
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
  helper: {
    fontSize: 13,
  },
});
