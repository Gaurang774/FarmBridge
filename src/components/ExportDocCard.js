import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function ExportDocCard({ listing }) {
  if (!listing) return null;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.headerRow}>
          <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>Export Certification</Text>
          <Ionicons name="document-text" size={24} color="#666" />
        </View>
        <View style={styles.detailsBox}>
          <Text>ID: {listing.id}</Text>
          <Text>Crop: {listing.crop}</Text>
          <Text>Origin: {listing.location}</Text>
          <Text>Grade: Premium Export Quality</Text>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" icon="download" onPress={() => {}}>Download PDF</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailsBox: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
  }
});
