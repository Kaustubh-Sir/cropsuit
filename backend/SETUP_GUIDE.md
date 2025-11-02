# 🚀 Cropsuit Backend - Complete Setup Guide

## Step-by-Step Installation & Configuration

### 1. Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v14+) installed: `node --version`
- ✅ npm installed: `npm --version`
- ✅ MongoDB installed (or MongoDB Atlas account)
- ✅ Git installed (optional)

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- express - Web framework
- mongoose - MongoDB ODM
- passport - Authentication
- jsonwebtoken - JWT tokens
- bcryptjs - Password hashing
- axios - HTTP client
- cors - CORS middleware
- And more...

### 3. MongoDB Setup

#### Option A: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # macOS (with Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```
3. Your connection string: `mongodb://localhost:27017/cropsuit`

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<password>` with your database user password

### 4. Environment Variables Setup

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file with your values:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB - Choose one option
MONGODB_URI=mongodb://localhost:27017/cropsuit
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cropsuit

# JWT - Change this to a random secure string!
JWT_SECRET=change_this_to_a_very_long_random_string_in_production
JWT_EXPIRE=7d

# Frontend
FRONTEND_URL=http://localhost:3000

# Google OAuth (Optional - see below)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Weather API (Optional - see below)
WEATHER_API_KEY=your_openweathermap_api_key
WEATHER_API_URL=https://api.openweathermap.org/data/2.5
```

### 5. Get Google OAuth Credentials (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth client ID"
5. Choose "Web application"
6. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
7. Copy Client ID and Client Secret to your `.env` file

### 6. Get Weather API Key (Optional)

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for free account
3. Go to "API keys" section
4. Copy your API key to `.env` file

### 7. Start the Server

#### Development Mode (with auto-reload):
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

You should see:
```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🌾 CROPSUIT API SERVER                             ║
║                                                       ║
║   Server running in development mode                 ║
║   Port: 5000                                         ║
║   URL: http://localhost:5000                         ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

✅ MongoDB Connected: localhost
📊 Database: cropsuit
```

### 8. Test the API

Open browser and visit:
- http://localhost:5000 - Health check
- http://localhost:5000/api - API documentation

Or use curl:
```bash
curl http://localhost:5000
```

### 9. Test User Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Farmer",
    "email": "farmer@test.com",
    "password": "password123"
  }'
```

You should receive a JWT token in response.

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution**:
1. Check if MongoDB is running:
   ```bash
   # macOS/Linux
   ps aux | grep mongod
   
   # Windows
   tasklist | findstr mongod
   ```
2. Start MongoDB if not running
3. Verify connection string in `.env`

### Port Already in Use

**Error**: `Error: listen EADDRINUSE: address already in use :::5000`

**Solution**:
1. Change PORT in `.env` to different value (e.g., 5001)
2. Or kill process using port 5000:
   ```bash
   # macOS/Linux
   lsof -ti:5000 | xargs kill -9
   
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

### JWT Secret Warning

If you see security warnings about JWT_SECRET:

**Solution**: Change `JWT_SECRET` in `.env` to a long random string:
```bash
# Generate random string (macOS/Linux)
openssl rand -base64 32

# Or use this online tool
# https://randomkeygen.com/
```

### Google OAuth Not Working

**Solutions**:
1. Verify redirect URI matches exactly in Google Console
2. Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in `.env`
3. Ensure domain is whitelisted in Google Console

### Weather API Not Working

**Solutions**:
1. Verify API key is active at OpenWeatherMap
2. Check if you've exceeded free tier limits (60 calls/minute)
3. Ensure WEATHER_API_KEY is correct in `.env`

## 🧪 Testing the API

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Import the following endpoints:

**Register**:
- Method: POST
- URL: http://localhost:5000/api/auth/register
- Body (JSON):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

**Login**:
- Method: POST
- URL: http://localhost:5000/api/auth/login
- Body (JSON):
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- Copy the `token` from response

**Get Crops** (Protected):
- Method: GET
- URL: http://localhost:5000/api/crops
- Headers:
  - Key: `Authorization`
  - Value: `Bearer YOUR_TOKEN_HERE`

### Using Thunder Client (VS Code)

1. Install Thunder Client extension in VS Code
2. Create new request
3. Follow same format as Postman above

## 📱 Connecting Your React Frontend

In your React app, create an API service file:

```javascript
// src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// Usage in components:
// import api from './services/api';
// const response = await api.get('/crops');
```

## 🎯 Next Steps

1. ✅ Server is running
2. ✅ Test authentication endpoints
3. ✅ Connect your React frontend
4. ✅ Start building features!

For complete API documentation, see [README.md](./README.md)

## 🆘 Need Help?

- Check server logs for error messages
- Verify all environment variables are set
- Ensure MongoDB is running
- Test endpoints with Postman
- Check CORS settings if frontend can't connect

---

**Happy Coding! 🚀**
