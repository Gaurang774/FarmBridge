export const farmer = {
  name: "Ramesh Singh",
  location: "Pune",
  phone: "9876543210",
  totalListings: 3,
  totalEarnings: "₹45,000"
};

export const listings = [
  { id: "L001", crop: "Wheat", quantity: 500, price: 25, location: "Pune Mandi", date: "2024-05-15", status: "Active" },
  { id: "L002", crop: "Tomato", quantity: 150, price: 40, location: "Nashik", date: "2024-05-10", status: "Sold" },
  { id: "L003", crop: "Onion", quantity: 300, price: 18, location: "Lasalgaon", date: "2024-05-12", status: "Active" }
];

export const mandiPrices = [
  { crop: "Wheat", pune: 25, nashik: 27, mumbai: 30 },
  { crop: "Tomato", pune: 38, nashik: 40, mumbai: 45 },
  { crop: "Onion", pune: 18, nashik: 20, mumbai: 22 },
  { crop: "Soybean", pune: 55, nashik: 52, mumbai: 58 },
];

export const aiSuggestions = [
  "Onion prices rising 12% next week — best time to sell",
  "Tomato demand high in Mumbai — list now for better rates",
  "Wheat prices stable — hold stock for 3 more days"
];

export const buyers = [
  { id: "B001", name: "Anil Traders", location: "Mumbai", crop: "Wheat", quantity: 200 },
  { id: "B002", name: "Fresh Mart", location: "Pune", crop: "Tomato", quantity: 100 },
];

export const orders = [
  { id: "101", crop: "Tomato", quantity: 50, buyer: "Fresh Mart", status: "Confirmed", temp: 18, humidity: 65, listingId: "L002" },
  { id: "102", crop: "Wheat", quantity: 200, buyer: "Anil Traders", status: "Placed", temp: 22, humidity: 60, listingId: "L001" }
];

export const traceabilitySteps = [
  { step: "Harvested", date: "2024-05-10", done: true },
  { step: "Listed on FarmBridge", date: "2024-05-11", done: true },
  { step: "Quality Checked", date: "2024-05-12", done: true },
  { step: "Ready to Ship", date: null, done: false }
];
