import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import ScreenHeader from '../components/ScreenHeader';

const ACCOUNT_ITEMS = [
  { key: 'account', icon: 'person-circle-outline', label: 'Conta', hint: 'Luka · perfil mockado' },
  { key: 'notifications', icon: 'notifications-outline', label: 'Notificações', hint: 'Alertas da comunidade' },
  { key: 'privacy', icon: 'lock-closed-outline', label: 'Privacidade', hint: 'Perfil visível para amigos' },
  { key: 'language', icon: 'language-outline', label: 'Idioma', hint: 'Português (Brasil)' },
];

export default function SettingsScreen({ navigation }) {
  const { colors, darkTheme, setDarkTheme } = useApp();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Configurações" onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.group, { color: colors.textSecondary }]}>Conta</Text>
        {ACCOUNT_ITEMS.map((item) => (
          <View key={item.key} style={[styles.row, { backgroundColor: colors.surface }]}>
            <Ionicons name={item.icon} size={20} color={colors.accent} />
            <View style={{ flex: 1 }}>
              <Text style={[styles.label, { color: colors.text }]}>{item.label}</Text>
              <Text style={[styles.hint, { color: colors.textMuted }]}>{item.hint}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </View>
        ))}

        <Text style={[styles.group, { color: colors.textSecondary }]}>Aparência</Text>
        <View style={[styles.row, { backgroundColor: colors.surface }]}>
          <Ionicons name="moon-outline" size={20} color={colors.accent} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.label, { color: colors.text }]}>Tema escuro</Text>
            <Text style={[styles.hint, { color: colors.textMuted }]}>
              Estrutura pronta para um tema claro futuro
            </Text>
          </View>
          <Switch
            value={darkTheme}
            onValueChange={setDarkTheme}
            trackColor={{ false: colors.surfaceAlt, true: colors.accent }}
            thumbColor="#FFFFFF"
          />
        </View>

        <Text style={[styles.group, { color: colors.textSecondary }]}>Sobre o XmocX</Text>
        <View style={[styles.about, { backgroundColor: colors.surface }]}>
          <Text style={[styles.aboutTitle, { color: colors.text }]}>XmocX 1.0.0</Text>
          <Text style={[styles.hint, { color: colors.textSecondary }]}>
            Protótipo educacional de uma plataforma de games. Todos os jogos, pessoas, conquistas e
            atividades são fictícios. Não há backend, autenticação real ou APIs externas.
          </Text>
        </View>
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
    paddingBottom: 32,
  },
  group: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  row: {
    minHeight: 64,
    borderRadius: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
  hint: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 18,
  },
  about: {
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
});
