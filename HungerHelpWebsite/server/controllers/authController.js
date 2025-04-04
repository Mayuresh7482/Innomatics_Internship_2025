const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, userType: user.userType },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register new user
const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, userType, ngoDetails } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user based on userType
    const userData = {
      name,
      email,
      password,
      phone,
      address,
      userType
    };

    // Add NGO details if user is an NGO
    if (userType === 'ngo' && ngoDetails) {
      userData.ngoDetails = ngoDetails;
      // NGOs need verification
      userData.isVerified = false;
    } else {
      // Regular users are auto-verified
      userData.isVerified = true;
    }

    const user = new User(userData);
    await user.save();

    // Generate verification token if NGO
    if (userType === 'ngo') {
      const verificationToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      // Send verification email
      const verificationUrl = `${process.env.CLIENT_URL}/verify-ngo/${verificationToken}`;
      
      await transporter.sendMail({
        to: user.email,
        subject: 'Verify your NGO account - Hunger Help',
        html: `
          <h1>NGO Verification</h1>
          <p>Thank you for registering your NGO with Hunger Help. Click the link below to verify your account:</p>
          <a href="${verificationUrl}" style="padding: 10px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verify NGO Account</a>
          <p>This link will expire in 24 hours.</p>
        `
      });
    }

    // Generate auth token
    const token = generateToken(user);

    // Return user data without password
    const userToReturn = { ...user.toObject() };
    delete userToReturn.password;

    res.status(201).json({
      message: 'User registered successfully',
      user: userToReturn,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

// User login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if NGO is verified
    if (user.userType === 'ngo' && !user.isVerified) {
      return res.status(403).json({ message: 'NGO account pending verification' });
    }

    // Generate token
    const token = generateToken(user);

    // Return user data without password
    const userToReturn = { ...user.toObject() };
    delete userToReturn.password;

    res.status(200).json({
      message: 'Login successful',
      user: userToReturn,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
};

// Verify NGO account
const verifyNGO = async (req, res) => {
  try {
    const { token } = req.params;

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Update user verification status
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'NGO verified successfully' });
  } catch (error) {
    console.error('NGO verification error:', error);
    res.status(500).json({ message: 'Server error during verification', error: error.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error fetching profile', error: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, profilePicture } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address, profilePicture },
      { new: true }
    ).select('-password');

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error updating profile', error: error.message });
  }
};

module.exports = {
  register,
  login,
  verifyNGO,
  getUserProfile,
  updateProfile
}; 