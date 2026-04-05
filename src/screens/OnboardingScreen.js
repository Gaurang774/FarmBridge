import React, { useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function OnboardingScreen() {
  const { setUserRole } = useContext(AppContext);
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.branding}>
        <Ionicons name="leaf" size={100} color={theme.colors.primary} />
        <Text variant="displaySmall" style={{ color: theme.colors.primary, fontWeight: 'bold', marginTop: 20 }}>
          FarmBridge
        </Text>
        <Text variant="titleMedium" style={{ color: theme.colors.onSurface, marginTop: 10 }}>
          Farm to Market, Directly
        </Text>
      </View>

      <View style={styles.actions}>
        <Button 
          mode="contained" 
          style={styles.button} 
          contentStyle={styles.btnContent}
          onPress={() => setUserRole('Farmer')}
        >
          I am a Farmer
        </Button>
        <Button 
          mode="outlined" 
          style={styles.button} 
          contentStyle={styles.btnContent}
          onPress={() => setUserRole('Buyer')}
        >
          I am a Buyer
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  branding: {
    alignItems: 'center',
    marginBottom: 60,
  },
  actions: {
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    marginVertical: 10,
    borderRadius: 8,
  },
  btnContent: {
    paddingVertical: 10,
  }
});
