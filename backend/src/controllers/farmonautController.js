const farmonautService = require('../services/farmonautService');

/**
 * @desc    Get crop recommendations from Farmonaut API
 * @route   GET /api/farmonaut/crop-recommendations
 * @access  Private
 */
exports.getCropRecommendations = async (req, res, next) => {
  try {
    const { latitude, longitude, soilType, season } = req.query;

    // Validate required parameters
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const params = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      soilType: soilType || 'loamy',
      season: season || 'kharif'
    };

    const recommendations = await farmonautService.getCropRecommendations(params);

    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    console.error('Crop recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching crop recommendations',
      error: error.message
    });
  }
};

/**
 * @desc    Get weather data from Farmonaut API
 * @route   GET /api/farmonaut/weather
 * @access  Private
 */
exports.getWeatherData = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;

    // Validate required parameters
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const params = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };

    const weatherData = await farmonautService.getWeatherData(params);

    res.status(200).json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    console.error('Weather data error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching weather data',
      error: error.message
    });
  }
};

/**
 * @desc    Get fertilizer recommendations from Farmonaut API
 * @route   GET /api/farmonaut/fertilizer-recommendations
 * @access  Private
 */
exports.getFertilizerRecommendations = async (req, res, next) => {
  try {
    const { cropType, soilType, nitrogen, phosphorus, potassium } = req.query;

    // Validate required parameters
    if (!cropType || !soilType) {
      return res.status(400).json({
        success: false,
        message: 'Crop type and soil type are required'
      });
    }

    const params = {
      cropType,
      soilType,
      nitrogen: nitrogen ? parseFloat(nitrogen) : 0,
      phosphorus: phosphorus ? parseFloat(phosphorus) : 0,
      potassium: potassium ? parseFloat(potassium) : 0
    };

    const recommendations = await farmonautService.getFertilizerRecommendations(params);

    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    console.error('Fertilizer recommendations error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching fertilizer recommendations',
      error: error.message
    });
  }
};

/**
 * @desc    Get satellite data from Farmonaut API
 * @route   GET /api/farmonaut/satellite-data
 * @access  Private
 */
exports.getSatelliteData = async (req, res, next) => {
  try {
    const { latitude, longitude, fieldId } = req.query;

    // Validate required parameters
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    const params = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      fieldId: fieldId || null
    };

    const satelliteData = await farmonautService.getSatelliteData(params);

    res.status(200).json({
      success: true,
      data: satelliteData
    });
  } catch (error) {
    console.error('Satellite data error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching satellite data',
      error: error.message
    });
  }
};

/**
 * @desc    Get comprehensive farming data (weather + crop + fertilizer)
 * @route   GET /api/farmonaut/comprehensive-data
 * @access  Private
 */
exports.getComprehensiveData = async (req, res, next) => {
  try {
    const { latitude, longitude, cropType, soilType, season } = req.query;

    // Validate required parameters
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required'
      });
    }

    // Fetch all data concurrently
    const [weatherData, cropRecommendations, fertilizerRecommendations] = await Promise.all([
      farmonautService.getWeatherData({ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }),
      farmonautService.getCropRecommendations({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        soilType: soilType || 'loamy',
        season: season || 'kharif'
      }),
      cropType ? farmonautService.getFertilizerRecommendations({
        cropType,
        soilType: soilType || 'loamy'
      }) : null
    ]);

    res.status(200).json({
      success: true,
      data: {
        weather: weatherData,
        cropRecommendations: cropRecommendations,
        fertilizerRecommendations: fertilizerRecommendations,
        location: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        }
      }
    });
  } catch (error) {
    console.error('Comprehensive data error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching comprehensive data',
      error: error.message
    });
  }
};
