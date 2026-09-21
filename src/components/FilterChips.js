import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { useApp } from '../context/AppContext';

export default function FilterChips({ options, selected, onSelect }) {
  const { colors } = useApp();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {options.map((option) => {
        const active = option === selected;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            style={[
              styles.chip,
              {
                backgroundColor: active ? colors.accent : colors.surfaceAlt,
              },
            ]}
          >
            <Text style={[styles.label, { color: active ? '#0B0B0B' : colors.text }]}>{option}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
});
