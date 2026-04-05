import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2e7d32', // Deep green
    onPrimary: '#ffffff',
    primaryContainer: '#c8e6c9',
    onPrimaryContainer: '#000000',
    secondary: '#81c784',
    background: '#f9fbe7', // Very light green/white
    surface: '#ffffff',
    onSurface: '#1b5e20',
    outline: '#a5d6a7',
    elevation: {
      ...DefaultTheme.colors.elevation,
      level1: '#f1f8e9',
      level2: '#dcedc8',
    }
  },
};
