import { Ionicons } from '@expo/vector-icons';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { getGameById } from '../data/games';
import { getUserById } from '../data/users';
import { useApp } from '../context/AppContext';
import { usePressScale } from '../utils/usePressScale';
import UserAvatar from './UserAvatar';

export default function ActivityCard({ activity, onPressUser, onPressGame }) {
  const { colors, likedActivityIds, toggleLike } = useApp();
  const { scale, onPressIn, onPressOut } = usePressScale(0.985);
  const user = getUserById(activity.userId);
  const game = activity.gameId ? getGameById(activity.gameId) : null;
  const liked = likedActivityIds.includes(activity.id);

  return (
    <Animated.View style={[styles.card, { backgroundColor: colors.surface, transform: [{ scale }] }]}>
      <Pressable onPress={() => onPressUser?.(user)} onPressIn={onPressIn} onPressOut={onPressOut} style={styles.header}>
        <UserAvatar user={user} size={42} showStatus />
        <View style={styles.headerText}>
          <Text style={[styles.name, { color: colors.text }]}>{user?.name}</Text>
          <Text style={[styles.action, { color: colors.textSecondary }]}>
            {activity.action} {activity.detail}
          </Text>
        </View>
        <Text style={[styles.time, { color: colors.textMuted }]}>{activity.time}</Text>
      </Pressable>
      {game ? (
        <Pressable onPress={() => onPressGame?.(game)} style={[styles.gameChip, { backgroundColor: colors.surfaceAlt }]}>
          <Text style={[styles.gameChipText, { color: colors.accent }]}>{game.title}</Text>
        </Pressable>
      ) : null}
      <View style={styles.actions}>
        <Pressable onPress={() => toggleLike(activity.id)} style={styles.actionButton}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={18} color={liked ? colors.accent : colors.textSecondary} />
          <Text style={[styles.actionLabel, { color: colors.textSecondary }]}>
            {activity.likes + (liked ? 1 : 0)}
          </Text>
        </Pressable>
        <View style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={17} color={colors.textSecondary} />
          <Text style={[styles.actionLabel, { color: colors.textSecondary }]}>{activity.comments}</Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 14,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
  },
  action: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
  },
  time: {
    fontSize: 12,
  },
  gameChip: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  gameChipText: {
    fontSize: 12,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
});
