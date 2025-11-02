const FertilizerRecommendation = require('../models/FertilizerRecommendation');

// @desc    Get all fertilizer recommendations
// @route   GET /api/fertilizer-recommendations
// @access  Private
exports.getRecommendations = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = { user: req.user.id };
    if (status) query.status = status;

    const recommendations = await FertilizerRecommendation.find(query)
      .populate('crop', 'name category')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await FertilizerRecommendation.countDocuments(query);

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
// @route   GET /api/fertilizer-recommendations/:id
// @access  Private
exports.getRecommendation = async (req, res, next) => {
  try {
    const recommendation = await FertilizerRecommendation.findById(req.params.id).populate(
      'crop',
      'name category area'
    );

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

// @desc    Create fertilizer recommendation
// @route   POST /api/fertilizer-recommendations
// @access  Private
exports.createRecommendation = async (req, res, next) => {
  try {
    req.body.user = req.user.id;

    // Generate AI-based recommendations based on soil nutrients
    const aiRecommendations = generateFertilizerRecommendations(
      req.body.cropName,
      req.body.soilType,
      req.body.soilNutrients
    );

    req.body.recommendations = aiRecommendations;
    req.body.generatedBy = 'ai';

    const recommendation = await FertilizerRecommendation.create(req.body);

    res.status(201).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update recommendation
// @route   PUT /api/fertilizer-recommendations/:id
// @access  Private
exports.updateRecommendation = async (req, res, next) => {
  try {
    let recommendation = await FertilizerRecommendation.findById(req.params.id);

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

    recommendation = await FertilizerRecommendation.findByIdAndUpdate(
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
// @route   DELETE /api/fertilizer-recommendations/:id
// @access  Private
exports.deleteRecommendation = async (req, res, next) => {
  try {
    const recommendation = await FertilizerRecommendation.findById(req.params.id);

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

// Helper function to generate fertilizer recommendations
function generateFertilizerRecommendations(cropName, soilType, soilNutrients) {
  const recommendations = [];

  // Sample logic - in production, this would be much more sophisticated
  const { nitrogen, phosphorus, potassium, pH } = soilNutrients;

  // Nitrogen recommendation
  if (nitrogen < 280) {
    recommendations.push({
      fertilizer: {
        name: 'Urea',
        type: 'inorganic',
        npkRatio: '46-0-0',
      },
      quantity: {
        value: 130,
        unit: 'kg/acre',
      },
      applicationMethod: 'broadcasting',
      applicationStage: 'At sowing and 30 days after sowing',
      frequency: '2 times during crop cycle',
      estimatedCost: 1500,
      benefits: [
        'Promotes vegetative growth',
        'Increases protein content',
        'Enhances leaf development',
      ],
      precautions: [
        'Apply in split doses',
        'Do not apply during waterlogged conditions',
        'Incorporate into soil',
      ],
    });
  }

  // Phosphorus recommendation
  if (phosphorus < 11) {
    recommendations.push({
      fertilizer: {
        name: 'Single Super Phosphate (SSP)',
        type: 'inorganic',
        npkRatio: '0-16-0',
      },
      quantity: {
        value: 200,
        unit: 'kg/acre',
      },
      applicationMethod: 'drilling',
      applicationStage: 'At the time of sowing',
      frequency: 'Once at sowing',
      estimatedCost: 1200,
      benefits: [
        'Promotes root development',
        'Improves flowering and fruiting',
        'Enhances disease resistance',
      ],
      precautions: [
        'Apply near root zone',
        'Mix with organic matter for better efficiency',
      ],
    });
  }

  // Potassium recommendation
  if (potassium < 110) {
    recommendations.push({
      fertilizer: {
        name: 'Muriate of Potash (MOP)',
        type: 'inorganic',
        npkRatio: '0-0-60',
      },
      quantity: {
        value: 50,
        unit: 'kg/acre',
      },
      applicationMethod: 'broadcasting',
      applicationStage: 'At flowering stage',
      frequency: 'Once during flowering',
      estimatedCost: 800,
      benefits: [
        'Improves fruit quality',
        'Enhances stress tolerance',
        'Increases shelf life of produce',
      ],
      precautions: ['Apply when soil has adequate moisture', 'Avoid over-application'],
    });
  }

  // Organic recommendation
  recommendations.push({
    fertilizer: {
      name: 'Vermicompost',
      type: 'organic',
      npkRatio: '1.5-1-1',
    },
    quantity: {
      value: 500,
      unit: 'kg/acre',
    },
    applicationMethod: 'broadcasting',
    applicationStage: 'Before sowing',
    frequency: 'Once before crop establishment',
    estimatedCost: 2500,
    benefits: [
      'Improves soil structure',
      'Enhances beneficial microbial activity',
      'Provides slow-release nutrients',
      'Improves water retention',
    ],
    precautions: ['Apply well-decomposed compost', 'Mix thoroughly with soil'],
  });

  return recommendations;
}

module.exports = exports;
