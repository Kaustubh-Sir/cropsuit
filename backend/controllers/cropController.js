const Crop = require('../models/Crop');

// @desc    Get all crops for logged in user
// @route   GET /api/crops
// @access  Private
exports.getCrops = async (req, res, next) => {
  try {
    const { status, season, cropType } = req.query;
    
    const filter = { user: req.user._id };
    if (status) filter.status = status;
    if (season) filter.season = season;
    if (cropType) filter.cropType = cropType;

    const crops = await Crop.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: crops.length,
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
    if (crop.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
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
    req.body.user = req.user._id;

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
    if (crop.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
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
    if (crop.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this crop',
      });
    }

    await crop.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Crop deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get crop statistics
// @route   GET /api/crops/stats/summary
// @access  Private
exports.getCropStats = async (req, res, next) => {
  try {
    const stats = await Crop.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalArea: { $sum: '$area' },
        },
      },
    ]);

    const totalCrops = await Crop.countDocuments({ user: req.user._id });
    const totalArea = await Crop.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: null, total: { $sum: '$area' } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalCrops,
        totalArea: totalArea[0]?.total || 0,
        byStatus: stats,
      },
    });
  } catch (error) {
    next(error);
  }
};
