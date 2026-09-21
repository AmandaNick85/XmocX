import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useApp } from '../context/AppContext';

export default function ProgressBar({ progress, delay = 0, height = 7 }) {
  const { colors } = useApp();
  const animated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animated, {
      toValue: Math.max(0, Math.min(progress, 100)) / 100,
      duration: 700,
      delay,
      useNativeDriver: false,
    }).start();
  }, [animated, delay, progress]);

  return (
    <View style={[styles.track, { backgroundColor: colors.surfaceAlt, height }]}>
      <Animated.View
        style={[
          styles.fill,
          {
            backgroundColor: colors.accent,
            height,
            width: animated.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: 99,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: 99,
  },
});
