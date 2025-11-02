const CropPlan = require('../models/CropPlan');
const { generateCropRecommendations } = require('../utils/cropRecommendation');

// @desc    Get crop recommendations based on soil, weather, and location
// @route   POST /api/recommendations/crops
// @access  Private
exports.getCropRecommendations = async (req, res, next) => {
  try {
    const { soilType, season, climate, farmSize, budget } = req.body;

    if (!soilType || !season) {
      return res.status(400).json({
        success: false,
        message: 'Please provide soil type and season',
      });
    }

    // Generate recommendations using AI/logic
    const recommendations = generateCropRecommendations({
      soilType,
      season,
      climate: climate || req.user.location,
      farmSize,
      budget,
    });

    res.status(200).json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all crop plans for user
// @route   GET /api/recommendations/plans
// @access  Private
exports.getCropPlans = async (req, res, next) => {
  try {
    const { season, year, status } = req.query;

    const filter = { user: req.user._id };
    if (season) filter.season = season;
    if (year) filter.year = parseInt(year);
    if (status) filter.status = status;

    const plans = await CropPlan.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single crop plan
// @route   GET /api/recommendations/plans/:id
// @access  Private
exports.getCropPlan = async (req, res, next) => {
  try {
    const plan = await CropPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Crop plan not found',
      });
    }

    // Make sure user owns the plan
    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this plan',
      });
    }

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new crop plan
// @route   POST /api/recommendations/plans
// @access  Private
exports.createCropPlan = async (req, res, next) => {
  try {
    req.body.user = req.user._id;

    // Calculate totals
    if (req.body.crops && Array.isArray(req.body.crops)) {
      req.body.totalArea = req.body.crops.reduce((sum, crop) => sum + (crop.area || 0), 0);
      req.body.totalBudget = req.body.crops.reduce((sum, crop) => sum + (crop.estimatedCost || 0), 0);
      req.body.expectedProfit = req.body.crops.reduce((sum, crop) => 
        sum + ((crop.estimatedRevenue || 0) - (crop.estimatedCost || 0)), 0
      );
    }

    const plan = await CropPlan.create(req.body);

    res.status(201).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update crop plan
// @route   PUT /api/recommendations/plans/:id
// @access  Private
exports.updateCropPlan = async (req, res, next) => {
  try {
    let plan = await CropPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Crop plan not found',
      });
    }

    // Make sure user owns the plan
    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this plan',
      });
    }

    // Recalculate totals if crops are updated
    if (req.body.crops && Array.isArray(req.body.crops)) {
      req.body.totalArea = req.body.crops.reduce((sum, crop) => sum + (crop.area || 0), 0);
      req.body.totalBudget = req.body.crops.reduce((sum, crop) => sum + (crop.estimatedCost || 0), 0);
      req.body.expectedProfit = req.body.crops.reduce((sum, crop) => 
        sum + ((crop.estimatedRevenue || 0) - (crop.estimatedCost || 0)), 0
      );
    }

    plan = await CropPlan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete crop plan
// @route   DELETE /api/recommendations/plans/:id
// @access  Private
exports.deleteCropPlan = async (req, res, next) => {
  try {
    const plan = await CropPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Crop plan not found',
      });
    }

    // Make sure user owns the plan
    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this plan',
      });
    }

    await plan.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Crop plan deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get seasonal recommendations
// @route   GET /api/recommendations/seasonal
// @access  Private
exports.getSeasonalRecommendations = async (req, res, next) => {
  try {
    const { season, year } = req.query;
    const currentYear = year || new Date().getFullYear();
    
    // Get user's location and farm details
    const userLocation = req.user.location;
    const farmDetails = req.user.farmDetails;

    // Generate seasonal recommendations
    const recommendations = {
      season: season || getCurrentSeason(),
      year: currentYear,
      recommendedCrops: generateSeasonalCrops(season, userLocation, farmDetails),
      weatherConsiderations: getSeasonalWeather(season),
      farmingTips: getSeasonalTips(season),
    };

    res.status(200).json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    next(error);
  }
};

// Helper functions
function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 6 && month <= 9) return 'Kharif';
  if (month >= 10 || month <= 3) return 'Rabi';
  return 'Zaid';
}

function generateSeasonalCrops(season, location, farmDetails) {
  // This is a simplified example - in production, use ML model or comprehensive database
  const seasonalCrops = {
    Kharif: ['Rice', 'Cotton', 'Maize', 'Soybean', 'Groundnut'],
    Rabi: ['Wheat', 'Barley', 'Mustard', 'Chickpea', 'Lentils'],
    Zaid: ['Watermelon', 'Muskmelon', 'Cucumber', 'Bitter Gourd'],
  };
  
  return seasonalCrops[season] || [];
}

function getSeasonalWeather(season) {
  const weatherInfo = {
    Kharif: 'Monsoon season with high rainfall. Ensure proper drainage.',
    Rabi: 'Winter season with cooler temperatures. Good for wheat and pulses.',
    Zaid: 'Summer season. Requires good irrigation facilities.',
  };
  
  return weatherInfo[season] || 'Season-specific weather data not available.';
}

function getSeasonalTips(season) {
  const tips = {
    Kharif: [
      'Start sowing with the onset of monsoon',
      'Ensure field is ready before rains',
      'Plan for proper drainage',
    ],
    Rabi: [
      'Sow after monsoon withdrawal',
      'Ensure adequate irrigation',
      'Protect crops from frost',
    ],
    Zaid: [
      'Requires intensive irrigation',
      'Choose short-duration crops',
      'Protect from heat stress',
    ],
  };
  
  return tips[season] || [];
}
