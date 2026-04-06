# 🌾 FarmBridge

FarmBridge is a comprehensive agricultural platform that directly connects farmers with buyers, bypassing middlemen to ensure fair pricing and transparent transactions. The platform provides real-time market data, AI-driven crop suggestions, and full harvest traceability.

## 🌟 Key Features

*   **👨‍🌾 Farmer Dashboard:** Manage listings, view market trends, and receive AI-driven suggestions for crop pricing and timing.
*   **🛒 Buyer Dashboard:** Browse fresh produce listings, place orders, and track deliveries.
*   **📈 Market Intelligence:** Live market prices for various crops and analytics.
*   **🔍 Traceability:** QR-code based traceability timeline to see exactly where and when a crop was harvested.
*   **📱 Cross-Platform UI:** Built with React Native and Expo, running smoothly on iOS, Android, and Web.

---

## 🛠️ Tech Stack

**Frontend (Mobile & Web)**
*   React Native / Expo
*   React Navigation (Bottom Tabs & Stack)
*   React Native Paper (Material Design UI components)

**Backend (REST API)**
*   Node.js & Express
*   MongoDB (Mongoose ODM)
*   Cors & Dotenv

---

## 📂 Project Structure

```text
FarmBridge/
├── App.js                   # Application Entry Point & Providers
├── src/
│   ├── components/          # Reusable UI components (QRCard, TraceabilityTimeline, etc.)
│   ├── context/             # React Context for global state (Auth/User)
│   ├── navigation/          # React Navigation setup (AppNavigator, BuyerTabs, FarmerTabs)
│   ├── screens/             # App screens organized by user role
│   │   ├── buyer/           # Buyer Dashboard, Order Tracking, etc.
│   │   ├── farmer/          # Farmer Dashboard, Market Price, Add Listing, etc.
│   │   └── shared/          # Login screen, Profile screen
│   ├── services/            # API config and fetch wrappers (api.js)
│   └── theme/               # Global styling and paper theme
└── backend/
    ├── config/              # Database connection setup
    ├── models/              # Mongoose Schemas (Listing, Order, User)
    ├── routes/              # Express API Routes
    ├── seed.js              # Script to populate initial database data
    ├── server.js            # Express server entry point
    └── .env                 # Environment variables (MongoDB URI, Port)
```

---

## 🚀 Getting Started

Follow these steps to run FarmBridge on your local machine.

### 1. Requirements
*   Node.js (v18+ recommended)
*   MongoDB (Running locally or via Docker/Atlas)
*   Expo CLI / Expo Go app on your phone (for mobile testing)

### 2. Setup the Backend

Open a terminal and start the backend Express server:

```bash
# Navigate to the backend directory
cd backend

# Install dependencies (if not done already)
npm install

# Check your .env file in the backend folder (Make sure MongoDB is running)
# Ensure MONGODB_URI points to your running MongoDB instance
# Example: MONGODB_URI=mongodb://127.0.0.1:32768/farmbridge?directConnection=true

# (Optional) Seed the database with sample data
npm run seed

# Start the dev server
npm run dev
```
The backend API will run on `http://0.0.0.0:5000`.

### 3. Setup the Frontend

Open a **new** terminal window and configure the UI wrapper to connect to your backend:

1.  **Important:** Find your machine's local LAN IP address (e.g., `192.168.1.x` or `10.x.x.x`).
2.  Open `src/services/api.js` and ensure the fallback IP matches your Current LAN IP.
    ```javascript
    // In src/services/api.js
    return 'http://YOUR_LAN_IP:5000/api'; 
    ```

3.  Start the Expo development server:

```bash
# From the project root
npm install

# Start Expo
npx expo start
```

### 4. Running the App
*   **Web:** Press `w` in the terminal to open the app in your browser.
*   **Mobile:** Scan the generated QR code using the **Expo Go** app on your Android or iOS device (ensure your phone is on the same Wi-Fi network as your computer).

---

## 🤝 Contributing
Feel free to submit issues, fork the repository, and send pull requests!
