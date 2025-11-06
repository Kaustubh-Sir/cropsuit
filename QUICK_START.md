# Quick Start Guide
# 🚀 Cropsuit Backend -
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

# 🌾 Cropsuit Frontend

A modern React-based web application that helps farmers manage agricultural operations with real-time weather monitoring, AI-powered crop recommendations, and intelligent fertilizer guidance.

## Features

- **Authentication** - Secure login/register with Google OAuth support
- **Dashboard** - Real-time weather, crop statistics, and quick overview
- **Crop Management** - Track crops with status indicators and detailed cards
- **Weather Integration** - 7-day forecast with agricultural advice
- **Fertilizer Guidance** - AI-powered recommendations based on soil analysis
- **Crop Recommendations** - Season-based suggestions with yield projections
- **Seasonal Planning** - Multi-crop planning with financial tracking
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

## Quick Start

### Prerequisites
- Node.js v14.0.0 or higher
- npm v6.0.0 or higher
- Backend API running at `http://localhost:5000`

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/cropsuit.git
cd cropsuit/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

### Configuration (Optional)

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Cropsuit
```

## Tech Stack

- **React 18.2** - UI library with hooks
- **Vite 5.0** - Fast build tool with HMR
- **React Router 6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **CSS3** - Modern styling with animations
- **Context API** - State management

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   ├── context/          # Auth context
│   ├── pages/            # Page components
│   ├── services/         # API integration
│   ├── App.jsx           # Main app with routes
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── package.json          # Dependencies
└── vite.config.js        # Vite config
```

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Usage Guide

### Registration
1. Click "Register" and fill in your details
2. Or use "Sign in with Google" for quick access
3. Auto-login after successful registration

### Dashboard
- View real-time weather for your location
- Check crop statistics and status
- Access quick navigation to all features

### Crop Management
- View all crops in organized grid layout
- Add, edit, or delete crops
- Track crop status (planned, growing, harvested)

### Get Recommendations
- **Fertilizer**: Enter soil data (N, P, K, pH) for personalized recommendations
- **Crops**: Select season and soil type for suitable crop suggestions
- **Planning**: Create seasonal plans with financial projections

## API Integration

```javascript
import { authAPI, cropAPI, weatherAPI } from './services/api';

// Authentication
await authAPI.register({ name, email, password });
await authAPI.login({ email, password });

// Crops
await cropAPI.getAll({ status: 'growing' });
await cropAPI.create(cropData);

// Weather
await weatherAPI.getCurrent(lat, lon);
```

## Common Issues

**Port already in use:**
```bash
# Change port in vite.config.js or kill existing process
lsof -ti:5174 | xargs kill -9  # macOS/Linux
```

**Can't connect to backend:**
- Ensure backend runs at `http://localhost:5000`
- Verify CORS is enabled
- Check API URL in `src/services/api.js`

**npm install fails:**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Minimum Requirements

- **RAM:** 4 GB (8 GB recommended)
- **Storage:** 500 MB free space
- **Browser:** Chrome 90+, Firefox 88+, Edge 90+, Safari 14+
- **Internet:** Stable connection for API calls

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Team

- **Kaustubh** (16010123168) - Backend & Database
- **Kavya** (16010123169) - Frontend & UI/UX
- **Muaaz** (16010123173) - Authentication & Integration

## License

MIT License

---

Made with ❤️ by Team Cropsuit 🌾

**Happy Farming! 🌾**
