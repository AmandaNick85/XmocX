import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { currentUser, friends } from '../data/users';
import { useApp } from '../context/AppContext';
import AppHeader from '../components/AppHeader';
import CoverTile from '../components/CoverTile';
import GameCover from '../components/GameCover';
import SearchBar from '../components/SearchBar';
import SectionHeader from '../components/SectionHeader';
import UserAvatar from '../components/UserAvatar';

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { colors, games } = useApp();
  const featured = games.filter((game) => game.featured).slice(0, 3);
  const hero = featured[0] || games[0];
  const continuePlaying = games.filter((game) => game.inContinue);
  const recent = games.filter((game) => game.recommended).slice(0, 8);
  const activeFriends = friends.filter((user) => user.status === 'online');
  const tile = (width - 32 - 16) / 3;
  const libTile = (width - 32 - 8) / 2;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <LinearGradient colors={['#1A3A18', '#111111']} style={styles.glow} />
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }} showsVerticalScrollIndicator={false}>
        <AppHeader
          user={currentUser}
          title={currentUser.name}
          onAvatar={() => navigation.navigate('Profile')}
          subtitle={
            <>
              <View style={styles.metaItem}>
                <Text style={[styles.gIcon, { color: colors.accent }]}>G</Text>
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                  {currentUser.gamerscore.toLocaleString('pt-BR')}
                </Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="gift-outline" size={14} color={colors.accent} />
                <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                  {currentUser.rewards.toLocaleString('pt-BR')}
                </Text>
              </View>
            </>
          }
          right={
            <>
              <Pressable style={styles.iconBtn} onPress={() => navigation.navigate('Search')}>
                <Ionicons name="tablet-landscape-outline" size={20} color={colors.text} />
              </Pressable>
              <Pressable style={styles.iconBtn} onPress={() => navigation.navigate('Notifications')}>
                <Ionicons name="notifications-outline" size={20} color={colors.text} />
                <View style={[styles.badge, { backgroundColor: colors.accent }]}>
                  <Text style={styles.badgeText}>2</Text>
                </View>
              </Pressable>
            </>
          }
        />

        <View style={styles.searchWrap}>
          <SearchBar onPress={() => navigation.navigate('Search')} />
        </View>

        <Pressable
          onPress={() => navigation.navigate('GameDetails', { gameId: hero.id })}
          style={styles.eventCard}
        >
          <LinearGradient colors={['#D7E3C4', '#8FA87A', '#2A3A22']} style={styles.eventArt}>
            <Text style={styles.eventMark}>XmocX</Text>
            <View style={styles.eventCovers}>
              {featured.map((game) => (
                <GameCover key={game.id} game={game} compact style={styles.eventCover} />
              ))}
            </View>
          </LinearGradient>
          <View style={[styles.eventBody, { backgroundColor: 'rgba(20,20,20,0.55)' }]}>
            <Text style={styles.eventTitle}>Destaques da semana</Text>
            <Text style={styles.eventSub}>Veja os jogos</Text>
          </View>
        </Pressable>

        <SectionHeader title="Amigos ativos" actionLabel="Ver tudo" onAction={() => navigation.navigate('Community')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.friendsRow}>
          {activeFriends.map((user) => (
            <Pressable
              key={user.id}
              style={styles.friend}
              onPress={() => navigation.navigate('UserProfile', { userId: user.id })}
            >
              <UserAvatar user={user} size={74} showStar={user.favorite} />
              <Text numberOfLines={1} style={[styles.friendName, { color: colors.text }]}>
                {user.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <SectionHeader title="Continuar jogando" actionLabel="Ver tudo" onAction={() => navigation.navigate('Library')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hList}>
          {continuePlaying.map((game) => (
            <CoverTile
              key={game.id}
              game={game}
              width={tile}
              onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
            />
          ))}
        </ScrollView>

        <SectionHeader title="Adicionados recentemente" actionLabel="Ver tudo" onAction={() => navigation.navigate('Library')} />
        <View style={styles.grid}>
          {recent.slice(0, 4).map((game) => (
            <CoverTile
              key={game.id}
              game={game}
              width={libTile}
              onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 220,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gIcon: {
    fontSize: 13,
    fontWeight: '800',
  },
  metaText: {
    fontSize: 13,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#111',
    fontSize: 10,
    fontWeight: '800',
  },
  searchWrap: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  eventCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 18,
    overflow: 'hidden',
  },
  eventArt: {
    height: 250,
    padding: 18,
    justifyContent: 'space-between',
  },
  eventMark: {
    alignSelf: 'center',
    marginTop: 8,
    color: '#24351A',
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 1,
  },
  eventCovers: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  eventCover: {
    width: 86,
    height: 86,
    borderRadius: 8,
  },
  eventBody: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  eventTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  eventSub: {
    marginTop: 2,
    color: '#D0D0D0',
    fontSize: 14,
  },
  friendsRow: {
    paddingHorizontal: 16,
    paddingBottom: 22,
    gap: 16,
  },
  friend: {
    width: 86,
    alignItems: 'center',
    gap: 8,
  },
  friendName: {
    fontSize: 12,
    fontWeight: '600',
  },
  hList: {
    paddingHorizontal: 16,
    paddingBottom: 22,
    gap: 8,
  },
  grid: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },
});
