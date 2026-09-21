import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useApp } from '../context/AppContext';
import StackNavigator from './StackNavigator';

export default function AppNavigator() {
  const { colors, darkTheme } = useApp();

  const theme = {
    ...DefaultTheme,
    dark: darkTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      primary: colors.accent,
    },
  };

  return (
    <NavigationContainer theme={theme}>
      <StatusBar style={darkTheme ? 'light' : 'dark'} />
      <StackNavigator />
    </NavigationContainer>
  );
}
