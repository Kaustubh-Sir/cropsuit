const express = require('express');
const router = express.Router();
const {
  getCropRecommendations,
  getWeatherData,
  getFertilizerRecommendations,
  getSatelliteData,
  getComprehensiveData
} = require('../controllers/farmonautController');
const { protect } = require('../middleware/auth');

// All routes are protected (require authentication)
router.use(protect);

// @route   GET /api/farmonaut/crop-recommendations
// @desc    Get crop recommendations based on location and soil
// @access  Private
router.get('/crop-recommendations', getCropRecommendations);

// @route   GET /api/farmonaut/weather
// @desc    Get weather data for farming decisions
// @access  Private
router.get('/weather', getWeatherData);

// @route   GET /api/farmonaut/fertilizer-recommendations
// @desc    Get fertilizer recommendations for crops
// @access  Private
router.get('/fertilizer-recommendations', getFertilizerRecommendations);

// @route   GET /api/farmonaut/satellite-data
// @desc    Get satellite data for field monitoring
// @access  Private
router.get('/satellite-data', getSatelliteData);

// @route   GET /api/farmonaut/comprehensive-data
// @desc    Get comprehensive farming data (weather + crop + fertilizer)
// @access  Private
router.get('/comprehensive-data', getComprehensiveData);

module.exports = router;
