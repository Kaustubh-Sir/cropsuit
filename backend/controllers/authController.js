const User = require('../models/User');

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-__v');
    
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, location, farmDetails, preferences } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (location) updateFields.location = location;
    if (farmDetails) updateFields.farmDetails = farmDetails;
    if (preferences) updateFields.preferences = preferences;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateFields,
      { new: true, runValidators: true }
    ).select('-__v');

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Private
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error logging out',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  });
};

// @desc    Delete user account
// @route   DELETE /api/auth/account
// @access  Private
exports.deleteAccount = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    
    req.logout((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Account deleted but error logging out',
        });
      }
      res.status(200).json({
        success: true,
        message: 'Account deleted successfully',
      });
    });
  } catch (error) {
    next(error);
  }
};
