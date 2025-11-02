const express = require('express');
const {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherByCity,
  getWeatherHistory,
  getWeatherAlerts,
} = require('../controllers/weatherController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/current', getCurrentWeather);
router.get('/forecast', getWeatherForecast);
router.get('/city/:cityName', getWeatherByCity);
router.get('/history', getWeatherHistory);
router.get('/alerts', getWeatherAlerts);

module.exports = router;
