const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  approveDoctor,
  rejectDoctor,
  getDashboardStats
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply protection and authorization to all routes
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getDashboardStats);

router.route('/users')
  .get(getUsers);

router.route('/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.put('/doctors/:id/approve', approveDoctor);
router.put('/doctors/:id/reject', rejectDoctor);

module.exports = router; 