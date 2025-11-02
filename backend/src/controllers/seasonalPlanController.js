const SeasonalPlan = require('../models/SeasonalPlan');

// @desc    Get all seasonal plans
// @route   GET /api/seasonal-plans
// @access  Private
exports.getPlans = async (req, res, next) => {
  try {
    const { status, season, year, page = 1, limit = 10 } = req.query;

    const query = { user: req.user.id };
    if (status) query.status = status;
    if (season) query.season = season;
    if (year) query.year = parseInt(year);

    const plans = await SeasonalPlan.find(query)
      .populate('crops.crop', 'name category status')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await SeasonalPlan.countDocuments(query);

    res.status(200).json({
      success: true,
      count: plans.length,
      total: count,
      pages: Math.ceil(count / limit),
      data: plans,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single plan
// @route   GET /api/seasonal-plans/:id
// @access  Private
exports.getPlan = async (req, res, next) => {
  try {
    const plan = await SeasonalPlan.findById(req.params.id).populate(
      'crops.crop',
      'name category status area'
    );

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    // Make sure user owns the plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({
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

// @desc    Create new plan
// @route   POST /api/seasonal-plans
// @access  Private
exports.createPlan = async (req, res, next) => {
  try {
    req.body.user = req.user.id;

    const plan = await SeasonalPlan.create(req.body);

    res.status(201).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update plan
// @route   PUT /api/seasonal-plans/:id
// @access  Private
exports.updatePlan = async (req, res, next) => {
  try {
    let plan = await SeasonalPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    // Make sure user owns the plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this plan',
      });
    }

    plan = await SeasonalPlan.findByIdAndUpdate(req.params.id, req.body, {
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

// @desc    Delete plan
// @route   DELETE /api/seasonal-plans/:id
// @access  Private
exports.deletePlan = async (req, res, next) => {
  try {
    const plan = await SeasonalPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    // Make sure user owns the plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this plan',
      });
    }

    await plan.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Plan deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add milestone to plan
// @route   POST /api/seasonal-plans/:id/milestones
// @access  Private
exports.addMilestone = async (req, res, next) => {
  try {
    const plan = await SeasonalPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    // Make sure user owns the plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this plan',
      });
    }

    plan.milestones.push(req.body);
    await plan.save();

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update milestone
// @route   PUT /api/seasonal-plans/:id/milestones/:milestoneId
// @access  Private
exports.updateMilestone = async (req, res, next) => {
  try {
    const plan = await SeasonalPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    // Make sure user owns the plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this plan',
      });
    }

    const milestone = plan.milestones.id(req.params.milestoneId);
    if (!milestone) {
      return res.status(404).json({
        success: false,
        message: 'Milestone not found',
      });
    }

    Object.assign(milestone, req.body);
    await plan.save();

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add note to plan
// @route   POST /api/seasonal-plans/:id/notes
// @access  Private
exports.addNote = async (req, res, next) => {
  try {
    const plan = await SeasonalPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    // Make sure user owns the plan
    if (plan.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this plan',
      });
    }

    plan.notes.push({
      content: req.body.content,
      author: req.user.id,
      date: Date.now(),
    });
    await plan.save();

    res.status(200).json({
      success: true,
      data: plan,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get plan statistics
// @route   GET /api/seasonal-plans/stats
// @access  Private
exports.getPlanStats = async (req, res, next) => {
  try {
    const stats = await SeasonalPlan.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalArea: { $sum: '$totalArea' },
          totalBudget: { $sum: '$financials.totalBudget' },
        },
      },
    ]);

    const seasonStats = await SeasonalPlan.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: '$season',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        byStatus: stats,
        bySeason: seasonStats,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = exports;
