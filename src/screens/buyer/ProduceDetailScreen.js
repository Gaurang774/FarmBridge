import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, useTheme, Divider } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';
import api from '../../services/api';
import QRCard from '../../components/QRCard';
import TraceabilityTimeline from '../../components/TraceabilityTimeline';
import StorageMonitor from '../../components/StorageMonitor';

export default function ProduceDetailScreen({ route, navigation }) {
  const { listing } = route.params;
  const { placeOrder } = useContext(AppContext);
  const theme = useTheme();
  const FALLBACK_STEPS = [
    { label: 'Harvested', done: true },
    { label: 'Listed', done: true },
    { label: 'Quality Checked', done: true },
    { label: 'Ready to Ship', done: false },
  ];

  const [traceabilitySteps, setTraceabilitySteps] = useState(FALLBACK_STEPS);

  useEffect(() => {
    api.getTraceability()
      .then(data => { if (data && data.length > 0) setTraceabilitySteps(data); })
      .catch(() => {});
  }, []);

  const handleOrder = () => {
    placeOrder(listing, listing.quantity);
    navigation.navigate('Orders');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.card}>
        <View style={styles.mapPlaceholder}>
          <Text style={{ color: '#888' }}>[ Map Placeholder: {listing.location} ]</Text>
        </View>
        <Card.Title title={listing.crop} subtitle={`${listing.quantity} kg | ₹${listing.price}/kg`} />
        <Card.Content>
          <Text variant="bodyMedium">Location: {listing.location}</Text>
          <Text variant="bodyMedium">Date: {listing.date}</Text>
          
          <Divider style={styles.divider} />
          
          <TraceabilityTimeline steps={traceabilitySteps} />
          
          <StorageMonitor temp={22} humidity={55} />
          
          <Divider style={styles.divider} />
          
          <QRCard value={`FB-${listing.id}`} title="Scan Traceability Hash" />
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode="outlined" style={{ flex: 1, marginRight: 10 }}>Contact</Button>
          <Button mode="contained" onPress={handleOrder} style={{ flex: 1 }}>Place Order</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 40,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    height: 150,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    marginVertical: 15,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  }
});
