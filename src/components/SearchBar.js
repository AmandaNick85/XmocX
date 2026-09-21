import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useApp } from '../context/AppContext';

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Pesquise jogos, pessoas e muito mais',
  autoFocus = false,
  onPress,
}) {
  const { colors } = useApp();

  const inner = (
    <View style={[styles.wrap, { backgroundColor: colors.search || colors.surfaceAlt }]}>
      <Ionicons name="search" size={18} color={colors.textMuted} />
      {onPress ? (
        <View style={styles.input}>
          <Ionicons name="search" size={0} />
        </View>
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          autoFocus={autoFocus}
          autoCorrect={false}
          style={[styles.field, { color: colors.text }]}
        />
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        <View style={[styles.wrap, { backgroundColor: colors.search || colors.surfaceAlt }]}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <View pointerEvents="none" style={{ flex: 1 }}>
            <TextInput
              editable={false}
              placeholder={placeholder}
              placeholderTextColor={colors.textMuted}
              style={[styles.field, { color: colors.text }]}
            />
          </View>
        </View>
      </Pressable>
    );
  }

  return inner;
}

const styles = StyleSheet.create({
  wrap: {
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  field: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 0,
  },
  input: {
    flex: 1,
  },
});
