const express = require('express');
const {
  getCrops,
  getCrop,
  createCrop,
  updateCrop,
  deleteCrop,
  addNote,
  addHealthIssue,
  getCropStats,
} = require('../controllers/cropController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// Main CRUD routes
router.route('/').get(getCrops).post(createCrop);

router.route('/stats').get(getCropStats);

router.route('/:id').get(getCrop).put(updateCrop).delete(deleteCrop);

// Additional functionality routes
router.post('/:id/notes', addNote);
router.post('/:id/health-issues', addHealthIssue);

module.exports = router;
