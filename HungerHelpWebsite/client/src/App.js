import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles/main.css';
import MainNavbar from './components/MainNavbar';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Layout Components
import Footer from './components/layout/Footer';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import DonationForm from './pages/DonationForm';
import DonationDetails from './pages/DonationDetails';
import MyDonations from './pages/MyDonations';
import NGOList from './pages/NGOList';
import NGODetails from './pages/NGODetails';
import Notifications from './pages/Notifications';
import About from './pages/About';
import Contact from './pages/Contact';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// ScrollToTop component to reset scroll position on navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <ScrollToTop />
          <div className="d-flex flex-column min-vh-100">
            <MainNavbar />
            <main className="flex-grow-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/ngos" element={<NGOList />} />
                <Route path="/ngos/:id" element={<NGODetails />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
                <Route path="/donate" element={
                  <PrivateRoute>
                    <DonationForm />
                  </PrivateRoute>
                } />
                <Route path="/donations/:id" element={
                  <PrivateRoute>
                    <DonationDetails />
                  </PrivateRoute>
                } />
                <Route path="/my-donations" element={
                  <PrivateRoute>
                    <MyDonations />
                  </PrivateRoute>
                } />
                <Route path="/notifications" element={
                  <PrivateRoute>
                    <Notifications />
                  </PrivateRoute>
                } />
                
                {/* 404 Route */}
                <Route path="/not-found" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/not-found" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App; 