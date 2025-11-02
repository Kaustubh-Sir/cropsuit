const FertilizerRecommendation = require('../models/FertilizerRecommendation');
const Crop = require('../models/Crop');
const { generateFertilizerRecommendation } = require('../utils/fertilizerLogic');

// @desc    Get all fertilizer recommendations for user
// @route   GET /api/fertilizers
// @access  Private
exports.getFertilizerRecommendations = async (req, res, next) => {
  try {
    const recommendations = await FertilizerRecommendation.find({ 
      user: req.user._id 
    })
    .populate('crop', 'cropName status')
    .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single fertilizer recommendation
// @route   GET /api/fertilizers/:id
// @access  Private
exports.getFertilizerRecommendation = async (req, res, next) => {
  try {
    const recommendation = await FertilizerRecommendation.findById(req.params.id)
      .populate('crop', 'cropName status plantingDate');

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Fertilizer recommendation not found',
      });
    }

    // Make sure user owns the recommendation
    if (recommendation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
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

// @desc    Generate fertilizer recommendation
// @route   POST /api/fertilizers/generate
// @access  Private
exports.generateRecommendation = async (req, res, next) => {
  try {
    const { cropId, cropName, soilData } = req.body;

    // Validate required fields
    if (!cropName || !soilData || !soilData.nitrogen || !soilData.phosphorus || !soilData.potassium) {
      return res.status(400).json({
        success: false,
        message: 'Please provide crop name and soil data (N, P, K)',
      });
    }

    // Generate recommendation using AI/logic
    const recommendationData = generateFertilizerRecommendation(cropName, soilData);

    const recommendation = await FertilizerRecommendation.create({
      user: req.user._id,
      crop: cropId || null,
      cropName,
      soilData,
      ...recommendationData,
    });

    res.status(201).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update fertilizer recommendation
// @route   PUT /api/fertilizers/:id
// @access  Private
exports.updateRecommendation = async (req, res, next) => {
  try {
    let recommendation = await FertilizerRecommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Fertilizer recommendation not found',
      });
    }

    // Make sure user owns the recommendation
    if (recommendation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this recommendation',
      });
    }

    recommendation = await FertilizerRecommendation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete fertilizer recommendation
// @route   DELETE /api/fertilizers/:id
// @access  Private
exports.deleteRecommendation = async (req, res, next) => {
  try {
    const recommendation = await FertilizerRecommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Fertilizer recommendation not found',
      });
    }

    // Make sure user owns the recommendation
    if (recommendation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this recommendation',
      });
    }

    await recommendation.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Fertilizer recommendation deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark recommendation as applied
// @route   PUT /api/fertilizers/:id/apply
// @access  Private
exports.markAsApplied = async (req, res, next) => {
  try {
    const recommendation = await FertilizerRecommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Fertilizer recommendation not found',
      });
    }

    // Make sure user owns the recommendation
    if (recommendation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this recommendation',
      });
    }

    recommendation.applied = true;
    recommendation.appliedDate = Date.now();
    await recommendation.save();

    res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    next(error);
  }
};
