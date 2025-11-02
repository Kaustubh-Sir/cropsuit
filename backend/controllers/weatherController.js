const WeatherData = require('../models/WeatherData');
const { fetchWeatherData } = require('../utils/weatherAPI');

// @desc    Get current weather for user location
// @route   GET /api/weather/current
// @access  Private
exports.getCurrentWeather = async (req, res, next) => {
  try {
    const { lat, lon, city } = req.query;

    // Get coordinates from query or user profile
    let latitude, longitude;
    
    if (lat && lon) {
      latitude = parseFloat(lat);
      longitude = parseFloat(lon);
    } else if (req.user.location?.coordinates) {
      latitude = req.user.location.coordinates.latitude;
      longitude = req.user.location.coordinates.longitude;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude or set your location in profile',
      });
    }

    // Check if we have recent cached data (within 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    let weatherData = await WeatherData.findOne({
      'location.coordinates.latitude': latitude,
      'location.coordinates.longitude': longitude,
      lastUpdated: { $gte: thirtyMinutesAgo },
    });

    if (!weatherData) {
      // Fetch fresh weather data from API
      const freshData = await fetchWeatherData(latitude, longitude);
      
      // Save to database
      weatherData = await WeatherData.create({
        user: req.user._id,
        ...freshData,
      });
    }

    res.status(200).json({
      success: true,
      data: weatherData,
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

    let latitude, longitude;
    
    if (lat && lon) {
      latitude = parseFloat(lat);
      longitude = parseFloat(lon);
    } else if (req.user.location?.coordinates) {
      latitude = req.user.location.coordinates.latitude;
      longitude = req.user.location.coordinates.longitude;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude or set your location in profile',
      });
    }

    // Check cache
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    let weatherData = await WeatherData.findOne({
      'location.coordinates.latitude': latitude,
      'location.coordinates.longitude': longitude,
      lastUpdated: { $gte: oneHourAgo },
    });

    if (!weatherData || !weatherData.forecast || weatherData.forecast.length === 0) {
      // Fetch fresh forecast
      const freshData = await fetchWeatherData(latitude, longitude, parseInt(days));
      
      if (weatherData) {
        weatherData.forecast = freshData.forecast;
        weatherData.lastUpdated = Date.now();
        await weatherData.save();
      } else {
        weatherData = await WeatherData.create({
          user: req.user._id,
          ...freshData,
        });
      }
    }

    res.status(200).json({
      success: true,
      data: {
        location: weatherData.location,
        forecast: weatherData.forecast,
      },
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

    let latitude, longitude;
    
    if (lat && lon) {
      latitude = parseFloat(lat);
      longitude = parseFloat(lon);
    } else if (req.user.location?.coordinates) {
      latitude = req.user.location.coordinates.latitude;
      longitude = req.user.location.coordinates.longitude;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude or set your location in profile',
      });
    }

    const weatherData = await WeatherData.findOne({
      'location.coordinates.latitude': latitude,
      'location.coordinates.longitude': longitude,
    }).sort({ lastUpdated: -1 });

    const alerts = weatherData?.alerts || [];

    res.status(200).json({
      success: true,
      count: alerts.length,
      data: alerts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get agricultural weather insights
// @route   GET /api/weather/agricultural
// @access  Private
exports.getAgriculturalInsights = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;

    let latitude, longitude;
    
    if (lat && lon) {
      latitude = parseFloat(lat);
      longitude = parseFloat(lon);
    } else if (req.user.location?.coordinates) {
      latitude = req.user.location.coordinates.latitude;
      longitude = req.user.location.coordinates.longitude;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude and longitude or set your location in profile',
      });
    }

    const weatherData = await WeatherData.findOne({
      'location.coordinates.latitude': latitude,
      'location.coordinates.longitude': longitude,
    }).sort({ lastUpdated: -1 });

    if (!weatherData) {
      return res.status(404).json({
        success: false,
        message: 'No weather data found. Please fetch current weather first.',
      });
    }

    // Generate agricultural insights based on weather data
    const insights = {
      current: weatherData.current,
      agricultural: weatherData.agricultural,
      recommendations: generateAgriculturalRecommendations(weatherData),
    };

    res.status(200).json({
      success: true,
      data: insights,
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to generate agricultural recommendations
function generateAgriculturalRecommendations(weatherData) {
  const recommendations = [];
  
  if (weatherData.current?.temperature > 35) {
    recommendations.push('High temperature detected. Consider increasing irrigation frequency.');
  }
  
  if (weatherData.current?.humidity < 40) {
    recommendations.push('Low humidity. Monitor crops for water stress.');
  }
  
  if (weatherData.forecast?.some(day => day.precipitationProbability > 70)) {
    recommendations.push('Heavy rain expected. Ensure proper drainage in fields.');
  }
  
  if (weatherData.agricultural?.frostWarning) {
    recommendations.push('Frost warning! Protect sensitive crops.');
  }
  
  return recommendations;
}
