import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

import FarmerDashboard from '../screens/farmer/FarmerDashboard';
import MarketPriceScreen from '../screens/farmer/MarketPriceScreen';
import ExportDocsScreen from '../screens/farmer/ExportDocsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function FarmerTabs() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'My Listings') iconName = focused ? 'list' : 'list-outline';
          else if (route.name === 'Market') iconName = focused ? 'trending-up' : 'trending-up-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tab.Screen name="Dashboard" component={FarmerDashboard} />
      <Tab.Screen name="My Listings" component={ExportDocsScreen} options={{title: 'Docs/Listings'}} />
      <Tab.Screen name="Market" component={MarketPriceScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
