const express = require('express');
const router = express.Router();
const ngoController = require('../controllers/ngoController');
const { auth, isNGO } = require('../middleware/auth');

// Get all NGOs (public)
router.get('/', ngoController.getAllNGOs);

// Get NGO by ID (public)
router.get('/:id', ngoController.getNGOById);

// Assign donation to volunteer (requires NGO authentication)
router.post('/assign-donation', auth, isNGO, ngoController.assignDonation);

// Get donations assigned to NGO (requires NGO authentication)
router.get('/donations/assigned', auth, isNGO, ngoController.getAssignedDonations);

// Get available volunteers (requires NGO authentication)
router.get('/volunteers/available', auth, isNGO, ngoController.getAvailableVolunteers);

// Update NGO profile details (requires NGO authentication)
router.put('/profile/details', auth, isNGO, ngoController.updateNGOProfile);

// Get NGO statistics (requires NGO authentication)
router.get('/statistics', auth, isNGO, ngoController.getNGOStatistics);

module.exports = router; 