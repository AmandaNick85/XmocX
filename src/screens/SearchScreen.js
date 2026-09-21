import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { searchAchievements } from '../data/achievements';
import { searchGames } from '../data/games';
import { searchUsers } from '../data/users';
import { useApp } from '../context/AppContext';
import AchievementCard from '../components/AchievementCard';
import FilterChips from '../components/FilterChips';
import GameCard from '../components/GameCard';
import ScreenHeader from '../components/ScreenHeader';
import SearchBar from '../components/SearchBar';
import UserAvatar from '../components/UserAvatar';

const FILTERS = ['Todos', 'Jogos', 'Pessoas', 'Conquistas'];

export default function SearchScreen({ navigation }) {
  const { colors, games } = useApp();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Todos');

  const gameResults = useMemo(() => {
    const source = query ? searchGames(query) : games;
    return source;
  }, [games, query]);

  const userResults = useMemo(() => searchUsers(query), [query]);
  const achievementResults = useMemo(() => searchAchievements(query), [query]);

  const showGames = filter === 'Todos' || filter === 'Jogos';
  const showPeople = filter === 'Todos' || filter === 'Pessoas';
  const showAchievements = filter === 'Todos' || filter === 'Conquistas';

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Pesquisa" onBack={() => navigation.goBack()} />
      <View style={styles.searchWrap}>
        <SearchBar value={query} onChangeText={setQuery} autoFocus />
      </View>
      <FilterChips options={FILTERS} selected={filter} onSelect={setFilter} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {showGames ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Jogos</Text>
            <View style={styles.gameGrid}>
              {gameResults.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  width="48%"
                  onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
                />
              ))}
            </View>
            {gameResults.length === 0 ? (
              <Text style={{ color: colors.textMuted }}>Nenhum jogo encontrado.</Text>
            ) : null}
          </View>
        ) : null}

        {showPeople ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Pessoas</Text>
            {userResults.map((user) => (
              <Pressable
                key={user.id}
                onPress={() => navigation.navigate('UserProfile', { userId: user.id })}
                style={[styles.userRow, { backgroundColor: colors.surface }]}
              >
                <UserAvatar user={user} size={44} showStatus />
                <View style={{ flex: 1 }}>
                  <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
                  <Text style={{ color: colors.textSecondary }}>@{user.handle}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        ) : null}

        {showAchievements ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Conquistas</Text>
            {achievementResults.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  searchWrap: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  content: {
    padding: 16,
    gap: 22,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  gameGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  userRow: {
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userName: {
    fontSize: 15,
    fontWeight: '800',
  },
});
