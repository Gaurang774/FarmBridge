const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// GET /api/listings — get all listings, optional ?crop= filter
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.crop) {
      filter.crop = { $regex: req.query.crop, $options: 'i' };
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }
    const listings = await Listing.find(filter).sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/listings/:id — get single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('farmer', 'name location');
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/listings — create a new listing
router.post('/', async (req, res) => {
  try {
    const { crop, quantity, price, location, date, status, temp, humidity, farmerId } = req.body;

    if (!crop || !quantity || !price || !location) {
      return res.status(400).json({ error: 'crop, quantity, price, and location are required' });
    }

    const listing = await Listing.create({
      crop,
      quantity,
      price,
      location,
      date: date || new Date().toISOString().split('T')[0],
      status: status || 'Active',
      temp: temp || 22,
      humidity: humidity || 55,
      farmer: farmerId || null,
    });

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH /api/listings/:id — update a listing (e.g. mark as Sold)
router.patch('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/listings/:id
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json({ message: 'Listing deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
