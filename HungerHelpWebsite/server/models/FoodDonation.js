const mongoose = require('mongoose');

const foodDonationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  foodType: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  servesHowMany: {
    type: Number,
    required: true
  },
  preparedTime: {
    type: Date,
    required: true
  },
  expiryTime: {
    type: Date,
    required: true
  },
  pickupDetails: {
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    },
    contactName: String,
    contactPhone: String,
    instructions: String
  },
  photos: [String],
  status: {
    type: String,
    enum: ['available', 'assigned', 'picked', 'delivered', 'expired'],
    default: 'available'
  },
  assignedTo: {
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    assignedAt: Date
  },
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deliveryDetails: {
    pickedAt: Date,
    deliveredAt: Date,
    feedbackFromNGO: String,
    photos: [String]
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  additionalNotes: String
}, {
  timestamps: true
});

// Index for searching and filtering
foodDonationSchema.index({ status: 1, expiryTime: 1 });
foodDonationSchema.index({ "pickupDetails.address.city": 1 });

const FoodDonation = mongoose.model('FoodDonation', foodDonationSchema);

module.exports = FoodDonation; 