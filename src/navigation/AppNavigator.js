import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContext } from '../context/AppContext';

// Screens
import OnboardingScreen from '../screens/OnboardingScreen';
import FarmerTabs from './FarmerTabs';
import BuyerTabs from './BuyerTabs';

// Stack Screens (accessible from anywhere)
import ListProduceScreen from '../screens/farmer/ListProduceScreen';
import MarketPriceScreen from '../screens/farmer/MarketPriceScreen';
import ExportDocsScreen from '../screens/farmer/ExportDocsScreen';
import ProduceDetailScreen from '../screens/buyer/ProduceDetailScreen';
import OrderTrackingScreen from '../screens/buyer/OrderTrackingScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { userRole } = useContext(AppContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userRole ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : userRole === 'Farmer' ? (
        <Stack.Screen name="FarmerApp" component={FarmerTabs} />
      ) : (
        <Stack.Screen name="BuyerApp" component={BuyerTabs} />
      )}
      
      {/* Common/Shared Stack Navigations triggered manually */}
      <Stack.Screen name="ListProduce" component={ListProduceScreen} options={{ headerShown: true, title: 'List Produce' }} />
      <Stack.Screen name="MarketPrice" component={MarketPriceScreen} options={{ headerShown: true, title: 'Market Price' }} />
      <Stack.Screen name="ExportDocs" component={ExportDocsScreen} options={{ headerShown: true, title: 'Export Docs' }} />
      <Stack.Screen name="ProduceDetail" component={ProduceDetailScreen} options={{ headerShown: true, title: 'Produce Details' }} />
      <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} options={{ headerShown: true, title: 'Order Tracking' }} />
    </Stack.Navigator>
  );
}
