const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/login — simplified MVP login (find or create by role)
router.post('/login', async (req, res) => {
  try {
    const { role } = req.body;
    if (!role || !['Farmer', 'Buyer'].includes(role)) {
      return res.status(400).json({ error: 'Role must be "Farmer" or "Buyer"' });
    }

    // Find or create a default user for this role
    let user = await User.findOne({ role });
    if (!user) {
      const defaults = role === 'Farmer'
        ? { name: 'Ramesh Singh', location: 'Pune', phone: '9876543210', totalListings: 3, totalEarnings: '₹45,000' }
        : { name: 'Anil Traders', location: 'Mumbai', phone: '9123456780', totalListings: 0, totalEarnings: '₹0' };
      user = await User.create({ role, ...defaults });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/auth/profile/:id
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
