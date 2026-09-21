import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

export default function TextTabs({ options, selected, onSelect }) {
  const { colors } = useApp();

  return (
    <View style={styles.row}>
      {options.map((option) => {
        const active = option === selected;
        return (
          <Pressable key={option} onPress={() => onSelect(option)} style={styles.item}>
            <Text style={[styles.label, { color: active ? colors.text : colors.textMuted }]}>{option}</Text>
            <View style={[styles.line, { backgroundColor: active ? colors.text : 'transparent' }]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    gap: 8,
  },
  item: {
    paddingHorizontal: 12,
    paddingTop: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  line: {
    marginTop: 8,
    height: 2,
    width: '100%',
    borderRadius: 2,
  },
});
