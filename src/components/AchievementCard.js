import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

export default function AchievementCard({ achievement }) {
  const { colors } = useApp();
  const locked = !achievement.unlocked;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View
        style={[
          styles.iconWrap,
          { backgroundColor: locked ? colors.surfaceAlt : colors.accentSoft },
        ]}
      >
        <Ionicons
          name={locked ? 'lock-closed' : achievement.icon}
          size={22}
          color={locked ? colors.locked : colors.accent}
        />
      </View>
      <View style={styles.body}>
        <Text style={[styles.name, { color: locked ? colors.textSecondary : colors.text }]}>
          {achievement.name}
        </Text>
        <Text style={[styles.description, { color: colors.textMuted }]}>{achievement.description}</Text>
      </View>
      <Text style={[styles.points, { color: locked ? colors.textMuted : colors.accent }]}>
        +{achievement.points}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 76,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
  },
  description: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 16,
  },
  points: {
    fontSize: 13,
    fontWeight: '800',
  },
});
