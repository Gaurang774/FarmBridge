const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  crop: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, default: 0 },
  buyer: { type: String, default: 'Current Buyer' },
  status: { type: String, enum: ['Placed', 'Confirmed', 'Shipped', 'Delivered'], default: 'Placed' },
  temp: { type: Number, default: 20 },
  humidity: { type: Number, default: 50 },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
