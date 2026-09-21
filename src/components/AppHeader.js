import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import UserAvatar from './UserAvatar';

export default function AppHeader({ user, title, subtitle, onAvatar, onBack, right }) {
  const insets = useSafeAreaInsets();
  const { colors } = useApp();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 6 }]}>
      {onBack ? (
        <Pressable onPress={onBack} style={[styles.circle, { backgroundColor: colors.surfaceAlt }]}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </Pressable>
      ) : (
        <Pressable onPress={onAvatar}>
          <UserAvatar user={user} size={42} showStatus />
        </Pressable>
      )}
      <View style={styles.titles}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle ? <View style={styles.subRow}>{subtitle}</View> : null}
      </View>
      <View style={styles.right}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titles: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subRow: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  circle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
