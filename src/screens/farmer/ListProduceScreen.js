import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TextInput, Button, Text, useTheme, Card } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';
import StorageMonitor from '../../components/StorageMonitor';

export default function ListProduceScreen({ navigation }) {
  const { addListing, currentUser } = useContext(AppContext);
  const theme = useTheme();

  const [cropName, setCropName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState(currentUser.location);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleList = () => {
    addListing({
      crop: cropName,
      quantity: parseFloat(quantity) || 0,
      price: parseFloat(price) || 0,
      location,
      date: date,
      status: 'Active',
      temp: 22,
      humidity: 55
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TextInput mode="outlined" label="Crop Name (e.g. Onion, Wheat)" value={cropName} onChangeText={setCropName} style={styles.input} />
      <TextInput mode="outlined" label="Quantity (kg)" value={quantity} onChangeText={setQuantity} keyboardType="numeric" style={styles.input} />
      <TextInput mode="outlined" label="Expected Price (per kg)" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
      <TextInput mode="outlined" label="Location" value={location} onChangeText={setLocation} style={styles.input} />
      <TextInput mode="outlined" label="Harvest Date (YYYY-MM-DD)" value={date} onChangeText={setDate} style={styles.input} />

      <StorageMonitor temp={22} humidity={55} />

      <Button mode="contained" onPress={handleList} style={styles.btn} contentStyle={{ paddingVertical: 8 }}>
        List Now
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
  iotCard: {
    marginVertical: 16,
    backgroundColor: '#f1f8e9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  btn: {
    marginBottom: 40,
    borderRadius: 8,
  }
});
