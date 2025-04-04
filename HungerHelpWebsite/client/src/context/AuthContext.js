import React, { createContext, useState, useEffect, useCallback } from 'react';

// Create the Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage - moved to a separate function for reuse
  const loadUserFromStorage = useCallback(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error loading user from storage:', err);
      localStorage.removeItem('user');
      setCurrentUser(null);
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const checkLoggedIn = async () => {
      try {
        const success = loadUserFromStorage();
        if (!success) {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Token validation error:', err);
        localStorage.removeItem('user');
        setCurrentUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, [loadUserFromStorage]);

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    
    try {
      // Mock successful login for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Determine user role based on email for demo
      const role = email.includes('ngo') ? 'ngo' : email.includes('admin') ? 'admin' : 'donor';
      
      const userData = {
        id: '123456',
        name: role === 'ngo' ? 'Helping Hands Foundation' : role === 'admin' ? 'Admin User' : 'Mayuresh Mukund Borate',
        email,
        role,
        token: 'mock-jwt-token',
        // Add other user properties
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      setCurrentUser(userData);
      setIsAuthenticated(true);
      setError('');
      
      return userData;
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError('');
    
    try {
      // Mock successful registration for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // If no name provided, use default names based on role
      const defaultName = userData.role === 'ngo' 
        ? 'Helping Hands Foundation' 
        : userData.role === 'admin' 
          ? 'Admin User' 
          : 'Mayuresh Mukund Borate';
      
      const newUser = {
        id: '123456',
        name: userData.name || defaultName,
        email: userData.email,
        role: userData.role || 'donor',
        token: 'mock-jwt-token',
        // Add other user properties
      };
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      setError('');
      
      return newUser;
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = async (userData) => {
    setLoading(true);
    setError('');
    
    try {
      console.log('Updating user with data:', userData);
      
      // Skip the timeout/mock API call for better performance when only 
      // wanting to update the state without backend sync
      // await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If only partial data provided, merge with current user data
      const updatedUser = {
        ...currentUser,
        ...userData
      };
      
      // Update localStorage - do this first to ensure data is saved
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Then update state
      setCurrentUser(updatedUser);
      setError('');
      
      return updatedUser;
    } catch (err) {
      setError(err.message || 'Failed to update profile. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Force refresh user data from localStorage
  const refreshUserData = () => {
    console.log('Refreshing user data from storage');
    loadUserFromStorage();
  };

  const value = {
    currentUser,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    refreshUserData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 