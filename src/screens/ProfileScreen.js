import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, Avatar, useTheme, Divider } from 'react-native-paper';
import { AppContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { currentUser, userRole, setUserRole } = useContext(AppContext);
  const theme = useTheme();

  const handleLogout = () => {
    setUserRole(null);
  };

  const handleSwitchRole = () => {
    setUserRole(userRole === 'Farmer' ? 'Buyer' : 'Farmer');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.primaryContainer }]}>
            <Ionicons name="person" size={48} color={theme.colors.primary} />
          </View>
          <Text variant="headlineSmall" style={{ fontWeight: 'bold', marginTop: 15 }}>
            {currentUser.name}
          </Text>
          <Text variant="bodyMedium" style={{ color: '#888', marginTop: 5 }}>
            {userRole} • {currentUser.location}
          </Text>
        </Card.Content>
      </Card>

      <Divider style={{ marginVertical: 20 }} />

      <Button
        mode="outlined"
        icon="swap-horizontal"
        style={styles.button}
        contentStyle={styles.btnContent}
        onPress={handleSwitchRole}
      >
        Switch to {userRole === 'Farmer' ? 'Buyer' : 'Farmer'} Mode
      </Button>

      <Button
        mode="contained"
        icon="logout"
        style={[styles.button, { backgroundColor: '#d32f2f' }]}
        contentStyle={styles.btnContent}
        onPress={handleLogout}
      >
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileCard: {
    marginTop: 10,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 8,
    borderRadius: 8,
  },
  btnContent: {
    paddingVertical: 8,
  },
});
