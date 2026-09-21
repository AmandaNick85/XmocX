import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { notifications } from '../data/activities';
import { useApp } from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';

export default function NotificationsScreen({ navigation }) {
  const { colors } = useApp();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Notificações" onBack={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map((item) => (
          <View key={item.id} style={styles.row}>
            {item.unread ? <View style={[styles.dot, { backgroundColor: colors.accent }]} /> : <View style={styles.dotSpace} />}
            <View style={[styles.icon, { backgroundColor: colors.surfaceAlt }]}>
              <Ionicons name={item.unread ? 'game-controller' : 'image-outline'} size={22} color={colors.text} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.message, { color: colors.textSecondary }]}>{item.message}</Text>
            </View>
            <Text style={[styles.time, { color: colors.textMuted }]}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  row: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 18,
  },
  dotSpace: {
    width: 8,
    marginTop: 18,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  message: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
  },
  time: {
    fontSize: 12,
    marginTop: 2,
  },
});
