const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  updateDetails,
  updatePassword
} = require('../controllers/userController');

const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);

module.exports = router; 