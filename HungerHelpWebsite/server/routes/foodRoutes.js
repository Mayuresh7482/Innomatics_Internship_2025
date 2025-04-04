const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const { auth, isDonor, isNGO, isNGOorVolunteer } = require('../middleware/auth');

// Create new donation (requires donor authentication)
router.post('/', auth, isDonor, foodController.createDonation);

// Get all donations (public)
router.get('/', foodController.getAllDonations);

// Get donation by ID (public)
router.get('/:id', foodController.getDonationById);

// Update donation status (requires authentication)
router.put('/:id/status', auth, isNGOorVolunteer, foodController.updateDonationStatus);

// Delete donation (requires donor authentication)
router.delete('/:id', auth, isDonor, foodController.deleteDonation);

// Get donations by donor (requires donor authentication)
router.get('/user/donations', auth, isDonor, foodController.getDonationsByDonor);

// Add NGO feedback to donation (requires NGO authentication)
router.post('/:id/feedback', auth, isNGO, foodController.addNGOFeedback);

module.exports = router; 