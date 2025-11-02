const WeatherData = require('../models/WeatherData');
const weatherService = require('../services/weatherService');

// @desc    Get current weather by coordinates
// @route   GET /api/weather/current
// @access  Private
exports.getCurrentWeather = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude',
      });
    }

    // Fetch weather data
    const weatherData = await weatherService.getCurrentWeather(
      parseFloat(lat),
      parseFloat(lon)
    );

    // Generate agricultural advice
    const advice = weatherService.generateAgriculturalAdvice(weatherData);

    // Save to database
    const savedWeather = await WeatherData.create({
      user: req.user.id,
      location: weatherData.location,
      current: weatherData.current,
      agriculturalAdvice: advice,
      lastUpdated: Date.now(),
    });

    res.status(200).json({
      success: true,
      data: {
        ...weatherData,
        agriculturalAdvice: advice,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get weather forecast
// @route   GET /api/weather/forecast
// @access  Private
exports.getWeatherForecast = async (req, res, next) => {
  try {
    const { lat, lon, days = 7 } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude',
      });
    }

    const forecast = await weatherService.getWeatherForecast(
      parseFloat(lat),
      parseFloat(lon),
      parseInt(days)
    );

    // Save to database with forecast data
    await WeatherData.create({
      user: req.user.id,
      location: forecast.location,
      daily: forecast.daily,
      lastUpdated: Date.now(),
    });

    res.status(200).json({
      success: true,
      data: forecast,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get weather by city
// @route   GET /api/weather/city/:cityName
// @access  Private
exports.getWeatherByCity = async (req, res, next) => {
  try {
    const { cityName } = req.params;
    const { country } = req.query;

    const weatherData = await weatherService.getWeatherByCity(cityName, country);
    const advice = weatherService.generateAgriculturalAdvice(weatherData);

    // Save to database
    await WeatherData.create({
      user: req.user.id,
      location: weatherData.location,
      current: weatherData.current,
      agriculturalAdvice: advice,
      lastUpdated: Date.now(),
    });

    res.status(200).json({
      success: true,
      data: {
        ...weatherData,
        agriculturalAdvice: advice,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get weather history
// @route   GET /api/weather/history
// @access  Private
exports.getWeatherHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const weatherHistory = await WeatherData.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await WeatherData.countDocuments({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: weatherHistory.length,
      total: count,
      pages: Math.ceil(count / limit),
      data: weatherHistory,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get weather alerts
// @route   GET /api/weather/alerts
// @access  Private
exports.getWeatherAlerts = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude',
      });
    }

    // In a real application, this would fetch from a weather alerts API
    // For now, we'll return a placeholder
    const alerts = [];

    res.status(200).json({
      success: true,
      data: alerts,
      message: 'No active weather alerts for your location',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;
