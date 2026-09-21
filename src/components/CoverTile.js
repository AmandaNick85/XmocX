import { Ionicons } from '@expo/vector-icons';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { usePressScale } from '../utils/usePressScale';
import GameCover from './GameCover';

export default function CoverTile({ game, onPress, width, radius = 10 }) {
  const { colors } = useApp();
  const { scale, onPressIn, onPressOut } = usePressScale(0.97);
  const numeric = typeof width === 'number';

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} style={!numeric ? { width: width || '48%' } : null}>
      <Animated.View style={[numeric ? { width } : { width: '100%' }, { transform: [{ scale }] }]}>
        <View style={[styles.tile, numeric ? { width, height: width } : styles.fluid, { borderRadius: radius }]}>
          <GameCover game={game} style={StyleSheet.absoluteFill} />
          <View style={styles.icons}>
            {game.installed ? (
              <Ionicons name="game-controller-outline" size={14} color="#FFFFFF" />
            ) : (
              <Ionicons name="cloud-outline" size={14} color="#FFFFFF" />
            )}
            {game.favorite ? <Ionicons name="star" size={13} color={colors.accent} /> : null}
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    overflow: 'hidden',
    backgroundColor: '#1A1A1A',
  },
  fluid: {
    width: '100%',
    aspectRatio: 1,
  },
  icons: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
