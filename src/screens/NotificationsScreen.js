import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { notifications } from '../data/activities';
import { useApp } from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';

export default function NotificationsScreen({ navigation }) {
  const { colors } = useApp();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Notificações" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {notifications.map((item) => (
          <View key={item.id} style={[styles.card, { backgroundColor: colors.surface }]}>
            {item.unread ? <View style={[styles.dot, { backgroundColor: colors.accent }]} /> : null}
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
  content: {
    padding: 16,
    gap: 10,
  },
  card: {
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
  },
  message: {
    marginTop: 4,
    fontSize: 13,
    lineHeight: 18,
  },
  time: {
    fontSize: 12,
  },
});
