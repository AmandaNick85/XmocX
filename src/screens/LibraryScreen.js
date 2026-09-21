import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { currentUser } from '../data/users';
import { useApp } from '../context/AppContext';
import AppHeader from '../components/AppHeader';
import CoverTile from '../components/CoverTile';
import FilterChips from '../components/FilterChips';
import TextTabs from '../components/TextTabs';

const TABS = ['Jogos', 'Capturas', 'Lista de desejos'];
const FILTERS = ['Classificar', 'Filtros'];

export default function LibraryScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const { colors, games } = useApp();
  const [tab, setTab] = useState('Jogos');
  const [chip, setChip] = useState('Classificar');
  const tile = (width - 32 - 8) / 2;

  const filtered = useMemo(() => {
    if (tab === 'Lista de desejos') return games.filter((game) => game.inList);
    if (tab === 'Capturas') return [];
    if (chip === 'Filtros') return games.filter((game) => game.installed);
    return games;
  }, [chip, games, tab]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppHeader user={currentUser} title="Minha Biblioteca" onAvatar={() => navigation.navigate('Profile')} />
      <TextTabs options={TABS} selected={tab} onSelect={setTab} />
      <View style={{ height: 8 }} />
      <FilterChips options={FILTERS} selected={chip} onSelect={setChip} />
      <Text style={[styles.count, { color: colors.text }]}>{filtered.length} jogos</Text>
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {filtered.map((game) => (
          <CoverTile
            key={game.id}
            game={game}
            width={tile}
            onPress={() => navigation.navigate('GameDetails', { gameId: game.id })}
          />
        ))}
        {filtered.length === 0 ? (
          <Text style={[styles.empty, { color: colors.textMuted }]}>Nada por aqui ainda.</Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  count: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: '700',
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },
  empty: {
    width: '100%',
    textAlign: 'center',
    marginTop: 24,
  },
});
