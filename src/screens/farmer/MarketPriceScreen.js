import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import api from '../../services/api';
import MandiPriceChart from '../../components/MandiPriceChart';
import AISuggestionBanner from '../../components/AISuggestionBanner';

// Fallback data so the screen always renders
const FALLBACK_PRICES = [
  { crop: 'Wheat', pune: 25, nashik: 27, mumbai: 30 },
  { crop: 'Tomato', pune: 38, nashik: 40, mumbai: 45 },
  { crop: 'Onion', pune: 18, nashik: 20, mumbai: 22 },
  { crop: 'Soybean', pune: 55, nashik: 52, mumbai: 58 },
];

const FALLBACK_SUGGESTIONS = [
  'Onion prices rising 12% next week — best time to sell',
  'Tomato demand high in Mumbai — list now for better rates',
  'Wheat prices stable — hold stock for 3 more days',
];

export default function MarketPriceScreen() {
  const theme = useTheme();
  const [mandiPrices, setMandiPrices] = useState(FALLBACK_PRICES);
  const [suggestions, setSuggestions] = useState(FALLBACK_SUGGESTIONS);

  useEffect(() => {
    const load = async () => {
      try {
        const [prices, suggs] = await Promise.all([
          api.getMarketPrices(),
          api.getSuggestions(),
        ]);
        if (prices && prices.length > 0) setMandiPrices(prices);
        if (suggs && suggs.length > 0) setSuggestions(suggs);
      } catch (err) {
        console.warn('Market data fetch failed, using fallback:', err.message);
      }
    };
    load();
  }, []);

  const selectedCrop = mandiPrices[0];
  const chartData = {
    labels: ['Pune', 'Nashik', 'Mumbai'],
    datasets: [{ data: [selectedCrop.pune, selectedCrop.nashik, selectedCrop.mumbai] }],
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AISuggestionBanner suggestion={suggestions[0] || ''} />
      <MandiPriceChart chartData={chartData} cropName={selectedCrop.crop} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
