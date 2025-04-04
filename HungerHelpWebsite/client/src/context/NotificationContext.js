import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

// Create the Notification Context
export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    if (currentUser) {
      // Load notifications
      fetchNotifications();
    } else {
      // Clear notifications if logged out
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [currentUser]);
  
  const fetchNotifications = async () => {
    try {
      // In a real app, you would fetch from API
      // const response = await fetch('/api/notifications', {
      //   headers: {
      //     'Authorization': `Bearer ${currentUser.token}`
      //   }
      // });
      // const data = await response.json();
      // setNotifications(data.notifications);
      // setUnreadCount(data.notifications.filter(n => !n.isRead).length);
      
      // For demo, create mock notifications after a delay
      setTimeout(() => {
        const mockNotifications = [
          {
            id: '1',
            type: 'donation_claimed',
            title: 'Donation Claimed',
            message: 'Your food donation "Cooked Food - Rice and Curry" has been claimed by Helping Hands Foundation.',
            isRead: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
            relatedId: '1', // donation ID
            link: '/donations/1'
          },
          {
            id: '2',
            type: 'donation_completed',
            title: 'Donation Completed',
            message: 'The pickup for your donation "Packaged Food - Biscuits and Snacks" has been completed. Thank you for your contribution!',
            isRead: true,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
            relatedId: '2', // donation ID
            link: '/donations/2'
          },
          {
            id: '3',
            type: 'new_donation',
            title: 'New Donation Available',
            message: 'A new donation "Fresh Fruits - Apples and Bananas" is available near your location.',
            isRead: false,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
            relatedId: '4', // donation ID
            link: '/donations/4'
          }
        ];
        
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };
  
  const markAsRead = async (notificationId) => {
    try {
      // In a real app, you would call API
      // await fetch(`/api/notifications/${notificationId}/read`, {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${currentUser.token}`
      //   }
      // });
      
      // Update local state
      const updatedNotifications = notifications.map(notification => {
        if (notification.id === notificationId) {
          return { ...notification, isRead: true };
        }
        return notification;
      });
      
      setNotifications(updatedNotifications);
      setUnreadCount(updatedNotifications.filter(n => !n.isRead).length);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
      throw error;
    }
  };
  
  const markAllAsRead = async () => {
    try {
      // In a real app, you would call API
      // await fetch('/api/notifications/read-all', {
      //   method: 'PUT',
      //   headers: {
      //     'Authorization': `Bearer ${currentUser.token}`
      //   }
      // });
      
      // Update local state
      const updatedNotifications = notifications.map(notification => ({
        ...notification,
        isRead: true
      }));
      
      setNotifications(updatedNotifications);
      setUnreadCount(0);
      
      return Promise.resolve(); // Simulate successful API call
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
      throw error;
    }
  };
  
  const deleteNotification = async (notificationId) => {
    try {
      // In a real app, you would call API
      // await fetch(`/api/notifications/${notificationId}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${currentUser.token}`
      //   }
      // });
      
      // Update local state
      const updatedNotifications = notifications.filter(
        notification => notification.id !== notificationId
      );
      
      setNotifications(updatedNotifications);
      setUnreadCount(updatedNotifications.filter(n => !n.isRead).length);
      
      return Promise.resolve(); // Simulate successful API call
    } catch (error) {
      console.error('Failed to delete notification:', error);
      throw error;
    }
  };
  
  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(), // Generate a temporary ID
      isRead: false,
      createdAt: new Date().toISOString()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };
  
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        addNotification,
        fetchNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}; 