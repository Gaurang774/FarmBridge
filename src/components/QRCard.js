import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

export default function QRCard({ value, title }) {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Text variant="titleMedium" style={{ fontWeight: 'bold', marginBottom: 10 }}>{title || "Scan QR"}</Text>
        <QRCode
          value={value || "https://farmbridge.app"}
          size={150}
        />
        <Text variant="bodySmall" style={{ color: '#888', marginTop: 10 }}>
          ID: {value}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    padding: 20,
  }
});
