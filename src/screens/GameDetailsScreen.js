import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <GameCover game={game} style={styles.cover} />
          <LinearGradient colors={['transparent', colors.background]} style={styles.fade} />
        </View>
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>{game.title}</Text>
          <Text style={[styles.meta, { color: colors.textMuted }]}>
            {game.genre} · {game.developer} · {game.size}
          </Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>{game.description}</Text>

          <View style={styles.stats}>
            <Stat label="Progresso" value={`${game.progress}%`} colors={colors} />
            <Stat label="Horas" value={`${game.hoursPlayed}h`} colors={colors} />
            <Stat label="Nota" value={game.rating.toFixed(1)} colors={colors} />
          </View>
          <ProgressBar progress={game.progress} height={6} />

          <View style={styles.buttons}>
            <PrimaryButton label="JOGAR" onPress={() => feedback('Sessão mockada iniciada.')} style={{ flex: 1 }} />
            <PrimaryButton
              label="CONTINUAR"
              variant="outline"
              onPress={() => feedback('Continuando de onde parou.')}
              style={{ flex: 1 }}
            />
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
        </View>
      </ScrollView>
    </View>
  );
}

function Stat({ label, value, colors }) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textMuted }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  hero: {
    height: 280,
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 0,
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
  content: {
    padding: 16,
    gap: 12,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  meta: {
    fontSize: 14,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  stats: {
    flexDirection: 'row',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
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
    fontWeight: '700',
  },
});
