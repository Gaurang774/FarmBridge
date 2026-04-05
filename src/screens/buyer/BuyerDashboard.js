import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Text, Card, Title, Paragraph, Button, Searchbar, useTheme, Chip } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';

export default function BuyerDashboard({ navigation }) {
  const { listings } = useContext(AppContext);
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredListings = listings.filter(l =>
    l.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Title style={{ flex: 1 }}>{item.crop}</Title>
          <Chip
            icon="information"
            style={{ backgroundColor: item.status === 'Active' ? '#e8f5e9' : '#fff3e0' }}
            textStyle={{ fontSize: 11 }}
          >
            {item.status}
          </Chip>
        </View>
        <Paragraph>{item.quantity} kg | ₹{item.price}/kg</Paragraph>
        <Paragraph style={styles.dim}>{item.location} • {item.date}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" compact onPress={() => navigation.navigate('ProduceDetail', { listing: item })}>
          View Details
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Searchbar
        placeholder="Search by crop or location..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.search}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        <Chip icon="leaf" style={styles.filterChip} onPress={() => setSearchQuery('')}>All</Chip>
        <Chip icon="grain" style={styles.filterChip} onPress={() => setSearchQuery('Wheat')}>Wheat</Chip>
        <Chip icon="food-apple" style={styles.filterChip} onPress={() => setSearchQuery('Tomato')}>Tomato</Chip>
        <Chip icon="circle" style={styles.filterChip} onPress={() => setSearchQuery('Onion')}>Onion</Chip>
      </ScrollView>

      {filteredListings.length === 0 ? (
        <View style={styles.emptyState}>
          <Text variant="bodyLarge" style={{ color: '#888' }}>No listings found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredListings}
          keyExtractor={item => item.id}
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
  search: {
    marginBottom: 10,
    backgroundColor: '#fff',
    elevation: 1,
  },
  filterScroll: {
    marginBottom: 12,
    flexGrow: 0,
  },
  filterChip: {
    marginRight: 8,
  },
  card: {
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dim: {
    color: 'gray',
    fontSize: 12,
    marginTop: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
});
