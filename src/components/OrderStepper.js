import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

export default function OrderStepper({ currentStatus }) {
  const theme = useTheme();
  
  const steps = ['Placed', 'Confirmed', 'Transit', 'Delivered'];
  
  // Basic logic to determine active steps
  const getStepStatus = (stepName) => {
    const currentIndex = steps.indexOf(currentStatus);
    const stepIndex = steps.indexOf(stepName);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 15 }}>Order Status</Text>
      <View style={styles.stepperRow}>
        {steps.map((step, index) => {
          const status = getStepStatus(step);
          const color = status === 'completed' ? theme.colors.primary : status === 'active' ? theme.colors.primary : '#ccc';
          
          return (
            <React.Fragment key={index}>
              <View style={styles.step}>
                <View style={[styles.circle, { borderColor: color, backgroundColor: status === 'completed' ? theme.colors.primary : 'transparent' }]} />
                <Text variant="labelSmall" style={{ color: status === 'pending' ? '#888' : '#000', marginTop: 5 }}>{step}</Text>
              </View>
              {index < steps.length - 1 && (
                <View style={[styles.line, { backgroundColor: status === 'completed' ? theme.colors.primary : '#ccc' }]} />
              )}
            </React.Fragment>
          );
        })}
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
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  step: {
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  line: {
    flex: 1,
    height: 2,
    marginHorizontal: 5,
    marginBottom: 20, // offset for text below circle
  }
});
