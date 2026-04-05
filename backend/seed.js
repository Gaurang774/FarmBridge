require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const Listing = require('./models/Listing');
const Order = require('./models/Order');

const seed = async () => {
  await connectDB();

  // Clear existing data
  await User.deleteMany({});
  await Listing.deleteMany({});
  await Order.deleteMany({});
  console.log('🗑️  Cleared existing data');

  // Create users
  const farmer = await User.create({
    name: 'Ramesh Singh',
    role: 'Farmer',
    location: 'Pune',
    phone: '9876543210',
    totalListings: 3,
    totalEarnings: '₹45,000',
  });

  const buyer = await User.create({
    name: 'Anil Traders',
    role: 'Buyer',
    location: 'Mumbai',
    phone: '9123456780',
  });

  console.log('👤 Users created:', farmer.name, '&', buyer.name);

  // Create listings (matching mockData.js exactly)
  const listingsData = [
    { crop: 'Wheat', quantity: 500, price: 25, location: 'Pune Mandi', date: '2024-05-15', status: 'Active', farmer: farmer._id, temp: 22, humidity: 55 },
    { crop: 'Tomato', quantity: 150, price: 40, location: 'Nashik', date: '2024-05-10', status: 'Sold', farmer: farmer._id, temp: 24, humidity: 60 },
    { crop: 'Onion', quantity: 300, price: 18, location: 'Lasalgaon', date: '2024-05-12', status: 'Active', farmer: farmer._id, temp: 20, humidity: 50 },
  ];

  const listings = await Listing.insertMany(listingsData);
  console.log(`🌾 ${listings.length} listings seeded`);

  // Create orders (matching mockData.js)
  const ordersData = [
    { listing: listings[1]._id, crop: 'Tomato', quantity: 50, price: 40, buyer: 'Fresh Mart', status: 'Confirmed', temp: 18, humidity: 65 },
    { listing: listings[0]._id, crop: 'Wheat', quantity: 200, price: 25, buyer: 'Anil Traders', status: 'Placed', temp: 22, humidity: 60 },
  ];

  const orders = await Order.insertMany(ordersData);
  console.log(`📦 ${orders.length} orders seeded`);

  console.log('\n✅ Database seeded successfully!');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
