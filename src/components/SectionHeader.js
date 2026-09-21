import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

export default function SectionHeader({ title, actionLabel, onAction }) {
  const { colors } = useApp();

  return (
    <View style={styles.row}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={[styles.action, { color: colors.textMuted }]}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  action: {
    fontSize: 14,
    fontWeight: '500',
  },
});
