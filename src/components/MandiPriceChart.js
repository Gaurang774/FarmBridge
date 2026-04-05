import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { BarChart } from 'react-native-chart-kit';

export default function MandiPriceChart({ chartData, cropName }) {
  const screenWidth = Dimensions.get("window").width - 60;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 15 }}>
          {cropName ? `${cropName} Prices Across Mandis` : 'Mandi Price Comparison'}
        </Text>
        <BarChart
          data={chartData}
          width={screenWidth}
          height={220}
          yAxisLabel="₹"
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForBackgroundLines: {
              stroke: '#eeeeee'
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
          showValuesOnTopOfBars={true}
        />
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: '#fff',
  }
});
