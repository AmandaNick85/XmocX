import { Ionicons } from '@expo/vector-icons';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { usePressScale } from '../utils/usePressScale';
import GameCover from './GameCover';
import ProgressBar from './ProgressBar';

export default function GameCard({ game, onPress, width }) {
  const { colors } = useApp();
  const { scale, onPressIn, onPressOut } = usePressScale();

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.card, { width: width || 168, backgroundColor: colors.surface, transform: [{ scale }] }]}>
        <GameCover game={game} style={styles.cover} />
        <View style={styles.body}>
          <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
            {game.title}
          </Text>
          <Text style={[styles.meta, { color: colors.textSecondary }]}>
            {game.genre} · {game.rating.toFixed(1)}
          </Text>
          <ProgressBar progress={game.progress} />
          <View style={styles.footer}>
            <Text style={[styles.progress, { color: colors.accent }]}>{game.progress}%</Text>
            {game.favorite ? <Ionicons name="star" size={14} color={colors.accent} /> : null}
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    overflow: 'hidden',
  },
  cover: {
    height: 150,
  },
  body: {
    padding: 12,
    gap: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
  },
  meta: {
    fontSize: 12,
  },
  footer: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progress: {
    fontSize: 12,
    fontWeight: '700',
  },
});
