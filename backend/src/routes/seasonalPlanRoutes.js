const express = require('express');
const {
  getPlans,
  getPlan,
  createPlan,
  updatePlan,
  deletePlan,
  addMilestone,
  updateMilestone,
  addNote,
  getPlanStats,
} = require('../controllers/seasonalPlanController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

router.route('/').get(getPlans).post(createPlan);

router.route('/stats').get(getPlanStats);

router.route('/:id').get(getPlan).put(updatePlan).delete(deletePlan);

router.post('/:id/milestones', addMilestone);
router.put('/:id/milestones/:milestoneId', updateMilestone);
router.post('/:id/notes', addNote);

module.exports = router;
