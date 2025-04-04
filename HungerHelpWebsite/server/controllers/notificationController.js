const Notification = require('../models/Notification');

// Get all notifications for a user
const getUserNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10, unreadOnly = false } = req.query;
    
    // Build filter
    const filter = { recipient: req.user.id };
    if (unreadOnly === 'true') {
      filter.isRead = false;
    }
    
    // Count total for pagination
    const totalNotifications = await Notification.countDocuments(filter);
    
    // Get paginated results
    const notifications = await Notification.find(filter)
      .populate('sender', 'name email userType')
      .populate('donation')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    // Count unread notifications
    const unreadCount = await Notification.countDocuments({
      recipient: req.user.id,
      isRead: false
    });
    
    res.status(200).json({
      notifications,
      unreadCount,
      pagination: {
        total: totalNotifications,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalNotifications / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error fetching notifications', error: error.message });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    
    const notification = await Notification.findById(id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    // Verify recipient
    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this notification' });
    }
    
    // Update read status
    notification.isRead = true;
    await notification.save();
    
    res.status(200).json({
      message: 'Notification marked as read',
      notification
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Server error updating notification', error: error.message });
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    // Update all unread notifications for the user
    const result = await Notification.updateMany(
      { recipient: req.user.id, isRead: false },
      { isRead: true }
    );
    
    res.status(200).json({
      message: 'All notifications marked as read',
      count: result.modifiedCount
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ message: 'Server error updating notifications', error: error.message });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    
    const notification = await Notification.findById(id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    // Verify recipient
    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this notification' });
    }
    
    // Delete notification
    await Notification.findByIdAndDelete(id);
    
    res.status(200).json({
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ message: 'Server error deleting notification', error: error.message });
  }
};

// Send notification (admin only)
const sendNotification = async (req, res) => {
  try {
    const { recipientId, title, message, type = 'system_notification' } = req.body;
    
    // Create notification
    const notification = new Notification({
      recipient: recipientId,
      type,
      title,
      message,
      sender: req.user.id
    });
    
    await notification.save();
    
    // Send real-time notification
    const io = req.app.get('io');
    io.to(recipientId).emit('new_notification', { notification });
    
    res.status(201).json({
      message: 'Notification sent successfully',
      notification
    });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ message: 'Server error sending notification', error: error.message });
  }
};

module.exports = {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  sendNotification
}; 