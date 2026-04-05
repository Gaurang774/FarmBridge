import React, { useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Title, Paragraph, useTheme, FAB, Chip } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';

export default function FarmerDashboard({ navigation }) {
  const { currentUser, listings } = useContext(AppContext);
  const theme = useTheme();

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Title>{item.crop}</Title>
          <Chip icon="information" style={{ backgroundColor: theme.colors.primaryContainer }}>{item.status}</Chip>
        </View>
        <Paragraph>{item.quantity} kg | ₹{item.price}/kg</Paragraph>
        <Paragraph style={styles.dim}>Listed: {item.date}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineSmall" style={styles.header}>Welcome, {currentUser.name}</Text>
      <Text variant="titleMedium" style={styles.subtext}>Your Active Listings</Text>
      
      <FlatList
        data={listings}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color="#fff"
        onPress={() => navigation.navigate('ListProduce')}
        label="List My Produce"
      />
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
    marginBottom: 5,
  },
  subtext: {
    marginBottom: 15,
    color: '#666',
  },
  card: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dim: {
    color: 'gray',
    fontSize: 12,
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
