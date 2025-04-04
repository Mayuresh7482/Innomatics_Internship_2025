const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
// const userRoutes = require('./routes/userRoutes');
// const doctorRoutes = require('./routes/doctorRoutes');
// const appointmentRoutes = require('./routes/appointmentRoutes');
// const adminRoutes = require('./routes/adminRoutes');

// Use routes
// app.use('/api/users', userRoutes);
// app.use('/api/doctors', doctorRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/admin', adminRoutes);

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Global Healthcare Hospital API' });
});

// Auth routes
app.post('/api/auth/register', (req, res) => {
  // Mock registration
  const { name, email, password, role } = req.body;
  
  // In a real app, you would hash the password and save to database
  const user = { id: '1', name, email, role };
  const token = 'mock-jwt-token';
  
  res.json({ 
    success: true, 
    message: 'User registered successfully',
    token,
    user
  });
});

app.post('/api/auth/login', (req, res) => {
  // Mock login
  const { email, password } = req.body;
  
  // In a real app, you would verify credentials against database
  const user = { 
    id: '1', 
    name: 'Test User', 
    email, 
    role: email.includes('doctor') ? 'doctor' : 
          email.includes('admin') ? 'admin' : 'patient'
  };
  const token = 'mock-jwt-token';
  
  res.json({ 
    success: true, 
    message: 'Login successful',
    token,
    user
  });
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/healthcare-booking';

// Skip MongoDB connection for now and start the server directly
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   }); 