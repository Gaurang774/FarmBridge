import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function AISuggestionBanner({ suggestion }) {
  const theme = useTheme();

  return (
    <View style={[styles.banner, { backgroundColor: theme.colors.primaryContainer }]}>
      <Ionicons name="bulb" size={24} color={theme.colors.primary} style={{ marginRight: 10 }} />
      <View style={{ flex: 1 }}>
        <Text variant="labelLarge" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>AI Market Insight</Text>
        <Text variant="bodyMedium" style={{ color: '#333' }}>{suggestion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  }
});
