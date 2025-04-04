const FoodDonation = require('../models/FoodDonation');
const Notification = require('../models/Notification');
const User = require('../models/User');

// Create new food donation
const createDonation = async (req, res) => {
  try {
    const {
      foodType,
      quantity,
      servesHowMany,
      preparedTime,
      expiryTime,
      pickupDetails,
      photos,
      isUrgent,
      additionalNotes
    } = req.body;

    // Create new donation
    const newDonation = new FoodDonation({
      donor: req.user.id,
      foodType,
      quantity,
      servesHowMany,
      preparedTime,
      expiryTime,
      pickupDetails,
      photos,
      isUrgent,
      additionalNotes,
      status: 'available'
    });

    await newDonation.save();

    // Notify nearby NGOs about new donation (if urgent)
    if (isUrgent) {
      // Find NGOs in the same city
      const city = pickupDetails.address.city;
      const ngosInCity = await User.find({
        userType: 'ngo',
        isVerified: true,
        'address.city': city
      });

      const io = req.app.get('io');
      const notifications = [];

      // Create notifications for NGOs
      for (const ngo of ngosInCity) {
        const notification = new Notification({
          recipient: ngo._id,
          type: 'system_notification',
          title: 'Urgent Food Donation Available',
          message: `A new urgent food donation is available in your area: ${foodType} (${quantity})`,
          donation: newDonation._id,
          sender: req.user.id
        });

        await notification.save();
        notifications.push(notification);

        // Send real-time notification
        io.to(ngo._id.toString()).emit('new_notification', {
          notification
        });
      }
    }

    res.status(201).json({
      message: 'Food donation created successfully',
      donation: newDonation
    });
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ message: 'Server error creating donation', error: error.message });
  }
};

// Get all donations (with filters)
const getAllDonations = async (req, res) => {
  try {
    const {
      status,
      city,
      foodType,
      isUrgent,
      expiryBefore,
      expiryAfter,
      limit = 10,
      page = 1
    } = req.query;

    // Build filter object
    const filter = {};

    if (status) filter.status = status;
    if (isUrgent) filter.isUrgent = isUrgent === 'true';
    if (foodType) filter.foodType = foodType;
    if (city) filter['pickupDetails.address.city'] = city;

    // Handle expiry time filters
    if (expiryBefore || expiryAfter) {
      filter.expiryTime = {};
      if (expiryBefore) filter.expiryTime.$lte = new Date(expiryBefore);
      if (expiryAfter) filter.expiryTime.$gte = new Date(expiryAfter);
    }

    // Count total documents for pagination
    const totalDonations = await FoodDonation.countDocuments(filter);

    // Get paginated results
    const donations = await FoodDonation.find(filter)
      .populate('donor', 'name email phone')
      .populate('ngo', 'name email phone')
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
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Server error fetching donations', error: error.message });
  }
};

// Get donation by ID
const getDonationById = async (req, res) => {
  try {
    const donation = await FoodDonation.findById(req.params.id)
      .populate('donor', 'name email phone address')
      .populate('ngo', 'name email phone address')
      .populate('assignedTo.volunteer', 'name email phone');

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.status(200).json(donation);
  } catch (error) {
    console.error('Error fetching donation:', error);
    res.status(500).json({ message: 'Server error fetching donation', error: error.message });
  }
};

