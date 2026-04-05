import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, useTheme, Divider } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';
import OrderStepper from '../../components/OrderStepper';
import StorageMonitor from '../../components/StorageMonitor';

export default function OrderTrackingScreen() {
  const { orders } = useContext(AppContext);
  const theme = useTheme();

  const getOrderLabel = (id) => {
    if (!id) return 'N/A';
    const str = String(id);
    return str.length > 8 ? str.substring(str.length - 6).toUpperCase() : str;
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Title
        title={`Order #${getOrderLabel(item.id)}`}
        subtitle={`${item.crop} — ${item.quantity} kg @ ₹${item.price || 0}/kg`}
      />
      <Card.Content>
        <OrderStepper currentStatus={item.status} />
        
        <Divider style={{ marginVertical: 15 }} />
        
        <View style={styles.statusRow}>
          <Text variant="bodyMedium">Buyer: </Text>
          <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>{item.buyer || 'N/A'}</Text>
        </View>
        <View style={styles.statusRow}>
          <Text variant="bodyMedium">Status: </Text>
          <Text variant="bodyMedium" style={{ fontWeight: 'bold', color: theme.colors.primary }}>{item.status}</Text>
        </View>
        
        <StorageMonitor temp={item.temp} humidity={item.humidity} />
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineSmall" style={styles.header}>Your Orders</Text>
      {orders.length === 0 ? (
        <View style={styles.emptyState}>
          <Text variant="bodyLarge" style={{ color: '#888' }}>No orders yet</Text>
          <Text variant="bodySmall" style={{ color: '#aaa', marginTop: 5 }}>Place an order from the marketplace</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item, index) => item.id ? String(item.id) : String(index)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    marginBottom: 15,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
});
