# Frontend Integration Guide

Complete guide to integrate Cropsuit backend with your React frontend.

## Table of Contents
1. [Setup](#setup)
2. [API Service Configuration](#api-service-configuration)
3. [Authentication](#authentication)
4. [Feature Implementation](#feature-implementation)
5. [State Management](#state-management)
6. [Error Handling](#error-handling)

---

## Setup

### Install Required Packages

```bash
npm install axios react-router-dom
```

### Project Structure (Suggested)

```
src/
├── services/
│   └── api.js              # API configuration
├── contexts/
│   └── AuthContext.js      # Authentication context
├── components/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── ProtectedRoute.jsx
│   ├── Crops/
│   │   ├── CropList.jsx
│   │   ├── CropForm.jsx
│   │   └── CropDetail.jsx
│   ├── Fertilizer/
│   │   ├── FertilizerForm.jsx
│   │   └── RecommendationList.jsx
│   ├── Weather/
│   │   └── WeatherDashboard.jsx
│   └── Planning/
│       └── SeasonalPlanner.jsx
├── hooks/
│   ├── useCrops.js
│   ├── useWeather.js
│   └── useFertilizer.js
└── App.js
```

---

## API Service Configuration

### Create `src/services/api.js`

```javascript
import axios from 'axios';

// Base configuration
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // CRITICAL for cookie-based authentication
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    // You can add additional headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on unauthorized
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ============= AUTH APIs =============
export const authAPI = {
  checkStatus: () => API.get('/auth/status'),
  getCurrentUser: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
  logout: () => API.get('/auth/logout'),
  deleteAccount: () => API.delete('/auth/account'),
};

// ============= CROP APIs =============
export const cropAPI = {
  getAll: (filters) => API.get('/crops', { params: filters }),
  getOne: (id) => API.get(`/crops/${id}`),
  create: (data) => API.post('/crops', data),
  update: (id, data) => API.put(`/crops/${id}`, data),
  delete: (id) => API.delete(`/crops/${id}`),
  getStats: () => API.get('/crops/stats/summary'),
};

// ============= FERTILIZER APIs =============
export const fertilizerAPI = {
  getAll: () => API.get('/fertilizers'),
  getOne: (id) => API.get(`/fertilizers/${id}`),
  generate: (data) => API.post('/fertilizers/generate', data),
  update: (id, data) => API.put(`/fertilizers/${id}`, data),
  delete: (id) => API.delete(`/fertilizers/${id}`),
  markApplied: (id) => API.put(`/fertilizers/${id}/apply`),
};

// ============= WEATHER APIs =============
export const weatherAPI = {
  getCurrent: (lat, lon) => API.get('/weather/current', { params: { lat, lon } }),
  getForecast: (lat, lon, days = 7) => API.get('/weather/forecast', { params: { lat, lon, days } }),
  getAlerts: (lat, lon) => API.get('/weather/alerts', { params: { lat, lon } }),
  getAgricultural: (lat, lon) => API.get('/weather/agricultural', { params: { lat, lon } }),
};

// ============= RECOMMENDATION APIs =============
export const recommendationAPI = {
  getCropRecommendations: (data) => API.post('/recommendations/crops', data),
  getSeasonalRecommendations: (season, year) => 
    API.get('/recommendations/seasonal', { params: { season, year } }),
  getAllPlans: (filters) => API.get('/recommendations/plans', { params: filters }),
  getOnePlan: (id) => API.get(`/recommendations/plans/${id}`),
  createPlan: (data) => API.post('/recommendations/plans', data),
  updatePlan: (id, data) => API.put(`/recommendations/plans/${id}`, data),
  deletePlan: (id) => API.delete(`/recommendations/plans/${id}`),
};

export default API;
```

### Create `.env` in React project root

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Authentication

### 1. Create Auth Context (`src/contexts/AuthContext.js`)

```javascript
import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await authAPI.checkStatus();
      setIsAuthenticated(response.data.authenticated);
      if (response.data.authenticated) {
        const userResponse = await authAPI.getCurrentUser();
        setUser(userResponse.data.data);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await authAPI.updateProfile(data);
      setUser(response.data.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        updateProfile,
        logout,
        refreshUser: checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 2. Login Component (`src/components/Auth/Login.jsx`)

```jsx
import React from 'react';
import './Login.css';

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/auth/google`;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🌾 Cropsuit</h1>
        <p>Your Smart Farming Assistant</p>
        
        <button onClick={handleGoogleLogin} className="google-login-btn">
          <img 
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
            alt="Google" 
          />
          Continue with Google
        </button>
        
        <div className="features">
          <div className="feature">✓ Crop Recommendations</div>
          <div className="feature">✓ Fertilizer Guidance</div>
          <div className="feature">✓ Weather Insights</div>
          <div className="feature">✓ Seasonal Planning</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
```

### 3. Protected Route (`src/components/Auth/ProtectedRoute.jsx`)

```jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
```

---

## Feature Implementation

### 1. Crop Management Hook (`src/hooks/useCrops.js`)

```javascript
import { useState, useEffect } from 'react';
import { cropAPI } from '../services/api';

export const useCrops = (filters = {}) => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCrops = async () => {
    try {
      setLoading(true);
      const response = await cropAPI.getAll(filters);
      setCrops(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch crops');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, [JSON.stringify(filters)]);

  const createCrop = async (cropData) => {
    try {
      const response = await cropAPI.create(cropData);
      setCrops([response.data.data, ...crops]);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const updateCrop = async (id, cropData) => {
    try {
      const response = await cropAPI.update(id, cropData);
      setCrops(crops.map(crop => crop._id === id ? response.data.data : crop));
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const deleteCrop = async (id) => {
    try {
      await cropAPI.delete(id);
      setCrops(crops.filter(crop => crop._id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    crops,
    loading,
    error,
    createCrop,
    updateCrop,
    deleteCrop,
    refresh: fetchCrops,
  };
};
```

### 2. Crop List Component (`src/components/Crops/CropList.jsx`)

```jsx
import React, { useState } from 'react';
import { useCrops } from '../../hooks/useCrops';
import CropForm from './CropForm';

const CropList = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const { crops, loading, error, createCrop, updateCrop, deleteCrop } = useCrops();

  const handleSubmit = async (cropData) => {
    try {
      if (editingCrop) {
        await updateCrop(editingCrop._id, cropData);
      } else {
        await createCrop(cropData);
      }
      setShowForm(false);
      setEditingCrop(null);
    } catch (err) {
      console.error('Failed to save crop:', err);
    }
  };

  const handleEdit = (crop) => {
    setEditingCrop(crop);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this crop?')) {
      await deleteCrop(id);
    }
  };

  if (loading) return <div>Loading crops...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="crop-list">
      <div className="header">
        <h2>My Crops</h2>
        <button onClick={() => setShowForm(true)}>+ Add Crop</button>
      </div>

      {showForm && (
        <CropForm
          initialData={editingCrop}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingCrop(null);
          }}
        />
      )}

      <div className="crops-grid">
        {crops.map(crop => (
          <div key={crop._id} className="crop-card">
            <h3>{crop.cropName}</h3>
            <p><strong>Type:</strong> {crop.cropType}</p>
            <p><strong>Area:</strong> {crop.area} acres</p>
            <p><strong>Status:</strong> {crop.status}</p>
            <p><strong>Season:</strong> {crop.season}</p>
            <div className="actions">
              <button onClick={() => handleEdit(crop)}>Edit</button>
              <button onClick={() => handleDelete(crop._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropList;
```

### 3. Fertilizer Recommendation Component

```jsx
import React, { useState } from 'react';
import { fertilizerAPI } from '../../services/api';

const FertilizerForm = () => {
  const [formData, setFormData] = useState({
    cropName: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    pH: '',
  });
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fertilizerAPI.generate({
        cropName: formData.cropName,
        soilData: {
          nitrogen: parseFloat(formData.nitrogen),
          phosphorus: parseFloat(formData.phosphorus),
          potassium: parseFloat(formData.potassium),
          pH: parseFloat(formData.pH),
        },
      });
      setRecommendation(response.data.data);
    } catch (error) {
      console.error('Failed to generate recommendation:', error);
      alert('Failed to generate recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fertilizer-form">
      <h2>Fertilizer Recommendation</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Crop Name</label>
          <input
            type="text"
            value={formData.cropName}
            onChange={(e) => setFormData({...formData, cropName: e.target.value})}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nitrogen (N) kg/ha</label>
            <input
              type="number"
              value={formData.nitrogen}
              onChange={(e) => setFormData({...formData, nitrogen: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Phosphorus (P) kg/ha</label>
            <input
              type="number"
              value={formData.phosphorus}
              onChange={(e) => setFormData({...formData, phosphorus: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Potassium (K) kg/ha</label>
            <input
              type="number"
              value={formData.potassium}
              onChange={(e) => setFormData({...formData, potassium: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>pH Level</label>
            <input
              type="number"
              step="0.1"
              value={formData.pH}
              onChange={(e) => setFormData({...formData, pH: e.target.value})}
              required
            />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Recommendation'}
        </button>
      </form>

      {recommendation && (
        <div className="recommendation-result">
          <h3>Recommended Fertilizers</h3>
          
          {recommendation.recommendations.map((rec, index) => (
            <div key={index} className="fertilizer-card">
              <h4>{rec.fertilizerName}</h4>
              <p><strong>Type:</strong> {rec.type}</p>
              <p><strong>Quantity:</strong> {rec.quantity} {rec.unit}</p>
              <p><strong>NPK Ratio:</strong> {rec.npkRatio}</p>
              <p><strong>Application:</strong> {rec.applicationMethod}</p>
              <p><strong>Timing:</strong> {rec.applicationTiming}</p>
              <p><strong>Cost:</strong> ₹{rec.estimatedCost}</p>
            </div>
          ))}

          <div className="advice">
            <h4>Custom Advice</h4>
            <p>{recommendation.customAdvice}</p>
          </div>

          <div className="application-schedule">
            <h4>Application Schedule</h4>
            {recommendation.applicationSchedule.map((schedule, index) => (
              <div key={index} className="schedule-item">
                <strong>{schedule.stage}</strong> (Day {schedule.days}): {schedule.fertilizers}
                <p>{schedule.notes}</p>
              </div>
            ))}
          </div>

          <div className="total-cost">
            <strong>Total Estimated Cost:</strong> ₹{recommendation.totalEstimatedCost}
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerForm;
```

### 4. Weather Dashboard Component

```jsx
import React, { useState, useEffect } from 'react';
import { weatherAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const WeatherDashboard = () => {
  const { user } = useAuth();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.location?.coordinates) {
      fetchWeather();
    } else {
      // Use geolocation API as fallback
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLoading(false);
        }
      );
    }
  }, [user]);

  const fetchWeather = async (lat, lon) => {
    const latitude = lat || user.location.coordinates.latitude;
    const longitude = lon || user.location.coordinates.longitude;

    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        weatherAPI.getCurrent(latitude, longitude),
        weatherAPI.getForecast(latitude, longitude, 7),
      ]);

      setWeather(currentResponse.data.data.current);
      setForecast(forecastResponse.data.data.forecast);
    } catch (error) {
      console.error('Failed to fetch weather:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading weather...</div>;

  return (
    <div className="weather-dashboard">
      <h2>Weather Information</h2>

      {weather && (
        <div className="current-weather">
          <h3>Current Weather</h3>
          <div className="weather-info">
            <div className="temp-main">
              <span className="temperature">{Math.round(weather.temperature)}°C</span>
              <span className="description">{weather.description}</span>
            </div>
            <div className="weather-details">
              <div>💧 Humidity: {weather.humidity}%</div>
              <div>💨 Wind: {weather.windSpeed} m/s</div>
              <div>👁 Visibility: {weather.visibility / 1000} km</div>
              <div>📊 Pressure: {weather.pressure} hPa</div>
            </div>
          </div>
        </div>
      )}

      <div className="forecast">
        <h3>7-Day Forecast</h3>
        <div className="forecast-grid">
          {forecast.map((day, index) => (
            <div key={index} className="forecast-card">
              <div className="day">{day.day}</div>
              <div className="icon">
                <img 
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`} 
                  alt={day.description} 
                />
              </div>
              <div className="temp">
                <span className="high">{Math.round(day.tempMax)}°</span>
                <span className="low">{Math.round(day.tempMin)}°</span>
              </div>
              <div className="rain">💧 {day.precipitationProbability}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
```

---

## App.js Setup

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Dashboard from './components/Dashboard';
import CropList from './components/Crops/CropList';
import FertilizerForm from './components/Fertilizer/FertilizerForm';
import WeatherDashboard from './components/Weather/WeatherDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crops"
            element={
              <ProtectedRoute>
                <CropList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fertilizer"
            element={
              <ProtectedRoute>
                <FertilizerForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <WeatherDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App();
```

---

## Error Handling Best Practices

### 1. Global Error Handler

```javascript
// src/utils/errorHandler.js
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error
    const message = error.response.data?.message || 'Something went wrong';
    const status = error.response.status;
    
    switch (status) {
      case 400:
        return `Invalid request: ${message}`;
      case 401:
        return 'Please log in to continue';
      case 403:
        return 'You don\'t have permission to do this';
      case 404:
        return 'Resource not found';
      case 500:
        return 'Server error. Please try again later';
      default:
        return message;
    }
  } else if (error.request) {
    // Request made but no response
    return 'Network error. Please check your connection';
  } else {
    // Something else happened
    return error.message || 'An unexpected error occurred';
  }
};
```

### 2. Use in Components

```jsx
import { handleAPIError } from '../utils/errorHandler';

const MyComponent = () => {
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await cropAPI.getAll();
      // Handle success
    } catch (err) {
      setError(handleAPIError(err));
    }
  };

  return (
    <div>
      {error && <div className="error-message">{error}</div>}
      {/* Rest of component */}
    </div>
  );
};
```

---

## Testing

### Test API Connection

```javascript
// src/utils/testConnection.js
import { authAPI } from '../services/api';

export const testBackendConnection = async () => {
  try {
    const response = await authAPI.checkStatus();
    console.log('✅ Backend connected:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Backend connection failed:', error);
    return false;
  }
};

// Call in your App.js or main component
useEffect(() => {
  testBackendConnection();
}, []);
```

---

## Production Deployment

### Environment Variables

```env
# .env.production
REACT_APP_API_URL=https://your-api-domain.com/api
```

### CORS Configuration (Backend)

Update `server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-domain.com'
  ],
  credentials: true
}));
```

---

## 🎉 You're All Set!

Your React frontend is now fully integrated with the Cropsuit backend. Happy farming! 🌾