// Update donation status
const updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, ngoId, volunteerId } = req.body;

    // Validate status
    const validStatuses = ['available', 'assigned', 'picked', 'delivered', 'expired'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Get the donation
    const donation = await FoodDonation.findById(id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Update fields based on status
    const updateData = { status };
    
    switch (status) {
      case 'assigned':
        if (!ngoId || !volunteerId) {
          return res.status(400).json({ message: 'NGO and volunteer IDs are required for assignment' });
        }
        updateData.ngo = ngoId;
        updateData.assignedTo = {
          volunteer: volunteerId,
          assignedAt: new Date()
        };
        break;
        
      case 'picked':
        if (!donation.assignedTo?.volunteer) {
          return res.status(400).json({ message: 'Donation must be assigned before being picked up' });
        }
        updateData['deliveryDetails.pickedAt'] = new Date();
        break;
        
      case 'delivered':
        if (!donation.deliveryDetails?.pickedAt) {
          return res.status(400).json({ message: 'Donation must be picked up before being delivered' });
        }
        updateData['deliveryDetails.deliveredAt'] = new Date();
        break;
    }

    // Update the donation
    const updatedDonation = await FoodDonation.findByIdAndUpdate(id, updateData, { new: true })
      .populate('donor', 'name email')
      .populate('ngo', 'name email')
      .populate('assignedTo.volunteer', 'name email');

    // Create notifications based on status change
    const io = req.app.get('io');
    
    if (status === 'assigned') {
      // Notify donor
      const donorNotification = new Notification({
        recipient: updatedDonation.donor._id,
        type: 'donation_assigned',
        title: 'Your Donation Has Been Assigned',
        message: `Your food donation (${updatedDonation.foodType}) has been assigned to an NGO and volunteer for pickup.`,
        donation: updatedDonation._id,
        sender: ngoId
      });
      await donorNotification.save();
      io.to(updatedDonation.donor._id.toString()).emit('new_notification', { notification: donorNotification });
      
      // Notify volunteer
      const volunteerNotification = new Notification({
        recipient: volunteerId,
        type: 'donation_assigned',
        title: 'New Pickup Assignment',
        message: `You have been assigned to pick up a food donation (${updatedDonation.foodType}) for delivery.`,
        donation: updatedDonation._id,
        sender: ngoId
      });
      await volunteerNotification.save();
      io.to(volunteerId).emit('new_notification', { notification: volunteerNotification });
    }
    
    else if (status === 'picked') {
      // Notify donor
      const donorNotification = new Notification({
        recipient: updatedDonation.donor._id,
        type: 'donation_picked',
        title: 'Your Donation Has Been Picked Up',
        message: `Your food donation (${updatedDonation.foodType}) has been picked up by our volunteer.`,
        donation: updatedDonation._id,
        sender: req.user.id
      });
      await donorNotification.save();
      io.to(updatedDonation.donor._id.toString()).emit('new_notification', { notification: donorNotification });
      
      // Notify NGO
      const ngoNotification = new Notification({
        recipient: updatedDonation.ngo._id,
        type: 'donation_picked',
        title: 'Donation Picked Up',
        message: `The volunteer has picked up the food donation (${updatedDonation.foodType}) and is on the way.`,
        donation: updatedDonation._id,
        sender: req.user.id
      });
      await ngoNotification.save();
      io.to(updatedDonation.ngo._id.toString()).emit('new_notification', { notification: ngoNotification });
    }
    
    else if (status === 'delivered') {
      // Notify donor
      const donorNotification = new Notification({
        recipient: updatedDonation.donor._id,
        type: 'donation_delivered',
        title: 'Your Donation Has Been Delivered',
        message: `Your food donation (${updatedDonation.foodType}) has been successfully delivered to the NGO.`,
        donation: updatedDonation._id,
        sender: updatedDonation.ngo._id
      });
      await donorNotification.save();
      io.to(updatedDonation.donor._id.toString()).emit('new_notification', { notification: donorNotification });
      
      // Notify volunteer
      const volunteerNotification = new Notification({
        recipient: updatedDonation.assignedTo.volunteer._id,
        type: 'donation_delivered',
        title: 'Delivery Confirmed',
        message: `The NGO has confirmed the delivery of the food donation (${updatedDonation.foodType}).`,
        donation: updatedDonation._id,
        sender: updatedDonation.ngo._id
      });
      await volunteerNotification.save();
      io.to(updatedDonation.assignedTo.volunteer._id.toString()).emit('new_notification', { notification: volunteerNotification });
    }

    res.status(200).json({
      message: `Donation status updated to ${status}`,
      donation: updatedDonation
    });
  } catch (error) {
    console.error('Error updating donation status:', error);
    res.status(500).json({ message: 'Server error updating donation status', error: error.message });
  }
};

// Delete donation
const deleteDonation = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find donation
    const donation = await FoodDonation.findById(id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    // Check if user is the donor
    if (donation.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this donation' });
    }
    
    // Check if donation is already assigned
    if (donation.status !== 'available' && donation.status !== 'expired') {
      return res.status(400).json({ message: 'Cannot delete donation that is already assigned or in progress' });
    }
    
    // Delete the donation
    await FoodDonation.findByIdAndDelete(id);
    
    // Delete associated notifications
    await Notification.deleteMany({ donation: id });
    
    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({ message: 'Server error deleting donation', error: error.message });
  }
};

// Get donations by donor
const getDonationsByDonor = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const totalDonations = await FoodDonation.countDocuments({ donor: req.user.id });
    
    const donations = await FoodDonation.find({ donor: req.user.id })
      .populate('ngo', 'name email phone')
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
    console.error('Error fetching donor donations:', error);
    res.status(500).json({ message: 'Server error fetching donations', error: error.message });
  }
};

// Add feedback from NGO
const addNGOFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback, photos } = req.body;
    
    // Find donation
    const donation = await FoodDonation.findById(id);
    
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    
    // Check if user is the NGO
    if (donation.ngo.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to add feedback' });
    }
    
    // Check if donation is delivered
    if (donation.status !== 'delivered') {
      return res.status(400).json({ message: 'Cannot add feedback to undelivered donation' });
    }
    
    // Update the donation with feedback
    const updatedDonation = await FoodDonation.findByIdAndUpdate(
      id,
      { 
        'deliveryDetails.feedbackFromNGO': feedback,
        'deliveryDetails.photos': photos
      },
      { new: true }
    ).populate('donor', 'name email');
    
    // Create thank you notification
    const io = req.app.get('io');
    const thankYouNotification = new Notification({
      recipient: updatedDonation.donor._id,
      type: 'ngo_thank_you',
      title: 'Thank You from the NGO',
      message: `The NGO has sent a thank you message for your food donation: "${feedback.substring(0, 50)}${feedback.length > 50 ? '...' : ''}"`,
      donation: updatedDonation._id,
      sender: req.user.id
    });
    
    await thankYouNotification.save();
    io.to(updatedDonation.donor._id.toString()).emit('new_notification', { notification: thankYouNotification });
    
    res.status(200).json({
      message: 'Feedback added successfully',
      donation: updatedDonation
    });
  } catch (error) {
    console.error('Error adding NGO feedback:', error);
    res.status(500).json({ message: 'Server error adding feedback', error: error.message });
  }
};

module.exports = {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonationStatus,
  deleteDonation,
  getDonationsByDonor,
  addNGOFeedback
}; 