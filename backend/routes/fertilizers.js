const express = require('express');
const router = express.Router();
const {
  getFertilizerRecommendations,
  getFertilizerRecommendation,
  generateRecommendation,
  updateRecommendation,
  deleteRecommendation,
  markAsApplied,
} = require('../controllers/fertilizerController');
const { isAuthenticated } = require('../middleware/auth');

// Protect all routes
router.use(isAuthenticated);

// Generate new recommendation
router.post('/generate', generateRecommendation);

// Mark as applied
router.put('/:id/apply', markAsApplied);

// CRUD routes
router.route('/')
  .get(getFertilizerRecommendations);

router.route('/:id')
  .get(getFertilizerRecommendation)
  .put(updateRecommendation)
  .delete(deleteRecommendation);

module.exports = router;
