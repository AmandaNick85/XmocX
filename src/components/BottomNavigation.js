import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

const ICONS = {
  Home: ['home-outline', 'home'],
  Library: ['library-outline', 'library'],
  Community: ['people-outline', 'people'],
  Achievements: ['trophy-outline', 'trophy'],
  Profile: ['person-outline', 'person'],
};

export default function BottomNavigation({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const { colors } = useApp();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const options = descriptors[route.key].options;
        const label = options.tabBarLabel || options.title || route.name;
        const [outline, solid] = ICONS[route.name] || ['ellipse-outline', 'ellipse'];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabItem
            key={route.key}
            focused={focused}
            label={label}
            icon={focused ? solid : outline}
            colors={colors}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

function TabItem({ focused, label, icon, colors, onPress }) {
  const scale = useRef(new Animated.Value(focused ? 1 : 0.94)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1 : 0.94,
      useNativeDriver: true,
      speed: 22,
      bounciness: 8,
    }).start();
  }, [focused, scale]);

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <Animated.View style={{ transform: [{ scale }], alignItems: 'center' }}>
        <Ionicons name={icon} size={22} color={focused ? colors.accent : colors.textMuted} />
        <Text style={[styles.label, { color: focused ? colors.accent : colors.textMuted }]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderTopWidth: 1,
    paddingTop: 8,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '700',
  },
});
