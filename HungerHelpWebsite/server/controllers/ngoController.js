const User = require('../models/User');
const FoodDonation = require('../models/FoodDonation');
const Notification = require('../models/Notification');

// Get all NGOs
const getAllNGOs = async (req, res) => {
  try {
    const { page = 1, limit = 10, verified = true } = req.query;
    
    // Build filter for verified NGOs only by default
    const filter = { userType: 'ngo' };
    if (verified === 'true') {
      filter.isVerified = true;
    }
    
    // Count total for pagination
    const totalNGOs = await User.countDocuments(filter);
    
    // Get paginated results
    const ngos = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    res.status(200).json({
      ngos,
      pagination: {
        total: totalNGOs,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalNGOs / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching NGOs:', error);
    res.status(500).json({ message: 'Server error fetching NGOs', error: error.message });
  }
};

// Get NGO by ID
const getNGOById = async (req, res) => {
  try {
    const ngo = await User.findOne({
      _id: req.params.id,
      userType: 'ngo'
    }).select('-password');
    
    if (!ngo) {
      return res.status(404).json({ message: 'NGO not found' });
    }
    
    res.status(200).json(ngo);
  } catch (error) {
    console.error('Error fetching NGO:', error);
    res.status(500).json({ message: 'Server error fetching NGO', error: error.message });
  }
};

// Assign food donation to volunteer
const assignDonation = async (req, res) => {
  try {
    const { donationId, volunteerId } = req.body;
    
    // Check if user is an NGO
    if (req.user.userType !== 'ngo') {
      return res.status(403).json({ message: 'Only NGOs can assign donations' });
    }
    
    // Find the donation
    const donation = await FoodDonation.findById(donationId);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    // Check if donation is available
    if (donation.status !== 'available') {
      return res.status(400).json({ message: 'Donation is not available for assignment' });
    }
    
    // Check if volunteer exists and is a volunteer
    const volunteer = await User.findOne({ _id: volunteerId, userType: 'volunteer' });
    
    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }
    
    // Update donation status
    donation.status = 'assigned';
    donation.ngo = req.user.id;
    donation.assignedTo = {
      volunteer: volunteerId,
      assignedAt: new Date()
    };
    
    await donation.save();
    
    // Create notifications
    const io = req.app.get('io');
    
    // Notify donor
    const donorNotification = new Notification({
      recipient: donation.donor,
      type: 'donation_assigned',
      title: 'Your Donation Has Been Assigned',
      message: `Your food donation (${donation.foodType}) has been assigned to an NGO and will be picked up soon.`,
      donation: donation._id,
      sender: req.user.id
    });
    
    await donorNotification.save();
    io.to(donation.donor.toString()).emit('new_notification', { notification: donorNotification });
    
    // Notify volunteer
    const volunteerNotification = new Notification({
      recipient: volunteerId,
      type: 'donation_assigned',
      title: 'New Pickup Assignment',
      message: `You have been assigned to pick up a food donation (${donation.foodType}).`,
      donation: donation._id,
      sender: req.user.id
    });
    
    await volunteerNotification.save();
    io.to(volunteerId).emit('new_notification', { notification: volunteerNotification });
    
    // Return updated donation with populated fields
    const updatedDonation = await FoodDonation.findById(donationId)
      .populate('donor', 'name email phone')
      .populate('ngo', 'name email phone')
      .populate('assignedTo.volunteer', 'name email phone');
    
    res.status(200).json({
      message: 'Donation assigned successfully',
      donation: updatedDonation
    });
  } catch (error) {
    console.error('Error assigning donation:', error);
    res.status(500).json({ message: 'Server error assigning donation', error: error.message });
  }
};

// Get donations assigned to NGO
const getAssignedDonations = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    // Build filter
    const filter = { ngo: req.user.id };
    
    if (status) {
      filter.status = status;
    }
    
    // Count total for pagination
    const totalDonations = await FoodDonation.countDocuments(filter);
    
    // Get paginated results
    const donations = await FoodDonation.find(filter)
      .populate('donor', 'name email phone address')
      .populate('assignedTo.volunteer', 'name email phone')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    res.status(200).json({
      donations,
      pagination: {
        total: totalDonations,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalDonations / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching assigned donations:', error);
    res.status(500).json({ message: 'Server error fetching donations', error: error.message });
  }
};

// Get available volunteers
const getAvailableVolunteers = async (req, res) => {
  try {
    const { city } = req.query;
    
    // Build filter for volunteers
    const filter = { userType: 'volunteer' };
    
    // Add city filter if provided
    if (city) {
      filter['address.city'] = city;
    }
    
    const volunteers = await User.find(filter)
      .select('name email phone address profilePicture')
      .sort({ name: 1 });
    
    res.status(200).json(volunteers);
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({ message: 'Server error fetching volunteers', error: error.message });
  }
};

// Update NGO profile with NGO-specific details
const updateNGOProfile = async (req, res) => {
  try {
    const { ngoDetails } = req.body;
    
    // Check if user is an NGO
    if (req.user.userType !== 'ngo') {
      return res.status(403).json({ message: 'Only NGOs can update NGO details' });
    }
    
    // Update NGO details
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { ngoDetails },
      { new: true }
    ).select('-password');
    
    res.status(200).json({
      message: 'NGO details updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating NGO details:', error);
    res.status(500).json({ message: 'Server error updating NGO details', error: error.message });
  }
};

// Get NGO statistics
const getNGOStatistics = async (req, res) => {
  try {
    // Check if user is an NGO
    if (req.user.userType !== 'ngo') {
      return res.status(403).json({ message: 'Only NGOs can access NGO statistics' });
    }
    
    // Get donation statistics
    const totalDonations = await FoodDonation.countDocuments({ ngo: req.user.id });
    const pendingPickups = await FoodDonation.countDocuments({ 
      ngo: req.user.id,
      status: 'assigned'
    });
    const inTransit = await FoodDonation.countDocuments({ 
      ngo: req.user.id,
      status: 'picked'
    });
    const delivered = await FoodDonation.countDocuments({ 
      ngo: req.user.id,
      status: 'delivered'
    });
    
    // Get total people served
    const servingsData = await FoodDonation.aggregate([
      { $match: { ngo: req.user._id, status: 'delivered' } },
      { $group: { _id: null, totalServings: { $sum: '$servesHowMany' } } }
    ]);
    
    const totalPeopleServed = servingsData.length > 0 ? servingsData[0].totalServings : 0;
    
    // Get recent donations
    const recentDonations = await FoodDonation.find({ ngo: req.user.id })
      .populate('donor', 'name')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.status(200).json({
      statistics: {
        totalDonations,
        pendingPickups,
        inTransit,
        delivered,
        totalPeopleServed
      },
      recentDonations
    });
  } catch (error) {
    console.error('Error fetching NGO statistics:', error);
    res.status(500).json({ message: 'Server error fetching statistics', error: error.message });
  }
};

module.exports = {
  getAllNGOs,
  getNGOById,
  assignDonation,
  getAssignedDonations,
  getAvailableVolunteers,
  updateNGOProfile,
  getNGOStatistics
}; 