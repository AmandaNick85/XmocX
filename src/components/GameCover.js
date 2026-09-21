import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PATTERN_ICONS = ['game-controller', 'flash', 'planet', 'rocket', 'diamond', 'hardware-chip'];

export default function GameCover({ game, style, compact = false, showTitle = false }) {
  const iconName = PATTERN_ICONS[game.id % PATTERN_ICONS.length];

  return (
    <LinearGradient
      colors={game.coverColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.cover, style]}
    >
      <View style={styles.orbOne} />
      <View style={[styles.orbTwo, { backgroundColor: game.accent }]} />
      <View style={styles.center}>
        <Ionicons name={iconName} size={compact ? 22 : 36} color="rgba(255,255,255,0.92)" />
        {showTitle ? (
          <Text numberOfLines={2} style={[styles.title, compact && styles.titleCompact]}>
            {game.title}
          </Text>
        ) : null}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cover: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  orbOne: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -40,
    right: -24,
  },
  orbTwo: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.28,
    bottom: -16,
    left: -10,
  },
  title: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  titleCompact: {
    fontSize: 11,
    marginTop: 4,
  },
});
