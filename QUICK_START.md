# 🚀 Cropsuit Backend - Quick Start Guide

## What's Included

✅ Complete Node.js/Express backend
✅ MongoDB integration with Mongoose
✅ Google OAuth authentication
✅ JWT-based authorization
✅ Weather API integration
✅ Comprehensive API endpoints for:
   - User authentication (local + Google OAuth)
   - Crop management (CRUD operations)
   - Fertilizer recommendations
   - Weather data and forecasts
   - Crop recommendations (AI-based)
   - Seasonal planning

## 📦 Installation (5 Minutes)

1. **Extract the zip file**
   ```bash
   unzip cropsuit-backend.zip
   cd cropsuit-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add:
   - MongoDB connection string
   - JWT secret (any long random string)
   - Google OAuth credentials (optional)
   - OpenWeatherMap API key (optional)

4. **Start the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # OR Production mode
   npm start
   ```

5. **Verify it's running**
   Visit: http://localhost:5000

## 🔑 Quick API Test

Register a user:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Farmer",
    "email": "farmer@test.com",
    "password": "password123"
  }'
```

## 📱 Connect to React Frontend

In your React app:
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add token to all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```

## 📚 Documentation Files

- `README.md` - Overview and features

## 🌐 Main Endpoints

- **Auth**: `/api/auth/*`
- **Crops**: `/api/crops`
- **Fertilizer**: `/api/fertilizer-recommendations`
- **Weather**: `/api/weather/*`
- **Crop Recommendations**: `/api/crop-recommendations`
- **Seasonal Plans**: `/api/seasonal-plans`

## 🛠️ Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Passport.js (Google OAuth)
- JWT authentication
- Axios (weather API)
- bcryptjs (password hashing)

## 📋 Minimum Requirements

- MongoDB connection (local or Atlas)
- JWT_SECRET in .env
- FRONTEND_URL in .env (your React app URL)

Optional but recommended:
- Google OAuth credentials
- OpenWeatherMap API key

## 🆘 Need Help?

Check these files:
1. `SETUP_GUIDE.md` - Detailed setup instructions
2. `API_DOCUMENTATION.md` - Complete API reference
3. Server logs for error messages

## ✅ What's Next?

1. ✅ Backend is set up
2. ✅ Test the API endpoints
3. ✅ Connect your React frontend
4. ✅ Start building features!

---

**Happy Farming! 🌾**
