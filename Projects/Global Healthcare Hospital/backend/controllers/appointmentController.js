const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
exports.getAppointments = async (req, res) => {
  try {
    let query;

    // If user is patient, show only their appointments
    if (req.user.role === 'patient') {
      query = Appointment.find({ patient: req.user.id });
    } 
    // If user is doctor, show only appointments for their profile
    else if (req.user.role === 'doctor') {
      const doctorObj = await Doctor.findOne({ user: req.user.id });
      
      if (!doctorObj) {
        return res.status(404).json({
          success: false,
          message: 'Doctor profile not found'
        });
      }
      
      query = Appointment.find({ doctor: doctorObj._id });
    } 
    // If admin, show all appointments
    else {
      query = Appointment.find({});
    }

    // Add population
    query = query.populate({
      path: 'patient',
      select: 'name email phone'
    }).populate({
      path: 'doctor',
      populate: {
        path: 'user',
        select: 'name email phone'
      }
    });

    const appointments = await query;

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single appointment
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate({
      path: 'patient',
      select: 'name email phone'
    }).populate({
      path: 'doctor',
      populate: {
        path: 'user',
        select: 'name email phone'
      }
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `Appointment not found with id of ${req.params.id}`
      });
    }

    // Make sure user is appointment owner or doctor or admin
    if (
      appointment.patient._id.toString() !== req.user.id &&
      req.user.role !== 'admin' &&
      !(req.user.role === 'doctor' && appointment.doctor.user.toString() === req.user.id)
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to view this appointment`
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private (patient only)
exports.createAppointment = async (req, res) => {
  try {
    // Add patient to req.body
    req.body.patient = req.user.id;

    // Check if doctor exists
    const doctor = await Doctor.findById(req.body.doctor);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: `Doctor not found with id of ${req.body.doctor}`
      });
    }

    // Check if doctor is approved
    if (!doctor.isApproved) {
      return res.status(400).json({
        success: false,
        message: 'This doctor is not approved yet'
      });
    }

    // Check if the requested time slot is available
    const { appointmentDate, timeSlot } = req.body;
    const appointmentDay = new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'long' });
    
    // Find matching available slot
    const availableSlot = doctor.availableSlots.find(
      slot => 
        slot.day === appointmentDay && 
        slot.startTime === timeSlot.startTime && 
        slot.endTime === timeSlot.endTime &&
        slot.isAvailable
    );

    if (!availableSlot) {
      return res.status(400).json({
        success: false,
        message: 'The requested time slot is not available'
      });
    }

    // Check if there's already an appointment at this time
    const existingAppointment = await Appointment.findOne({
      doctor: req.body.doctor,
      appointmentDate: new Date(appointmentDate),
      'timeSlot.startTime': timeSlot.startTime,
      'timeSlot.endTime': timeSlot.endTime,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'This time slot is already booked'
      });
    }

    const appointment = await Appointment.create(req.body);

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private (doctor, admin)
exports.updateAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `Appointment not found with id of ${req.params.id}`
      });
    }

    // Get doctor info
    const doctor = await Doctor.findById(appointment.doctor);

    // Make sure user is doctor of this appointment or admin
    if (
      !(req.user.role === 'doctor' && doctor.user.toString() === req.user.id) &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this appointment`
      });
    }

    // Only allow status update
    appointment.status = req.body.status;
    
    if (req.body.notes) {
      appointment.notes = req.body.notes;
    }
    
    await appointment.save();

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Private (patient, doctor, admin)
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `Appointment not found with id of ${req.params.id}`
      });
    }

    // Get doctor info
    const doctor = await Doctor.findById(appointment.doctor);

    // Make sure user is appointment owner or doctor or admin
    if (
      appointment.patient.toString() !== req.user.id &&
      !(req.user.role === 'doctor' && doctor.user.toString() === req.user.id) &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to cancel this appointment`
      });
    }

    // Update status to cancelled
    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 