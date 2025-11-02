// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ 
    success: false, 
    message: 'Authentication required. Please log in.' 
  });
};

// Middleware to attach user to request
const attachUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.userId = req.user._id;
  }
  next();
};

module.exports = { isAuthenticated, attachUser };
