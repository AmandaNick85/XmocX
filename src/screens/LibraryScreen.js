import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import FilterChips from '../components/FilterChips';
import GameCard from '../components/GameCard';
import ScreenHeader from '../components/ScreenHeader';

const FILTERS = ['Todos', 'Instalados', 'Recentes', 'Favoritos'];

export default function LibraryScreen({ navigation }) {
  const { colors, games } = useApp();
  const [filter, setFilter] = useState('Todos');

  const filtered = useMemo(() => {
    if (filter === 'Instalados') return games.filter((game) => game.installed);
    if (filter === 'Recentes') {
      return [...games].sort((a, b) => b.hoursPlayed - a.hoursPlayed).slice(0, 8);
    }
    if (filter === 'Favoritos') return games.filter((game) => game.favorite);
    return games;
  }, [filter, games]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Minha Biblioteca" subtitle={`${filtered.length} jogos`} />
      <FilterChips options={FILTERS} selected={filter} onSelect={setFilter} />
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {filtered.map((game) => (
          <View key={game.id} style={styles.item}>
            <GameCard
              game={game}
              width="100%"
              onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
            />
            <Text style={[styles.status, { color: colors.textMuted }]}>
              {game.installed ? 'Instalado' : 'Na nuvem'} · {game.progress}%
            </Text>
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
  grid: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    marginBottom: 14,
  },
  status: {
    marginTop: 6,
    fontSize: 12,
  },
});
