import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function StorageMonitor({ temp, humidity }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 10 }}>Storage Conditions (IoT)</Text>
      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Ionicons name="thermometer" size={24} color={theme.colors.error} />
          <View style={{ marginLeft: 8 }}>
            <Text variant="labelMedium" style={{ color: '#666' }}>Temperature</Text>
            <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{temp ? `${temp}°C` : '--'}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.metric}>
          <Ionicons name="water" size={24} color={theme.colors.primary} />
          <View style={{ marginLeft: 8 }}>
            <Text variant="labelMedium" style={{ color: '#666' }}>Humidity</Text>
            <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>{humidity ? `${humidity}%` : '--'}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    elevation: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#ccc',
  }
});
