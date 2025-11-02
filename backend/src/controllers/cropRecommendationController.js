const CropRecommendation = require('../models/CropRecommendation');

// @desc    Get all crop recommendations
// @route   GET /api/crop-recommendations
// @access  Private
exports.getRecommendations = async (req, res, next) => {
  try {
    const { status, season, page = 1, limit = 10 } = req.query;

    const query = { user: req.user.id };
    if (status) query.status = status;
    if (season) query.season = season;

    const recommendations = await CropRecommendation.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await CropRecommendation.countDocuments(query);

    res.status(200).json({
      success: true,
      count: recommendations.length,
      total: count,
      pages: Math.ceil(count / limit),
      data: recommendations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single recommendation
// @route   GET /api/crop-recommendations/:id
// @access  Private
exports.getRecommendation = async (req, res, next) => {
  try {
    const recommendation = await CropRecommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found',
      });
    }

    // Make sure user owns the recommendation
    if (recommendation.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this recommendation',
      });
    }

    res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create crop recommendation
// @route   POST /api/crop-recommendations
// @access  Private
exports.createRecommendation = async (req, res, next) => {
  try {
    req.body.user = req.user.id;

    // Generate AI-based recommendations
    const aiRecommendations = generateCropRecommendations(req.body);

    req.body.recommendations = aiRecommendations;
    req.body.generatedBy = 'ai';

    const recommendation = await CropRecommendation.create(req.body);

    res.status(201).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update recommendation status
// @route   PUT /api/crop-recommendations/:id
// @access  Private
exports.updateRecommendation = async (req, res, next) => {
  try {
    let recommendation = await CropRecommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found',
      });
    }

    // Make sure user owns the recommendation
    if (recommendation.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this recommendation',
      });
    }

    recommendation = await CropRecommendation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete recommendation
// @route   DELETE /api/crop-recommendations/:id
// @access  Private
exports.deleteRecommendation = async (req, res, next) => {
  try {
    const recommendation = await CropRecommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommendation not found',
      });
    }

    // Make sure user owns the recommendation
    if (recommendation.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this recommendation',
      });
    }

    await recommendation.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Recommendation deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to generate crop recommendations
function generateCropRecommendations(data) {
  const recommendations = [];
  const { season, soilType, availableArea, irrigationAvailable, climateData } = data;

  // Sample recommendation logic (would be more sophisticated in production)
  const cropDatabase = {
    kharif: [
      {
        cropName: 'Rice',
        variety: 'Basmati',
        category: 'cereals',
        waterRequirement: 'high',
        soilTypes: ['clay', 'loamy'],
      },
      {
        cropName: 'Cotton',
        variety: 'Bt Cotton',
        category: 'cash_crops',
        waterRequirement: 'moderate',
        soilTypes: ['clay', 'loamy', 'sandy'],
      },
      {
        cropName: 'Maize',
        variety: 'Hybrid',
        category: 'cereals',
        waterRequirement: 'moderate',
        soilTypes: ['loamy', 'sandy'],
      },
      {
        cropName: 'Soybean',
        variety: 'JS 335',
        category: 'oilseeds',
        waterRequirement: 'moderate',
        soilTypes: ['loamy', 'clay'],
      },
    ],
    rabi: [
      {
        cropName: 'Wheat',
        variety: 'HD 2967',
        category: 'cereals',
        waterRequirement: 'moderate',
        soilTypes: ['loamy', 'clay'],
      },
      {
        cropName: 'Mustard',
        variety: 'Pusa Bold',
        category: 'oilseeds',
        waterRequirement: 'low',
        soilTypes: ['loamy', 'sandy'],
      },
      {
        cropName: 'Chickpea',
        variety: 'Pusa 256',
        category: 'pulses',
        waterRequirement: 'low',
        soilTypes: ['loamy', 'clay'],
      },
      {
        cropName: 'Barley',
        variety: 'RD 2715',
        category: 'cereals',
        waterRequirement: 'low',
        soilTypes: ['loamy', 'sandy'],
      },
    ],
    zaid: [
      {
        cropName: 'Watermelon',
        variety: 'Sugar Baby',
        category: 'fruits',
        waterRequirement: 'high',
        soilTypes: ['sandy', 'loamy'],
      },
      {
        cropName: 'Cucumber',
        variety: 'Hybrid',
        category: 'vegetables',
        waterRequirement: 'moderate',
        soilTypes: ['loamy', 'sandy'],
      },
      {
        cropName: 'Muskmelon',
        variety: 'Hybrid',
        category: 'fruits',
        waterRequirement: 'moderate',
        soilTypes: ['sandy', 'loamy'],
      },
    ],
  };

  const seasonalCrops = cropDatabase[season] || [];

  seasonalCrops.forEach((crop) => {
    // Check soil compatibility
    const soilCompatibility = crop.soilTypes.includes(soilType);

    // Check irrigation compatibility
    const irrigationCompatibility =
      crop.waterRequirement === 'low' ||
      (crop.waterRequirement === 'moderate' && irrigationAvailable) ||
      (crop.waterRequirement === 'high' && irrigationAvailable);

    if (soilCompatibility && irrigationCompatibility) {
      // Calculate suitability score (0-100)
      let suitabilityScore = 50; // Base score

      if (crop.soilTypes[0] === soilType) suitabilityScore += 20;
      if (irrigationAvailable && crop.waterRequirement === 'high') suitabilityScore += 15;
      if (crop.waterRequirement === 'low') suitabilityScore += 10;

      recommendations.push({
        cropName: crop.cropName,
        variety: crop.variety,
        category: crop.category,
        suitabilityScore: Math.min(suitabilityScore, 100),
        reasoning: `${crop.cropName} is well-suited for ${season} season in ${soilType} soil with ${
          irrigationAvailable ? 'available' : 'limited'
        } irrigation.`,
        advantages: [
          'High market demand',
          `Suitable for ${soilType} soil`,
          `${crop.waterRequirement} water requirement`,
          'Proven variety for the region',
        ],
        challenges: [
          'Requires proper pest management',
          'Market price fluctuations',
          'Weather dependency',
        ],
        estimatedYield: {
          value: Math.floor(Math.random() * 30) + 20,
          unit: 'quintals/acre',
        },
        estimatedIncome: Math.floor(Math.random() * 50000) + 30000,
        growthDuration: {
          value: season === 'kharif' ? 120 : season === 'rabi' ? 135 : 90,
          unit: 'days',
        },
        waterRequirement: crop.waterRequirement,
        laborRequirement: 'moderate',
        marketDemand: Math.random() > 0.5 ? 'high' : 'moderate',
        riskLevel: Math.random() > 0.7 ? 'low' : 'moderate',
        cultivation: {
          sowingTime:
            season === 'kharif'
              ? 'June-July'
              : season === 'rabi'
              ? 'October-November'
              : 'March-April',
          harvestTime:
            season === 'kharif'
              ? 'October-November'
              : season === 'rabi'
              ? 'March-April'
              : 'June-July',
          spacing: '30cm x 30cm',
          seedRate: '10-12 kg/acre',
        },
      });
    }
  });

  return recommendations;
}

module.exports = exports;
