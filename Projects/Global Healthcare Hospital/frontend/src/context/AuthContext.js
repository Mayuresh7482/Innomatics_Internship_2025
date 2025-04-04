import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the auth context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (token) {
        try {
          // In a real app, this would be an API call to verify the token
          // For now, we'll just get the user from localStorage
          const userStr = localStorage.getItem('user');
          if (userStr) {
            setCurrentUser(JSON.parse(userStr));
          }
        } catch (err) {
          // If token is invalid, clear it
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setCurrentUser(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, [token]);

  // Register user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      // Mock API response for development
      // In a real app, this would be an API call
      const mockResponse = {
        token: 'mock-token-' + Date.now(),
        user: {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          role: userData.role,
          phone: userData.phone || '',
          address: userData.address || '',
          // Additional fields for doctor
          specialization: userData.role === 'doctor' ? userData.specialization || 'General' : '',
          experience: userData.role === 'doctor' ? userData.experience || '0' : '',
          fees: userData.role === 'doctor' ? userData.fees || '0' : ''
        }
      };
      
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      setToken(mockResponse.token);
      setCurrentUser(mockResponse.user);
      setLoading(false);
      return mockResponse;
    } catch (err) {
      setError('Registration failed');
      setLoading(false);
      throw err;
    }
  };

  // Login user
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      // Mock API response for development
      // In a real app, this would be an API call
      
      // Mock users for testing
      const mockUsers = [
        {
          id: '1',
          name: 'Patient User',
          email: 'patient@example.com',
          password: 'password123',
          role: 'patient',
          phone: '123-456-7890',
          address: '123 Main St'
        },
        {
          id: '2',
          name: 'Doctor User',
          email: 'doctor@example.com',
          password: 'password123',
          role: 'doctor',
          phone: '123-456-7890',
          address: '456 Oak St',
          specialization: 'Cardiology',
          experience: '10',
          fees: '150'
        },
        {
          id: '3',
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'password123',
          role: 'admin',
          phone: '123-456-7890',
          address: '789 Pine St'
        }
      ];
      
      // Find user by email
      const user = mockUsers.find(user => user.email === credentials.email);
      
      // Check if user exists and password matches
      if (!user || user.password !== credentials.password) {
        throw new Error('Invalid credentials');
      }
      
      // Create mock response
      const mockResponse = {
        token: 'mock-token-' + Date.now(),
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
          specialization: user.specialization,
          experience: user.experience,
          fees: user.fees
        }
      };
      
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      setToken(mockResponse.token);
      setCurrentUser(mockResponse.user);
      setLoading(false);
      return mockResponse;
    } catch (err) {
      setError('Login failed');
      setLoading(false);
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setCurrentUser(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, this would be an API call
      // For now, we'll just update the user in localStorage
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      setLoading(false);
      return { data: updatedUser };
    } catch (err) {
      setError('Update failed');
      setLoading(false);
      throw err;
    }
  };

  // Update password
  const updatePassword = async (passwordData) => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, this would be an API call
      // For now, we'll just simulate a successful update
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError('Password update failed');
      setLoading(false);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        updatePassword,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 