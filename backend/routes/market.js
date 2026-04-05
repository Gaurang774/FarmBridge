const express = require('express');
const router = express.Router();

// Static market data — in a real app this would come from an external API
const mandiPrices = [
  { crop: 'Wheat', pune: 25, nashik: 27, mumbai: 30 },
  { crop: 'Tomato', pune: 38, nashik: 40, mumbai: 45 },
  { crop: 'Onion', pune: 18, nashik: 20, mumbai: 22 },
  { crop: 'Soybean', pune: 55, nashik: 52, mumbai: 58 },
];

const aiSuggestions = [
  'Onion prices rising 12% next week — best time to sell',
  'Tomato demand high in Mumbai — list now for better rates',
  'Wheat prices stable — hold stock for 3 more days',
];

const traceabilitySteps = [
  { step: 'Harvested', date: '2024-05-10', done: true },
  { step: 'Listed on FarmBridge', date: '2024-05-11', done: true },
  { step: 'Quality Checked', date: '2024-05-12', done: true },
  { step: 'Ready to Ship', date: null, done: false },
];

// GET /api/market/prices
router.get('/prices', (req, res) => {
  res.json(mandiPrices);
});

// GET /api/market/suggestions
router.get('/suggestions', (req, res) => {
  res.json(aiSuggestions);
});

// GET /api/market/traceability
router.get('/traceability', (req, res) => {
  res.json(traceabilitySteps);
});

module.exports = router;
