# Hunger Help Website

Hunger Help is a platform that connects food donors with NGOs to reduce food waste and help those in need. The platform allows donors to register and post about excess food, which can then be picked up by volunteers and delivered to NGOs for distribution.

## Features

- User registration and authentication (Donor, NGO, Volunteer)
- Food donation management
- Real-time notifications
- NGO verification system
- Donation tracking (available, assigned, picked up, delivered)
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- React Router
- Context API for state management
- React Bootstrap & Material UI
- Socket.io client for real-time updates
- Axios for API calls

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- Socket.io for real-time updates
- Nodemailer for email notifications

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/hunger-help-website.git
cd hunger-help-website
```

2. Set up Backend
```bash
cd server
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hungerhelp
JWT_SECRET=your_jwt_secret_key
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:3000
```

4. Set up Frontend
```bash
cd ../client
npm install
```

5. Start the development servers

In the server directory:
```bash
npm run dev
```

In the client directory:
```bash
npm start
```

6. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `GET /api/auth/verify-ngo/:token` - Verify NGO account

### Food Donations
- `POST /api/food` - Create new donation
- `GET /api/food` - Get all donations (with filters)
- `GET /api/food/:id` - Get donation by ID
- `PUT /api/food/:id/status` - Update donation status
- `DELETE /api/food/:id` - Delete donation
- `GET /api/food/user/donations` - Get donations by donor
- `POST /api/food/:id/feedback` - Add NGO feedback

### NGOs
- `GET /api/ngo` - Get all NGOs
- `GET /api/ngo/:id` - Get NGO by ID
- `POST /api/ngo/assign-donation` - Assign donation to volunteer
- `GET /api/ngo/donations/assigned` - Get donations assigned to NGO
- `GET /api/ngo/volunteers/available` - Get available volunteers
- `PUT /api/ngo/profile/details` - Update NGO profile
- `GET /api/ngo/statistics` - Get NGO statistics

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all notifications as read
- `DELETE /api/notifications/:id` - Delete notification
- `POST /api/notifications/send` - Send notification

## License

This project is licensed under the ISC License.

## Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Material-UI](https://mui.com/)
- [Socket.io](https://socket.io/) 