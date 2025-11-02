# 🌾 Cropsuit Backend API

A comprehensive Node.js backend for the Cropsuit agricultural management system, providing APIs for crop management, weather integration, fertilizer recommendations, and seasonal planning.

## 📋 Features

- **User Authentication**
  - Local authentication (email/password)
  - Google OAuth 2.0 integration
  - JWT-based authorization
  
- **Crop Management**
  - CRUD operations for crops
  - Track crop health and growth stages
  - Cost and revenue tracking

- **Fertilizer Recommendations**
  - AI-based fertilizer suggestions
  - Soil nutrient analysis
  
- **Weather Integration**
  - Current weather data
  - 7-day forecast
  - Agricultural advice

- **Crop Recommendations**
  - Season-based crop suggestions
  - Soil type compatibility
  
- **Seasonal Planning**
  - Multi-crop planning
  - Financial projections
  - Milestone tracking

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install dependencies**

\`\`\`bash
npm install
\`\`\`

2. **Set up environment variables**

Copy \`.env.example\` to \`.env\` and update with your values.

3. **Run the server**

\`\`\`bash
npm run dev  # Development mode
npm start    # Production mode
\`\`\`

The server will start at \`http://localhost:5000\`

## 📚 API Documentation

Visit \`http://localhost:5000/api\` for complete API documentation.

### Key Endpoints

- **Auth**: \`/api/auth/*\` - Register, login, Google OAuth
- **Crops**: \`/api/crops\` - Manage crops
- **Fertilizer**: \`/api/fertilizer-recommendations\` - Get recommendations
- **Weather**: \`/api/weather/*\` - Weather data and forecasts
- **Crop Recommendations**: \`/api/crop-recommendations\` - Get crop suggestions
- **Seasonal Plans**: \`/api/seasonal-plans\` - Plan your seasons

## 🌐 Frontend Integration

### Using Axios

\`\`\`javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

// Add token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

// Login
const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

// Get crops
const getCrops = async () => {
  const response = await api.get('/crops');
  return response.data;
};
\`\`\`

### Using Fetch

\`\`\`javascript
const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  ...(localStorage.getItem('token') && {
    Authorization: \`Bearer \${localStorage.getItem('token')}\`
  })
});

// Get crops
const getCrops = async () => {
  const response = await fetch(\`\${API_URL}/crops\`, {
    headers: getAuthHeaders()
  });
  return response.json();
};
\`\`\`

## 📝 Environment Variables

See \`.env.example\` for required configuration:

- \`MONGODB_URI\` - MongoDB connection string
- \`JWT_SECRET\` - Secret key for JWT
- \`GOOGLE_CLIENT_ID\` - Google OAuth client ID
- \`GOOGLE_CLIENT_SECRET\` - Google OAuth secret
- \`WEATHER_API_KEY\` - OpenWeatherMap API key
- \`FRONTEND_URL\` - Your React app URL

## 🛠️ Project Structure

\`\`\`
src/
├── config/          # Database & Passport config
├── controllers/     # Request handlers
├── middleware/      # Auth, validation, errors
├── models/          # Mongoose schemas
├── routes/          # API routes
├── services/        # External services
├── utils/           # Helper functions
└── server.js        # Express app
\`\`\`

---

**Happy Farming! 🌾**
