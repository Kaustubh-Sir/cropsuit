const express = require('express');
const router = express.Router();
const {
  getCrops,
  getCrop,
  createCrop,
  updateCrop,
  deleteCrop,
  getCropStats,
} = require('../controllers/cropController');
const { isAuthenticated } = require('../middleware/auth');

// Protect all routes
router.use(isAuthenticated);

// Statistics route
router.get('/stats/summary', getCropStats);

// CRUD routes
router.route('/')
  .get(getCrops)
  .post(createCrop);

router.route('/:id')
  .get(getCrop)
  .put(updateCrop)
  .delete(deleteCrop);

module.exports = router;
