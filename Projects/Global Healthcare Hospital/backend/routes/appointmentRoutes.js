const express = require('express');
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  cancelAppointment
} = require('../controllers/appointmentController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getAppointments)
  .post(protect, authorize('patient'), createAppointment);

router.route('/:id')
  .get(protect, getAppointment)
  .put(protect, authorize('doctor', 'admin'), updateAppointment)
  .delete(protect, cancelAppointment);

module.exports = router; 