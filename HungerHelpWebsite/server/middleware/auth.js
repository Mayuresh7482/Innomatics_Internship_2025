const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token
const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Token is valid but user not found' });
    }
    
    // Add user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is invalid or expired', error: error.message });
  }
};

// Middleware to check if user is an NGO
const isNGO = (req, res, next) => {
  if (req.user.userType !== 'ngo') {
    return res.status(403).json({ message: 'Access denied. NGO role required' });
  }
  
  // Check if NGO is verified
  if (!req.user.isVerified) {
    return res.status(403).json({ message: 'Access denied. NGO account pending verification' });
  }
  
  next();
};

// Middleware to check if user is a donor
const isDonor = (req, res, next) => {
  if (req.user.userType !== 'donor') {
    return res.status(403).json({ message: 'Access denied. Donor role required' });
  }
  
  next();
};

// Middleware to check if user is a volunteer
const isVolunteer = (req, res, next) => {
  if (req.user.userType !== 'volunteer') {
    return res.status(403).json({ message: 'Access denied. Volunteer role required' });
  }
  
  next();
};

// Middleware to check if user is an NGO or volunteer
const isNGOorVolunteer = (req, res, next) => {
  if (req.user.userType !== 'ngo' && req.user.userType !== 'volunteer') {
    return res.status(403).json({ message: 'Access denied. NGO or volunteer role required' });
  }
  
  // If NGO, check verification
  if (req.user.userType === 'ngo' && !req.user.isVerified) {
    return res.status(403).json({ message: 'Access denied. NGO account pending verification' });
  }
  
  next();
};

module.exports = {
  auth,
  isNGO,
  isDonor,
  isVolunteer,
  isNGOorVolunteer
}; 