import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

export default function FilterChips({ options, selected, onSelect, showChevron = true }) {
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
                backgroundColor: active ? colors.surfaceHover : 'transparent',
                borderColor: colors.surfaceHover,
              },
            ]}
          >
            <Text style={[styles.label, { color: colors.text }]}>{option}</Text>
            {showChevron ? <Ionicons name="chevron-down" size={14} color={colors.textMuted} /> : null}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
