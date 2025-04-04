const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { auth, isNGO } = require('../middleware/auth');

// Get user notifications (requires authentication)
router.get('/', auth, notificationController.getUserNotifications);

// Mark notification as read (requires authentication)
router.put('/:id/read', auth, notificationController.markAsRead);

// Mark all notifications as read (requires authentication)
router.put('/read-all', auth, notificationController.markAllAsRead);

// Delete notification (requires authentication)
router.delete('/:id', auth, notificationController.deleteNotification);

// Send notification (requires NGO authentication)
router.post('/send', auth, isNGO, notificationController.sendNotification);

module.exports = router; 