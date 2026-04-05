import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import ExportDocCard from '../../components/ExportDocCard';
import { AppContext } from '../../context/AppContext';

export default function ExportDocsScreen() {
  const theme = useTheme();
  const { listings } = useContext(AppContext);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineSmall" style={styles.header}>Export Documentation</Text>
      <Text variant="bodyMedium" style={{ marginBottom: 20 }}>Generate compliance and traceability documents for your recent orders.</Text>

      {listings.slice(0, 3).map((listing) => (
        <ExportDocCard key={listing.id} listing={listing} />
      ))}

      <Button mode="outlined" icon="file-document-outline" style={{ marginTop: 20 }}>
        Generate New Export Doc
      </Button>
    </ScrollView>
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
});
