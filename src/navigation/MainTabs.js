import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomNavigation from '../components/BottomNavigation';
import AchievementsScreen from '../screens/AchievementsScreen';
import CommunityScreen from '../screens/CommunityScreen';
import HomeScreen from '../screens/HomeScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNavigation {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Início' }} />
      <Tab.Screen name="Library" component={LibraryScreen} options={{ tabBarLabel: 'Biblioteca' }} />
      <Tab.Screen name="Community" component={CommunityScreen} options={{ tabBarLabel: 'Comunidade' }} />
      <Tab.Screen name="Achievements" component={AchievementsScreen} options={{ tabBarLabel: 'Conquistas' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
}
