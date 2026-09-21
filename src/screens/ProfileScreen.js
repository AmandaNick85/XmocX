import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { currentUser } from '../data/users';
import { achievements, achievementStats } from '../data/achievements';
import { useApp } from '../context/AppContext';
import AchievementCard from '../components/AchievementCard';
import CoverTile from '../components/CoverTile';
import TextTabs from '../components/TextTabs';
import UserAvatar from '../components/UserAvatar';

const TABS = ['Prêmios', 'Postagens', 'Conquistas', 'Sobre'];

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { colors, games } = useApp();
  const [tab, setTab] = useState('Prêmios');
  const recent = [...games].sort((a, b) => b.progress - a.progress).slice(0, 4);
  const tile = (width - 32 - 8) / 2;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#2A4A3A', '#1A2030', '#111111']} style={[styles.banner, { paddingTop: insets.top + 8 }]}>
          <View style={styles.topBar}>
            <View style={{ width: 38 }} />
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.topName}>{currentUser.name}</Text>
              <Text style={styles.topSub}>Rewards</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Settings')} style={styles.gear}>
              <Ionicons name="settings-outline" size={20} color="#FFF" />
            </Pressable>
          </View>
          <View style={styles.avatarWrap}>
            <UserAvatar user={currentUser} size={96} />
            <View style={[styles.pencil, { backgroundColor: colors.surface }]}>
              <Ionicons name="pencil" size={14} color={colors.text} />
            </View>
          </View>
          <Text style={styles.name}>{currentUser.name}</Text>
          <Text style={styles.appLabel}>App XmocX</Text>
          <View style={styles.iconRow}>
            <Ionicons name="game-controller-outline" size={18} color="#FFF" />
            <Ionicons name="chatbubble-ellipses-outline" size={18} color="#FFF" />
            <Ionicons name="person-add-outline" size={18} color="#FFF" />
          </View>
        </LinearGradient>

        <View style={styles.followRow}>
          <FollowStat value={currentUser.friendsCount} label="Amigos" />
          <FollowStat value={currentUser.following} label="Seguindo" />
          <FollowStat value={currentUser.followers} label="Seguidores" />
        </View>

        <Pressable style={[styles.presence, { backgroundColor: colors.surfaceAlt }]}>
          <Text style={{ color: colors.text, fontWeight: '600' }}>Invisível</Text>
        </Pressable>

        <TextTabs options={TABS} selected={tab} onSelect={setTab} />

        <View style={styles.body}>
          {tab === 'Prêmios' ? (
            <>
              <View style={styles.rewardSplit}>
                <View style={styles.rewardCol}>
                  <Text style={[styles.rewardValue, { color: colors.text }]}>
                    {currentUser.rewards.toLocaleString('pt-BR')}
                  </Text>
                  <Text style={{ color: colors.textMuted }}>Pontos do Rewards</Text>
                </View>
                <View style={[styles.vLine, { backgroundColor: colors.border }]} />
                <View style={styles.rewardCol}>
                  <Text style={[styles.rewardValue, { color: colors.text }]}>1d em uma linha</Text>
                  <Text style={{ color: colors.textMuted }}>Sequência móvel</Text>
                </View>
              </View>
              <View style={[styles.goal, { backgroundColor: colors.surface }]}>
                <Ionicons name="locate-outline" size={36} color={colors.accent} />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.goalTitle, { color: colors.text }]}>Estabeleça uma meta</Text>
                  <Text style={{ color: colors.textMuted }}>
                    Escolha sua recompensa favorita e siga seu progresso.
                  </Text>
                </View>
              </View>
              <Text style={[styles.section, { color: colors.text }]}>Jogados recentemente</Text>
              <View style={styles.grid}>
                {recent.map((game) => (
                  <CoverTile
                    key={game.id}
                    game={game}
                    width={tile}
                    onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
                  />
                ))}
              </View>
            </>
          ) : null}

          {tab === 'Conquistas' ? (
            <>
              <Text style={[styles.section, { color: colors.text }]}>
                {achievementStats.unlocked} conquistas · {achievementStats.gamerscore} G
              </Text>
              {achievements.slice(0, 8).map((item) => (
                <AchievementCard key={item.id} achievement={item} />
              ))}
            </>
          ) : null}

          {tab === 'Postagens' ? (
            <Text style={[styles.empty, { color: colors.textMuted }]}>Nenhuma postagem mockada.</Text>
          ) : null}

          {tab === 'Sobre' ? (
            <Text style={[styles.about, { color: colors.textSecondary }]}>{currentUser.bio}</Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

function FollowStat({ value, label }) {
  return (
    <View style={styles.followStat}>
      <Text style={styles.followValue}>{value}</Text>
      <Text style={styles.followLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  banner: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  topBar: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  topSub: {
    color: '#C8C8C8',
    fontSize: 12,
  },
  gear: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarWrap: {
    marginBottom: 8,
  },
  pencil: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '700',
  },
  appLabel: {
    marginTop: 2,
    color: '#C8C8C8',
    fontSize: 13,
  },
  iconRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 16,
  },
  followRow: {
    paddingVertical: 16,
    flexDirection: 'row',
  },
  followStat: {
    flex: 1,
    alignItems: 'center',
  },
  followValue: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  followLabel: {
    marginTop: 2,
    color: '#B3B3B3',
    fontSize: 13,
  },
  presence: {
    marginHorizontal: 16,
    marginBottom: 12,
    minHeight: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  rewardSplit: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  rewardCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  rewardValue: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  vLine: {
    width: 1,
  },
  goal: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  section: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },
  empty: {
    textAlign: 'center',
    paddingVertical: 24,
  },
  about: {
    fontSize: 15,
    lineHeight: 22,
  },
});
