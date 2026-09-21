import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PATTERN_ICONS = ['game-controller', 'flash', 'planet', 'rocket', 'diamond', 'hardware-chip'];

export default function GameCover({ game, style, compact = false }) {
  const iconName = PATTERN_ICONS[game.id % PATTERN_ICONS.length];

  return (
    <LinearGradient colors={game.coverColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.cover, style]}>
      <View style={styles.orbOne} />
      <View style={[styles.orbTwo, { backgroundColor: game.accent }]} />
      <Ionicons name={iconName} size={compact ? 28 : 42} color="rgba(255,255,255,0.88)" />
      <Text numberOfLines={2} style={[styles.title, compact && styles.titleCompact]}>
        {game.title}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cover: {
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 12,
  },
  orbOne: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -30,
    right: -20,
  },
  orbTwo: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    opacity: 0.35,
    top: 24,
    left: 18,
  },
  title: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  titleCompact: {
    fontSize: 13,
    marginTop: 6,
  },
});
