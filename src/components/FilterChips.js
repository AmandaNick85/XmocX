import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { useApp } from '../context/AppContext';

export default function FilterChips({ options, selected, onSelect }) {
  const { colors } = useApp();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroller}
      contentContainerStyle={styles.row}
    >
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
  scroller: {
    flexGrow: 0,
    minHeight: 44,
    marginBottom: 4,
  },
  row: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  chip: {
    minHeight: 36,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
  },
});
