import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { currentUser } from '../data/users';
import { useApp } from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';
import UserAvatar from '../components/UserAvatar';

export default function SettingsScreen({ navigation }) {
  const { colors, darkTheme, setDarkTheme } = useApp();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Configurações" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profile}>
          <UserAvatar user={currentUser} size={56} />
          <View>
            <Text style={[styles.realName, { color: colors.text }]}>Luana Zenha</Text>
            <Text style={{ color: colors.textMuted }}>luana-zenha@hotmail.com</Text>
          </View>
        </View>

        <Text style={[styles.group, { color: colors.text }]}>Conta</Text>
        {['Minhas assinaturas', 'Resgatar código', 'Contas vinculadas', 'Privacidade', 'Excluir conta'].map((label) => (
          <Row key={label} label={label} colors={colors} />
        ))}

        <Text style={[styles.group, { color: colors.text }]}>Configurações do aplicativo</Text>
        <Row label="Notificações" colors={colors} />
        <Row label="Idioma e local" colors={colors} extra="Português (Brasil)" />
        <Row label="Acessibilidade" colors={colors} />

        <View style={[styles.row, { backgroundColor: colors.surface }]}>
          <Text style={[styles.label, { color: colors.text }]}>Tema escuro</Text>
          <Switch
            value={darkTheme}
            onValueChange={setDarkTheme}
            trackColor={{ false: colors.surfaceAlt, true: colors.accent }}
            thumbColor="#FFFFFF"
          />
        </View>

        <Text style={[styles.group, { color: colors.text }]}>Sobre o XmocX</Text>
        <View style={[styles.about, { backgroundColor: colors.surface }]}>
          <Text style={[styles.label, { color: colors.text }]}>XmocX 1.0.0</Text>
          <Text style={{ color: colors.textMuted, marginTop: 6, lineHeight: 18 }}>
            Protótipo educacional. Dados fictícios, sem backend e sem artes oficiais.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Row({ label, extra, colors }) {
  return (
    <View style={[styles.row, { backgroundColor: colors.surface }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {extra ? <Text style={{ color: colors.textMuted, marginTop: 2 }}>{extra}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 8,
    paddingBottom: 32,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 8,
  },
  realName: {
    fontSize: 18,
    fontWeight: '700',
  },
  group: {
    marginTop: 14,
    marginBottom: 4,
    fontSize: 22,
    fontWeight: '700',
  },
  row: {
    minHeight: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
  },
  about: {
    borderRadius: 12,
    padding: 16,
  },
});
