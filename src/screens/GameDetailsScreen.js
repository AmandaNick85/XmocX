import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getAchievementsByGame } from '../data/achievements';
import { getGameById } from '../data/games';
import { useApp } from '../context/AppContext';
import AchievementCard from '../components/AchievementCard';
import GameCover from '../components/GameCover';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import ScreenHeader from '../components/ScreenHeader';

export default function GameDetailsScreen({ navigation, route }) {
  const { colors, games, toggleFavorite, toggleWishlist } = useApp();
  const game = games.find((item) => item.id === route.params.gameId) || getGameById(route.params.gameId);
  const gameAchievements = getAchievementsByGame(game.id);

  const feedback = (message) => Alert.alert('XmocX', message);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader title={game.title} onBack={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <GameCover game={game} style={styles.cover} />
        <Text style={[styles.title, { color: colors.text }]}>{game.title}</Text>
        <Text style={[styles.meta, { color: colors.textSecondary }]}>
          {game.genre} · {game.developer} · {game.size}
        </Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>{game.description}</Text>

        <View style={[styles.stats, { backgroundColor: colors.surface }]}>
          <Stat label="Progresso" value={`${game.progress}%`} colors={colors} />
          <Stat label="Horas" value={`${game.hoursPlayed}h`} colors={colors} />
          <Stat label="Nota" value={game.rating.toFixed(1)} colors={colors} />
        </View>
        <ProgressBar progress={game.progress} height={8} />

        <View style={styles.buttons}>
          <PrimaryButton label="JOGAR" onPress={() => feedback('Sessão mockada iniciada.')} style={{ flex: 1 }} />
          <PrimaryButton label="CONTINUAR" variant="outline" onPress={() => feedback('Continuando de onde parou.')} style={{ flex: 1 }} />
        </View>
        <PrimaryButton
          label={game.inList ? 'REMOVER DA LISTA' : 'ADICIONAR À LISTA'}
          variant="outline"
          onPress={() => toggleWishlist(game.id)}
        />
        <PrimaryButton
          label={game.favorite ? 'REMOVER DOS FAVORITOS' : 'FAVORITAR'}
          variant="outline"
          onPress={() => toggleFavorite(game.id)}
        />

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Conquistas</Text>
        {gameAchievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
        {gameAchievements.length === 0 ? (
          <Text style={{ color: colors.textMuted }}>Este título ainda não tem conquistas mockadas.</Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

function Stat({ label, value, colors }) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  cover: {
    height: 220,
    borderRadius: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
  },
  meta: {
    fontSize: 14,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  stats: {
    borderRadius: 18,
    padding: 14,
    flexDirection: 'row',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  sectionTitle: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '800',
  },
});
