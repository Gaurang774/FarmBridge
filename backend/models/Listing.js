const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ['Active', 'Sold', 'Expired'], default: 'Active' },
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  temp: { type: Number, default: 22 },
  humidity: { type: Number, default: 55 },
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
