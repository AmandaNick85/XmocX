import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { gameCovers } from '../data/images';

export default function GameCover({ game, style, showTitle = false }) {
  const cover = gameCovers[game.id];

  return (
    <View style={[styles.cover, style]}>
      {cover ? (
        <Image source={cover} style={StyleSheet.absoluteFill} resizeMode="cover" />
      ) : (
        <LinearGradient colors={game.coverColors} style={StyleSheet.absoluteFill} />
      )}
      {showTitle ? (
        <View style={styles.titleWrap}>
          <Text numberOfLines={2} style={styles.title}>
            {game.title}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    overflow: 'hidden',
    backgroundColor: '#151515',
  },
  titleWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
