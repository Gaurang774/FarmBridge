const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['Farmer', 'Buyer'], required: true },
  location: { type: String, default: '' },
  phone: { type: String, default: '' },
  totalListings: { type: Number, default: 0 },
  totalEarnings: { type: String, default: '₹0' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
