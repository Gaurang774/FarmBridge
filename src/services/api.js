/**
 * FarmBridge API Service Layer
 * 
 * Thin wrapper around fetch calls to the Express backend.
 * Maps MongoDB `_id` → `id` so existing screens need zero changes.
 * 
 * Auto-detects the correct backend URL:
 * - On web: uses localhost
 * - On mobile: uses the dev machine's LAN IP (from Expo debugger host)
 */

import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Auto-detect the backend host based on platform
const getBaseUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:5000/api';
  }
  // On mobile, extract the dev machine IP from the Expo debugger host
  const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost || '';
  const hostIP = debuggerHost.split(':')[0];
  if (hostIP) {
    return `http://${hostIP}:5000/api`;
  }
  // Fallback to LAN IP
  return 'http://192.168.1.12:5000/api';
};

const BASE_URL = getBaseUrl();
console.log('📡 FarmBridge API Base URL:', BASE_URL);

// Helper: normalize MongoDB docs (_id → id) for frontend compatibility
const normalize = (doc) => {
  if (!doc) return doc;
  const { _id, __v, createdAt, updatedAt, ...rest } = doc;
  return { id: _id, ...rest };
};

const normalizeList = (docs) => docs.map(normalize);

// Generic fetch helper with error handling
const request = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || 'API request failed');
    }
    return res.json();
  } catch (error) {
    console.warn(`API [${endpoint}]: ${error.message} — using fallback`);
    throw error;
  }
};

export const api = {
  // ── Auth ──────────────────────────────────────────
  login: (role) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ role }),
    }).then(normalize),

  getProfile: (id) =>
    request(`/auth/profile/${id}`).then(normalize),

  // ── Listings ─────────────────────────────────────
  getListings: (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const query = params ? `?${params}` : '';
    return request(`/listings${query}`).then(normalizeList);
  },

  getListing: (id) =>
    request(`/listings/${id}`).then(normalize),

  createListing: (data) =>
    request('/listings', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(normalize),

  updateListing: (id, data) =>
    request(`/listings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }).then(normalize),

  deleteListing: (id) =>
    request(`/listings/${id}`, { method: 'DELETE' }),

  // ── Orders ───────────────────────────────────────
  getOrders: () =>
    request('/orders').then(normalizeList),

  getOrder: (id) =>
    request(`/orders/${id}`).then(normalize),

  placeOrder: (data) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }).then(normalize),

  updateOrder: (id, data) =>
    request(`/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }).then(normalize),

  // ── Market ───────────────────────────────────────
  getMarketPrices: () =>
    request('/market/prices'),

  getSuggestions: () =>
    request('/market/suggestions'),

  getTraceability: () =>
    request('/market/traceability'),
};

export default api;
