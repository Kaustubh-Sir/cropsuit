const express = require('express');
const router = express.Router();
const {
  getCropRecommendations,
  getCropPlans,
  getCropPlan,
  createCropPlan,
  updateCropPlan,
  deleteCropPlan,
  getSeasonalRecommendations,
} = require('../controllers/recommendationController');
const { isAuthenticated } = require('../middleware/auth');

// Protect all routes
router.use(isAuthenticated);

// Crop recommendations
router.post('/crops', getCropRecommendations);

// Seasonal recommendations
router.get('/seasonal', getSeasonalRecommendations);

// Crop plans CRUD
router.route('/plans')
  .get(getCropPlans)
  .post(createCropPlan);

router.route('/plans/:id')
  .get(getCropPlan)
  .put(updateCropPlan)
  .delete(deleteCropPlan);

module.exports = router;
