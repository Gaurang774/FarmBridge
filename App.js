import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { AppProvider } from './src/context/AppContext';
import { theme } from './src/theme/Theme';
import AppNavigator from './src/navigation/AppNavigator';

// Keep the splash screen visible while we load resources
SplashScreen.preventAutoHideAsync().catch(() => {});

// Error boundary to catch rendering crashes
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#d32f2f', marginBottom: 10 }}>Something went wrong</Text>
          <Text style={{ fontSize: 14, color: '#333', textAlign: 'center' }}>{String(this.state.error)}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // Mark app as ready after a short delay to ensure layout is done
    setAppIsReady(true);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Hide the splash screen once the root view has laid out
      await SplashScreen.hideAsync().catch(() => {});
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ErrorBoundary>
        <AppProvider>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </PaperProvider>
        </AppProvider>
      </ErrorBoundary>
    </View>
  );
}
