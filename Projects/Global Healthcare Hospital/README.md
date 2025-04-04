# Global Healthcare Booking System

A comprehensive healthcare appointment booking system built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

### Patient Features
- Register/Login
- Browse doctors by specialization
- View doctor profiles & availability
- Book appointments
- View and cancel booked appointments

### Doctor Features
- Register/Login
- Set available time slots
- View and manage booked appointments
- Update profile

### Admin Features
- Approve/reject doctor registrations
- Manage all users (doctors & patients)
- View all appointments
- Dashboard with statistics

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- React Bootstrap for UI components
- Axios for API requests
- Context API for state management

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt.js for password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Install backend dependencies
```
cd backend
npm install
```

3. Install frontend dependencies
```
cd ../frontend
npm install
```

4. Set up environment variables
Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
```

### Running the application

1. Start the backend server
```
cd backend
npm run dev
```

2. Start the frontend development server
```
cd frontend
npm start
```

3. Access the application at `http://localhost:3000`

## API Documentation

The API documentation is available at `/api-docs` when the server is running.

## License

This project is licensed under the MIT License. 