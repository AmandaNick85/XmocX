import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

const ICONS = {
  Home: ['home-outline', 'home'],
  Community: ['people-outline', 'people'],
  Library: ['library-outline', 'library'],
  Achievements: ['trophy-outline', 'trophy'],
  Profile: ['person-circle-outline', 'person-circle'],
};

export default function BottomNavigation({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const { colors } = useApp();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: '#0A0A0A',
          paddingBottom: Math.max(insets.bottom, 6),
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
  const scale = useRef(new Animated.Value(focused ? 1 : 0.96)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: focused ? 1 : 0.96,
      useNativeDriver: true,
      speed: 22,
      bounciness: 6,
    }).start();
  }, [focused, scale]);

  const color = focused ? colors.tabActive : colors.tabInactive;

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <Animated.View style={{ transform: [{ scale }], alignItems: 'center' }}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={[styles.label, { color }]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingTop: 8,
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: '600',
  },
});
