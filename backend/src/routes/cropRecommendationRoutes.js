const express = require('express');
const {
  getRecommendations,
  getRecommendation,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation,
} = require('../controllers/cropRecommendationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/').get(getRecommendations).post(createRecommendation);

router
  .route('/:id')
  .get(getRecommendation)
  .put(updateRecommendation)
  .delete(deleteRecommendation);

module.exports = router;
