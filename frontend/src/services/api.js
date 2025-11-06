import axios from 'axios';

// Base API URL
const API_URL = import.meta.env.VITE_API_URL || 'https://cropsuit-backend.vercel.app/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// AUTH API
// ============================================
export const authAPI = {
  // Register new user
  register: (data) => api.post('/auth/register', data),
  
  // Login with email/password
  login: (data) => api.post('/auth/login', data),
  
  // Google OAuth - redirect to backend
  googleLogin: () => {
    window.location.href = `http://localhost:5000/api/auth/google`;
  },
  
  // Get current user
  getMe: () => api.get('/auth/me'),
  
  // Update user details
  updateDetails: (data) => api.put('/auth/updatedetails', data),
  
  // Update password
  updatePassword: (data) => api.put('/auth/updatepassword', data),
  
  // Logout
  logout: () => {
    localStorage.removeItem('token');
    return api.get('/auth/logout');
  },
};

// ============================================
// CROPS API
// ============================================
export const cropAPI = {
  // Get all crops with filters
  getAll: (params) => api.get('/crops', { params }),
  
  // Get single crop
  getOne: (id) => api.get(`/crops/${id}`),
  
  // Create new crop
  create: (data) => api.post('/crops', data),
  
  // Update crop
  update: (id, data) => api.put(`/crops/${id}`, data),
  
  // Delete crop
  delete: (id) => api.delete(`/crops/${id}`),
  
  // Add note to crop
  addNote: (id, content) => api.post(`/crops/${id}/notes`, { content }),
  
  // Add health issue
  addHealthIssue: (id, data) => api.post(`/crops/${id}/health-issues`, data),
  
  // Get crop statistics
  getStats: () => api.get('/crops/stats'),
};

// ============================================
// WEATHER API
// ============================================
export const weatherAPI = {
  // Get current weather by coordinates
  getCurrent: (lat, lon) => 
    api.get(`/weather/current?lat=${lat}&lon=${lon}`),
  
  // Get weather forecast
  getForecast: (lat, lon, days = 7) => 
    api.get(`/weather/forecast?lat=${lat}&lon=${lon}&days=${days}`),
  
  // Get weather by city
  getByCity: (city, country = '') => {
    const url = `/weather/city/${city}${country ? `?country=${country}` : ''}`;
    return api.get(url);
  },
  
  // Get weather history
  getHistory: (params) => api.get('/weather/history', { params }),
  
  // Get weather alerts
  getAlerts: (lat, lon) => 
    api.get(`/weather/alerts?lat=${lat}&lon=${lon}`),
};

// ============================================
// FERTILIZER RECOMMENDATIONS API
// ============================================
export const fertilizerAPI = {
  // Get all recommendations
  getAll: (params) => api.get('/fertilizer-recommendations', { params }),
  
  // Get single recommendation
  getOne: (id) => api.get(`/fertilizer-recommendations/${id}`),
  
  // Create new recommendation
  create: (data) => api.post('/fertilizer-recommendations', data),
  
  // Update recommendation
  update: (id, data) => api.put(`/fertilizer-recommendations/${id}`, data),
  
  // Delete recommendation
  delete: (id) => api.delete(`/fertilizer-recommendations/${id}`),
};

// ============================================
// CROP RECOMMENDATIONS API
// ============================================
export const cropRecommendationAPI = {
  // Get all recommendations
  getAll: (params) => api.get('/crop-recommendations', { params }),
  
  // Get single recommendation
  getOne: (id) => api.get(`/crop-recommendations/${id}`),
  
  // Create new recommendation
  create: (data) => api.post('/crop-recommendations', data),
  
  // Update recommendation
  update: (id, data) => api.put(`/crop-recommendations/${id}`, data),
  
  // Delete recommendation
  delete: (id) => api.delete(`/crop-recommendations/${id}`),
};

// ============================================
// SEASONAL PLANS API
// ============================================
export const seasonalPlanAPI = {
  // Get all plans
  getAll: (params) => api.get('/seasonal-plans', { params }),
  
  // Get single plan
  getOne: (id) => api.get(`/seasonal-plans/${id}`),
  
  // Create new plan
  create: (data) => api.post('/seasonal-plans', data),
  
  // Update plan
  update: (id, data) => api.put(`/seasonal-plans/${id}`, data),
  
  // Delete plan
  delete: (id) => api.delete(`/seasonal-plans/${id}`),
  
  // Add milestone
  addMilestone: (id, data) => 
    api.post(`/seasonal-plans/${id}/milestones`, data),
  
  // Update milestone
  updateMilestone: (planId, milestoneId, data) => 
    api.put(`/seasonal-plans/${planId}/milestones/${milestoneId}`, data),
  
  // Add note
  addNote: (id, content) => 
    api.post(`/seasonal-plans/${id}/notes`, { content }),
  
  // Get plan statistics
  getStats: () => api.get('/seasonal-plans/stats'),
};

// ============================================
// FARMONAUT API (NEW - Integrated from RapidAPI)
// ============================================
export const farmonautAPI = {
  // Get crop recommendations from Farmonaut
  getCropRecommendations: (latitude, longitude, soilType, season) =>
    api.get('/farmonaut/crop-recommendations', {
      params: { latitude, longitude, soilType, season }
    }),
  
  // Get weather data from Farmonaut
  getWeatherData: (latitude, longitude) =>
    api.get('/farmonaut/weather', {
      params: { latitude, longitude }
    }),
  
  // Get fertilizer recommendations from Farmonaut
  getFertilizerRecommendations: (cropType, soilType, nitrogen, phosphorus, potassium) =>
    api.get('/farmonaut/fertilizer-recommendations', {
      params: { cropType, soilType, nitrogen, phosphorus, potassium }
    }),
  
  // Get satellite data from Farmonaut
  getSatelliteData: (latitude, longitude, fieldId) =>
    api.get('/farmonaut/satellite-data', {
      params: { latitude, longitude, fieldId }
    }),
  
  // Get comprehensive farming data (weather + crops + fertilizer)
  getComprehensiveData: (latitude, longitude, cropType, soilType, season) =>
    api.get('/farmonaut/comprehensive-data', {
      params: { latitude, longitude, cropType, soilType, season }
    }),
};

export default api;
