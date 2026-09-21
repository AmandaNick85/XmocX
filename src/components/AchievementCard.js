import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { achievementImages } from '../data/images';

export default function AchievementCard({ achievement }) {
  const { colors } = useApp();
  const locked = !achievement.unlocked;
  const art = achievementImages[achievement.id];

  return (
    <View style={[styles.card, { backgroundColor: colors.surface }]}>
      <View style={styles.iconWrap}>
        {art ? (
          <Image source={art} style={[styles.art, locked && styles.lockedArt]} />
        ) : (
          <View style={[styles.fallback, { backgroundColor: locked ? colors.surfaceAlt : colors.accentSoft }]}>
            <Ionicons name={locked ? 'lock-closed' : achievement.icon} size={22} color={locked ? colors.locked : colors.accent} />
          </View>
        )}
        {locked ? (
          <View style={styles.lockBadge}>
            <Ionicons name="lock-closed" size={12} color="#FFF" />
          </View>
        ) : null}
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
    width: 52,
    height: 52,
    borderRadius: 10,
    overflow: 'hidden',
  },
  art: {
    width: '100%',
    height: '100%',
  },
  lockedArt: {
    opacity: 0.28,
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.65)',
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
