const express = require('express');
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  updateAvailability
} = require('../controllers/doctorController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getDoctors)
  .post(protect, authorize('doctor'), createDoctor);

router.route('/:id')
  .get(getDoctor)
  .put(protect, authorize('doctor', 'admin'), updateDoctor)
  .delete(protect, authorize('admin'), deleteDoctor);

router.put('/:id/availability', protect, authorize('doctor'), updateAvailability);

module.exports = router; 