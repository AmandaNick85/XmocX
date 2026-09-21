import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors } from '../theme/colors';
import { games as mockGames } from '../data/games';

const STORAGE_KEYS = {
  favorites: '@xmocx/favorites',
  wishlist: '@xmocx/wishlist',
  darkTheme: '@xmocx/darkTheme',
  likes: '@xmocx/likes',
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(
    mockGames.filter((game) => game.favorite).map((game) => game.id)
  );
  const [wishlistIds, setWishlistIds] = useState([1, 12]);
  const [darkTheme, setDarkTheme] = useState(true);
  const [likedActivityIds, setLikedActivityIds] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const [favoritesValue, wishlistValue, themeValue, likesValue] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.favorites),
          AsyncStorage.getItem(STORAGE_KEYS.wishlist),
          AsyncStorage.getItem(STORAGE_KEYS.darkTheme),
          AsyncStorage.getItem(STORAGE_KEYS.likes),
        ]);

        if (!mounted) return;

        if (favoritesValue) setFavoriteIds(JSON.parse(favoritesValue));
        if (wishlistValue) setWishlistIds(JSON.parse(wishlistValue));
        if (themeValue !== null) setDarkTheme(JSON.parse(themeValue));
        if (likesValue) setLikedActivityIds(JSON.parse(likesValue));
      } catch (error) {
        // Mock local: se o storage falhar, segue com os dados em memória.
      } finally {
        if (mounted) setReady(true);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const colors = darkTheme ? darkColors : lightColors;

  const games = useMemo(
    () =>
      mockGames.map((game) => ({
        ...game,
        favorite: favoriteIds.includes(game.id),
        inList: wishlistIds.includes(game.id),
      })),
    [favoriteIds, wishlistIds]
  );

  const value = useMemo(
    () => ({
      ready,
      colors,
      darkTheme,
      games,
      favoriteIds,
      wishlistIds,
      likedActivityIds,
      toggleFavorite: (gameId) => {
        setFavoriteIds((current) => {
          const next = current.includes(gameId)
            ? current.filter((id) => id !== gameId)
            : [...current, gameId];
          AsyncStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
          return next;
        });
      },
      toggleWishlist: (gameId) => {
        setWishlistIds((current) => {
          const next = current.includes(gameId)
            ? current.filter((id) => id !== gameId)
            : [...current, gameId];
          AsyncStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(next));
          return next;
        });
      },
      setDarkTheme: (enabled) => {
        setDarkTheme(enabled);
        AsyncStorage.setItem(STORAGE_KEYS.darkTheme, JSON.stringify(enabled));
      },
      toggleLike: (activityId) => {
        setLikedActivityIds((current) => {
          const next = current.includes(activityId)
            ? current.filter((id) => id !== activityId)
            : [...current, activityId];
          AsyncStorage.setItem(STORAGE_KEYS.likes, JSON.stringify(next));
          return next;
        });
      },
    }),
    [ready, colors, darkTheme, games, favoriteIds, wishlistIds, likedActivityIds]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
}
