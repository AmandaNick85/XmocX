import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { useApp } from '../context/AppContext';
import { usePressScale } from '../utils/usePressScale';

export default function PrimaryButton({ label, onPress, variant = 'solid', style }) {
  const { colors } = useApp();
  const { scale, onPressIn, onPressOut } = usePressScale(0.97);
  const solid = variant === 'solid';

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} style={style}>
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor: solid ? colors.accent : 'transparent',
            borderColor: solid ? colors.accent : colors.border,
            transform: [{ scale }],
          },
        ]}
      >
        <Text style={[styles.label, { color: solid ? '#0B0B0B' : colors.text }]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});
