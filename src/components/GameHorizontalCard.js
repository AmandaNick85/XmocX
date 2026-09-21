import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { usePressScale } from '../utils/usePressScale';
import GameCover from './GameCover';
import ProgressBar from './ProgressBar';

export default function GameHorizontalCard({ game, onPress }) {
  const { colors } = useApp();
  const { scale, onPressIn, onPressOut } = usePressScale();

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.card, { backgroundColor: colors.surface, transform: [{ scale }] }]}>
        <GameCover game={game} compact style={styles.cover} />
        <View style={styles.body}>
          <Text numberOfLines={1} style={[styles.title, { color: colors.text }]}>
            {game.title}
          </Text>
          <Text style={[styles.meta, { color: colors.textSecondary }]}>{game.lastPlayed}</Text>
          <ProgressBar progress={game.progress} />
          <Text style={[styles.percent, { color: colors.accent }]}>{game.progress}%</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 260,
    borderRadius: 18,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cover: {
    width: 92,
    height: 108,
  },
  body: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    gap: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
  },
  meta: {
    fontSize: 12,
  },
  percent: {
    fontSize: 12,
    fontWeight: '700',
  },
});
