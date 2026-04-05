import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function TraceabilityTimeline({ steps }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 15 }}>Traceability Timeline</Text>
      {steps.map((item, index) => (
        <View key={index} style={styles.stepContainer}>
          <View style={styles.iconContainer}>
            {item.done ? (
              <Ionicons name="checkmark-circle" size={24} color={theme.colors.primary} />
            ) : (
              <Ionicons name="radio-button-off" size={24} color="#ccc" />
            )}
            {index !== steps.length - 1 && (
              <View style={[styles.line, { backgroundColor: item.done ? theme.colors.primary : '#ccc' }]} />
            )}
          </View>
          <View style={styles.textContainer}>
            <Text variant="bodyLarge" style={{ fontWeight: item.done ? 'bold' : 'normal', color: item.done ? '#000' : '#888' }}>
              {item.step}
            </Text>
            {item.date && (
              <Text variant="bodySmall" style={{ color: '#888' }}>{item.date}</Text>
            )}
          </View>
        </View>
      ))}
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
  stepContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  line: {
    width: 2,
    height: 30, // Adjust length to match text height
    marginVertical: 2,
  },
  textContainer: {
    paddingBottom: 20, // Provides space between steps
  }
});
