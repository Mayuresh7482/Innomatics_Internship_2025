const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['donation_assigned', 'donation_picked', 'donation_delivered', 'donation_expired', 'ngo_thank_you', 'system_notification'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  donation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodDonation'
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  actionLink: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for querying notifications by recipient and read status
notificationSchema.index({ recipient: 1, isRead: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification; 