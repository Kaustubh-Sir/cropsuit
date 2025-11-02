const express = require('express');
const router = express.Router();
const {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherAlerts,
  getAgriculturalInsights,
} = require('../controllers/weatherController');
const { isAuthenticated } = require('../middleware/auth');

// Protect all routes
router.use(isAuthenticated);

// Weather routes
router.get('/current', getCurrentWeather);
router.get('/forecast', getWeatherForecast);
router.get('/alerts', getWeatherAlerts);
router.get('/agricultural', getAgriculturalInsights);

module.exports = router;
