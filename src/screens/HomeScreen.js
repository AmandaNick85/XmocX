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
  const byId = (id) => games.find((game) => game.id === id);
  const featured = [1, 6, 11].map(byId).filter(Boolean);
  const hero = featured[0] || games[0];
  const continuePlaying = [1, 6, 11, 7].map(byId).filter(Boolean);
  const recent = games.filter((game) => game.recommended).slice(0, 8);
  const activeFriends = friends.filter((user) => user.status === 'online');
  const tile = (width - 32 - 16) / 3;
  const libTile = (width - 32 - 8) / 2;
  const eventCover = Math.round((width - 32 - 36 - 20) / 3);

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
          <View style={styles.eventArt}>
            <View style={styles.eventCovers}>
              {featured.map((game) => (
                <View key={game.id} style={[styles.eventFrame, { width: eventCover, height: eventCover }]}>
                  <GameCover game={game} style={styles.eventCoverFill} />
                </View>
              ))}
            </View>
          </View>
          <View style={styles.eventBody}>
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
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1C1C1C',
  },
  eventArt: {
    paddingTop: 16,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: '#171717',
  },
  eventCovers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventFrame: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#0F0F0F',
  },
  eventCoverFill: {
    width: '100%',
    height: '100%',
  },
  eventBody: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
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
