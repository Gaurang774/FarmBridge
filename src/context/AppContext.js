import React, { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const AppContext = createContext();

// ── Offline fallback data (same as original mockData.js) ──────
const FALLBACK_USER_FARMER = { name: 'Ramesh Singh', location: 'Pune', phone: '9876543210', totalListings: 3, totalEarnings: '₹45,000' };
const FALLBACK_USER_BUYER = { name: 'Anil Traders', location: 'Mumbai', phone: '9123456780' };

const FALLBACK_LISTINGS = [
  { id: 'L001', crop: 'Wheat', quantity: 500, price: 25, location: 'Pune Mandi', date: '2024-05-15', status: 'Active', temp: 22, humidity: 55 },
  { id: 'L002', crop: 'Tomato', quantity: 150, price: 40, location: 'Nashik', date: '2024-05-10', status: 'Sold', temp: 24, humidity: 60 },
  { id: 'L003', crop: 'Onion', quantity: 300, price: 18, location: 'Lasalgaon', date: '2024-05-12', status: 'Active', temp: 20, humidity: 50 },
];

const FALLBACK_ORDERS = [
  { id: '101', crop: 'Tomato', quantity: 50, buyer: 'Fresh Mart', status: 'Confirmed', temp: 18, humidity: 65, listingId: 'L002', price: 40 },
  { id: '102', crop: 'Wheat', quantity: 200, buyer: 'Anil Traders', status: 'Placed', temp: 22, humidity: 60, listingId: 'L001', price: 25 },
];

export const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState({ name: '', location: '' });
  const [listings, setListings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // ── Fetch listings ──
  const fetchListings = useCallback(async () => {
    try {
      const data = await api.getListings();
      setListings(data);
      return true;
    } catch (err) {
      console.warn('Failed to fetch listings:', err.message);
      return false;
    }
  }, []);

  // ── Fetch orders ──
  const fetchOrders = useCallback(async () => {
    try {
      const data = await api.getOrders();
      setOrders(data);
      return true;
    } catch (err) {
      console.warn('Failed to fetch orders:', err.message);
      return false;
    }
  }, []);

  // ── Initialize on role selection ──
  useEffect(() => {
    if (!userRole) return;

    const init = async () => {
      setLoading(true);
      let online = false;

      try {
        const user = await api.login(userRole);
        setCurrentUser(user);
        online = true;
      } catch (err) {
        console.warn('Login failed, using offline data:', err.message);
        setCurrentUser(userRole === 'Farmer' ? FALLBACK_USER_FARMER : FALLBACK_USER_BUYER);
      }

      if (online) {
        await Promise.all([fetchListings(), fetchOrders()]);
      }

      // If still empty after API attempt, use fallback
      setListings(prev => prev.length > 0 ? prev : FALLBACK_LISTINGS);
      setOrders(prev => prev.length > 0 ? prev : FALLBACK_ORDERS);

      setLoading(false);
    };

    init();
  }, [userRole, fetchListings, fetchOrders]);

  // ── Add listing ──
  const addListing = async (listing) => {
    try {
      const created = await api.createListing({ ...listing, farmerId: currentUser.id || null });
      setListings(prev => [created, ...prev]);
    } catch (err) {
      console.warn('Failed to create listing:', err.message);
      setListings(prev => [{ ...listing, id: 'L' + Date.now() }, ...prev]);
    }
  };

  // ── Place order ──
  const placeOrder = async (listing, quantity) => {
    const orderData = {
      listingId: listing.id,
      crop: listing.crop,
      quantity,
      price: listing.price,
      buyer: 'Current Buyer',
      temp: listing.temp || 20,
      humidity: listing.humidity || 50,
    };

    try {
      const created = await api.placeOrder(orderData);
      setOrders(prev => [created, ...prev]);
    } catch (err) {
      console.warn('Failed to place order:', err.message);
      setOrders(prev => [{ ...orderData, id: 'O' + Date.now(), status: 'Placed' }, ...prev]);
    }
  };

  return (
    <AppContext.Provider value={{
      userRole, setUserRole,
      currentUser, setCurrentUser,
      listings, addListing, fetchListings,
      orders, placeOrder, fetchOrders,
      loading,
    }}>
      {children}
    </AppContext.Provider>
  );
};
