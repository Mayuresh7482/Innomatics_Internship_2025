import React, { useState, useEffect, useContext } from 'react';
import { Container, ListGroup, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';
import { FaBell, FaCheck, FaTrash, FaExclamationTriangle } from 'react-icons/fa';

const Notifications = () => {
  const { currentUser } = useContext(AuthContext);
  const { markAllAsRead, deleteNotification } = useContext(NotificationContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Simulate API call
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
            },
            {
              id: '4',
              type: 'verification_approved',
              title: 'Verification Approved',
              message: 'Congratulations! Your NGO has been verified. You now have full access to all platform features.',
              isRead: false,
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
              relatedId: null,
              link: '/profile'
            },
            {
              id: '5',
              type: 'donation_expiring',
              title: 'Donation Expiring Soon',
              message: 'Your donation "Cooked Food - Rice and Curry" will expire in 3 hours. No NGO has claimed it yet.',
              isRead: true,
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
              relatedId: '1', // donation ID
              link: '/donations/1'
            }
          ];
          
          setNotifications(mockNotifications);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load notifications');
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAllAsRead = async () => {
    try {
      // In a real app, you would call API
      await markAllAsRead();
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({
          ...notification,
          isRead: true
        }))
      );
    } catch (err) {
      setError('Failed to mark notifications as read');
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      // In a real app, you would call API
      await deleteNotification(id);
      
      // Update local state
      setNotifications(prev => 
        prev.filter(notification => notification.id !== id)
      );
    } catch (err) {
      setError('Failed to delete notification');
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'donation_claimed':
        return <FaCheck className="text-success" />;
      case 'donation_completed':
        return <FaCheck className="text-primary" />;
      case 'new_donation':
        return <FaBell className="text-info" />;
      case 'verification_approved':
        return <FaCheck className="text-success" />;
      case 'donation_expiring':
        return <FaExclamationTriangle className="text-warning" />;
      default:
        return <FaBell className="text-secondary" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading notifications...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">
            Notifications 
            {unreadCount > 0 && (
              <Badge bg="danger" className="ms-2">{unreadCount}</Badge>
            )}
          </h2>
        </div>
        <Button 
          variant="outline-primary"
          onClick={handleMarkAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark All as Read
        </Button>
      </div>
      
      {notifications.length === 0 ? (
        <Alert variant="info">
          <p className="mb-0 text-center">You don't have any notifications yet.</p>
        </Alert>
      ) : (
        <ListGroup>
          {notifications.map(notification => (
            <ListGroup.Item 
              key={notification.id}
              className={notification.isRead ? '' : 'bg-light'}
              style={{ borderLeft: notification.isRead ? '' : '4px solid #0d6efd' }}
            >
              <div className="d-flex align-items-start">
                <div className="me-3 fs-4">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <h5>{notification.title}</h5>
                    <small className="text-muted">
                      {getTimeAgo(notification.createdAt)}
                    </small>
                  </div>
                  <p className="mb-1">{notification.message}</p>
                  <div className="d-flex mt-2">
                    <Link 
                      to={notification.link} 
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      View Details
                    </Link>
                    <Button 
                      variant="sm" 
                      size="sm" 
                      className="btn-outline-danger"
                      onClick={() => handleDeleteNotification(notification.id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                    
                    {!notification.isRead && (
                      <Button 
                        variant="sm" 
                        size="sm" 
                        className="btn-outline-secondary ms-2"
                        onClick={() => {
                          setNotifications(prev => 
                            prev.map(n => n.id === notification.id ? {...n, isRead: true} : n)
                          )
                        }}
                      >
                        <FaCheck /> Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Notifications; 