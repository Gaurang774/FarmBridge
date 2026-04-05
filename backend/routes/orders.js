const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET /api/orders — get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders/:id — get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('listing');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/orders — place a new order
router.post('/', async (req, res) => {
  try {
    const { listingId, crop, quantity, price, buyer, temp, humidity } = req.body;

    if (!crop || !quantity) {
      return res.status(400).json({ error: 'crop and quantity are required' });
    }

    const order = await Order.create({
      listing: listingId || null,
      crop,
      quantity,
      price: price || 0,
      buyer: buyer || 'Current Buyer',
      status: 'Placed',
      temp: temp || 20,
      humidity: humidity || 50,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/orders/:id — update order status
router.patch('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
