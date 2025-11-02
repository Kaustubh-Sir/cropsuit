const Crop = require('../models/Crop');

// @desc    Get all crops for logged in user
// @route   GET /api/crops
// @access  Private
exports.getCrops = async (req, res, next) => {
  try {
    const { status, season, category, page = 1, limit = 10 } = req.query;

    const query = { user: req.user.id };

    // Add filters if provided
    if (status) query.status = status;
    if (season) query.season = season;
    if (category) query.category = category;

    const crops = await Crop.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Crop.countDocuments(query);

    res.status(200).json({
      success: true,
      count: crops.length,
      total: count,
      pages: Math.ceil(count / limit),
      data: crops,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single crop
// @route   GET /api/crops/:id
// @access  Private
exports.getCrop = async (req, res, next) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found',
      });
    }

    // Make sure user owns the crop
    if (crop.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this crop',
      });
    }

    res.status(200).json({
      success: true,
      data: crop,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new crop
// @route   POST /api/crops
// @access  Private
exports.createCrop = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const crop = await Crop.create(req.body);

    res.status(201).json({
      success: true,
      data: crop,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update crop
// @route   PUT /api/crops/:id
// @access  Private
exports.updateCrop = async (req, res, next) => {
  try {
    let crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found',
      });
    }

    // Make sure user owns the crop
    if (crop.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this crop',
      });
    }

    crop = await Crop.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: crop,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete crop
// @route   DELETE /api/crops/:id
// @access  Private
exports.deleteCrop = async (req, res, next) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found',
      });
    }

    // Make sure user owns the crop
    if (crop.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this crop',
      });
    }

    await crop.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Crop deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add note to crop
// @route   POST /api/crops/:id/notes
// @access  Private
exports.addNote = async (req, res, next) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found',
      });
    }

    // Make sure user owns the crop
    if (crop.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to add note to this crop',
      });
    }

    crop.notes.push({
      content: req.body.content,
      date: Date.now(),
    });

    await crop.save();

    res.status(200).json({
      success: true,
      data: crop,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add health issue to crop
// @route   POST /api/crops/:id/health-issues
// @access  Private
exports.addHealthIssue = async (req, res, next) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: 'Crop not found',
      });
    }

    // Make sure user owns the crop
    if (crop.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this crop',
      });
    }

    crop.health.issues.push(req.body);
    await crop.save();

    res.status(200).json({
      success: true,
      data: crop,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get crop statistics
// @route   GET /api/crops/stats
// @access  Private
exports.getCropStats = async (req, res, next) => {
  try {
    const stats = await Crop.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalArea: { $sum: '$area' },
        },
      },
    ]);

    const categoryStats = await Crop.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        byStatus: stats,
        byCategory: categoryStats,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;
