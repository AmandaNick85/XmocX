import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export default function UserAvatar({ user, size = 48, showStatus = false, showStar = false }) {
  const { colors } = useApp();
  const statusColor =
    user?.status === 'online' ? colors.online : user?.status === 'away' ? colors.away : colors.offline;

  return (
    <View style={{ width: size, height: size }}>
      <LinearGradient
        colors={user?.avatarColors || ['#202020', '#8BF000']}
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
      >
        <Text style={[styles.initials, { fontSize: size * 0.34 }]}>{user?.initials || 'XM'}</Text>
      </LinearGradient>
      {showStar ? (
        <View style={[styles.star, { backgroundColor: colors.background }]}>
          <Ionicons name="star" size={size * 0.28} color={colors.accent} />
        </View>
      ) : showStatus ? (
        <View
          style={[
            styles.status,
            {
              backgroundColor: statusColor,
              borderColor: colors.background,
              width: size * 0.28,
              height: size * 0.28,
              borderRadius: size * 0.14,
            },
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  status: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderWidth: 2,
  },
  star: {
    position: 'absolute',
    left: -2,
    bottom: -2,
    borderRadius: 99,
  },
});
