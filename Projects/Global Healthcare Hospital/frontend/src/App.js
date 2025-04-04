import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Context
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Patient Components
import PatientDashboard from './components/patient/PatientDashboard';
import DoctorList from './components/patient/DoctorList';
import DoctorDetails from './components/patient/DoctorDetails';
import BookAppointment from './components/patient/BookAppointment';
import MyAppointments from './components/patient/MyAppointments';
import PatientProfile from './components/patient/PatientProfile';

// Doctor Components
import DoctorDashboard from './components/doctor/DoctorDashboard';
import DoctorProfile from './components/doctor/DoctorProfile';
import ManageAppointments from './components/doctor/ManageAppointments';
import ManageAvailability from './components/doctor/ManageAvailability';

// Admin Components
import Dashboard from './components/admin/Dashboard';
import ManageDoctors from './components/admin/ManageDoctors';
import ManageUsers from './components/admin/ManageUsers';
import AdminManageAppointments from './components/admin/ManageAppointments';
import AdminProfile from './components/admin/AdminProfile';
import Reports from './components/admin/Reports';

// Home Page
import Home from './components/Home';

// Public Pages
import About from './components/About';
import Contact from './components/Contact';
import Doctors from './components/Doctors';

// Protected Route
import ProtectedRoute from './components/routing/ProtectedRoute';

// Services Pages
import Services from './components/Services';
import Cardiology from './components/services/Cardiology';
import Neurology from './components/services/Neurology';
import Orthopedics from './components/services/Orthopedics';
import Pediatrics from './components/services/Pediatrics';
import Gynecology from './components/services/Gynecology';
import Dermatology from './components/services/Dermatology';
import TestComponent from './components/services/TestComponent';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<div className="container py-5 mt-5"><Login /></div>} />
              <Route path="/register" element={<div className="container py-5 mt-5"><Register /></div>} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/doctors" element={<Doctors />} />
              
              {/* Services Routes */}
              <Route path="/services" element={<Services />} />
              <Route path="/services/cardiology" element={<Cardiology />} />
              <Route path="/services/neurology" element={<Neurology />} />
              <Route path="/services/orthopedics" element={<Orthopedics />} />
              <Route path="/services/pediatrics" element={<Pediatrics />} />
              <Route path="/services/gynecology" element={<Gynecology />} />
              <Route path="/services/dermatology" element={<Dermatology />} />
              <Route path="/services/test" element={<TestComponent />} />
              
              {/* Patient Routes */}
              <Route 
                path="/patient/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <div className="container py-5 mt-5">
                      <PatientDashboard />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/doctors" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <div className="container py-5 mt-5">
                      <DoctorList />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/doctors/:id" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <div className="container py-5 mt-5">
                      <DoctorDetails />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/book-appointment/:doctorId" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <div className="container py-5 mt-5">
                      <BookAppointment />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/appointments" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <div className="container py-5 mt-5">
                      <MyAppointments />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/patient/profile" 
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <div className="container py-5 mt-5">
                      <PatientProfile />
                    </div>
                  </ProtectedRoute>
                } 
              />
              
              {/* Doctor Routes */}
              <Route 
                path="/doctor/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <div className="container py-5 mt-5">
                      <DoctorDashboard />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor/appointments" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <div className="container py-5 mt-5">
                      <ManageAppointments />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor/availability" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <div className="container py-5 mt-5">
                      <ManageAvailability />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/doctor/profile" 
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <div className="container py-5 mt-5">
                      <DoctorProfile />
                    </div>
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <div className="container py-5 mt-5">
                      <Dashboard />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/doctors" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <div className="container py-5 mt-5">
                      <ManageDoctors />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <div className="container py-5 mt-5">
                      <ManageUsers />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/appointments" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <div className="container py-5 mt-5">
                      <AdminManageAppointments />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/reports" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <div className="container py-5 mt-5">
                      <Reports />
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/profile" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <div className="container py-5 mt-5">
                      <AdminProfile />
                    </div>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 