import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaPlus, FaClipboardList, FaTruck, FaUtensils, FaUsers, FaCheckCircle, FaInfoCircle, FaMapMarkerAlt, FaBell, FaChartLine, FaUserPlus } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { placeholders } from '../utils/generatePlaceholderImages';

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    donations: [],
    stats: {
      totalDonations: 0,
      pendingPickups: 0,
      inTransit: 0,
      delivered: 0,
      totalPeopleServed: 0
    }
  });

  // Get message from location state (if any)
  const message = location.state?.message;
  const messageType = location.state?.messageType || 'success';

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Using mock data instead of real API calls for demo purposes
        setTimeout(() => {
          // Force currentUser refresh from localStorage to ensure latest data
          const freshUserData = JSON.parse(localStorage.getItem('user'));
          if (freshUserData) {
            // Update the current user context if needed
            if (JSON.stringify(freshUserData) !== JSON.stringify(currentUser)) {
              // This would trigger a re-render with updated user data
              console.log("Updating user data from localStorage");
            }
          }
          
          const mockData = generateMockData(currentUser?.role || 'donor');
          setDashboardData(mockData);
          setLoading(false);
        }, 1500);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  // Function to generate mock data based on user type
  const generateMockData = (userType) => {
    // Common mock donations
    const mockDonations = [
      {
        _id: '1',
        title: 'Restaurant Surplus Food',
        foodType: 'Cooked Meals',
        quantity: '30 meals',
        servesHowMany: 30,
        expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
        location: 'Kothrud, Pune',
        status: 'available',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        imageUrl: placeholders.foodDonation,
        donor: {
          name: 'Green Valley Restaurant',
          contact: '+91 98765 43210'
        },
        assignedNGO: null
      },
      {
        _id: '2',
        title: 'Wedding Party Leftovers',
        foodType: 'Desserts and Sweets',
        quantity: '15 kg',
        servesHowMany: 50,
        expiryDate: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
        location: 'Koregaon Park, Pune',
        status: 'assigned',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        imageUrl: placeholders.foodDonation,
        donor: {
          name: 'Royal Celebrations',
          contact: '+91 87654 32109'
        },
        assignedNGO: {
          name: 'Akshaya Patra Foundation',
          contact: '+91 20 2546 7890'
        }
      },
      {
        _id: '3',
        title: 'Fresh Vegetables',
        foodType: 'Vegetables',
        quantity: '25 kg',
        servesHowMany: 40,
        expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        location: 'Hadapsar, Pune',
        status: 'picked',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        imageUrl: placeholders.foodDonation,
        donor: {
          name: 'Fresh Farms Market',
          contact: '+91 76543 21098'
        },
        assignedNGO: {
          name: 'Pune Food Bank',
          contact: '+91 20 2447 8910'
        }
      },
      {
        _id: '4',
        title: 'Packaged Food Items',
        foodType: 'Packaged Food',
        quantity: '50 packages',
        servesHowMany: 50,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        location: 'Shivaji Nagar, Pune',
        status: 'delivered',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        imageUrl: placeholders.foodDonation,
        donor: {
          name: 'Grocery Wholesale',
          contact: '+91 65432 10987'
        },
        assignedNGO: {
          name: 'Robin Hood Army Pune',
          contact: '+91 99765 43210'
        }
      }
    ];

    if (userType === 'donor') {
      return {
        donations: mockDonations,
        stats: {
          totalDonations: 15,
          pendingPickups: 3,
          inTransit: 2,
          delivered: 10,
          totalPeopleServed: 450
        }
      };
    } else if (userType === 'ngo') {
      return {
        donations: mockDonations,
        stats: {
          availableDonations: 8,
          assignedToYou: 3,
          inTransit: 2,
          delivered: 12,
          totalPeopleServed: 750
        }
      };
    } else {
      // Admin
      return {
        donations: mockDonations,
        stats: {
          totalDonations: 35,
          totalNGOs: 12,
          totalDonors: 18,
          pendingVerifications: 4,
          totalPeopleServed: 1250
        }
      };
    }
  };

  // Display different stats based on user type
  const renderStats = () => {
    if (!dashboardData.stats) return null;
    const stats = dashboardData.stats;

    // Different stats cards based on user type
    if (currentUser?.role === 'donor') {
      return (
        <Row className="stats-row mb-4">
          <Col md={3} sm={6} className="mb-3">
            <Card className="dashboard-card text-center h-100">
              <Card.Body>
                <div className="icon-wrapper">
                  <FaClipboardList className="stats-icon text-primary" size={28} />
                </div>
                <h2 className="counter">{stats.totalDonations || 0}</h2>
                <Card.Text className="stats-label">Total Donations</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="dashboard-card text-center h-100">
              <Card.Body>
                <div className="icon-wrapper">
                  <FaPlus className="stats-icon text-warning" size={28} />
                </div>
                <h2 className="counter">{stats.pendingPickups || 0}</h2>
                <Card.Text className="stats-label">Pending Pickups</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="dashboard-card text-center h-100">
              <Card.Body>
                <div className="icon-wrapper">
                  <FaTruck className="stats-icon text-info" size={28} />
                </div>
                <h2 className="counter">{stats.inTransit || 0}</h2>
                <Card.Text className="stats-label">In Transit</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="dashboard-card text-center h-100">
              <Card.Body>
                <div className="icon-wrapper">
                  <FaUsers className="stats-icon text-success" size={28} />
                </div>
                <h2 className="counter">{stats.totalPeopleServed || 0}</h2>
                <Card.Text className="stats-label">People Served</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
    } else if (currentUser?.role === 'ngo') {
      return (
        <Row className="stats-row mb-4">
          <Col md={3} sm={6} className="mb-3">
            <Card className="dashboard-card text-center h-100">
              <Card.Body>
                <div className="icon-wrapper">
                  <FaClipboardList className="stats-icon text-primary" size={28} />
                </div>
                <h2 className="counter">{stats.availableDonations || 0}</h2>
                <Card.Text className="stats-label">Available Donations</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="dashboard-card text-center h-100">
              <Card.Body>
                <div className="icon-wrapper">
                  <FaPlus className="stats-icon text-warning" size={28} />
                </div>
                <h2 className="counter">{stats.assignedToYou || 0}</h2>
                <Card.Text className="stats-label">Assigned to You</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="dashboard-card text-center h-100">
              <Card.Body>
                <div className="icon-wrapper">
                  <FaTruck className="stats-icon text-info" size={28} />
                </div>
                <h2 className="counter">{stats.inTransit || 0}</h2>
                <Card.Text className="stats-label">In Transit</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="dashboard-card text-center h-100">
              <Card.Body>
                <div className="icon-wrapper">
                  <FaUtensils className="stats-icon text-success" size={28} />
                </div>
                <h2 className="counter">{stats.totalPeopleServed || 0}</h2>
                <Card.Text className="stats-label">People Served</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
    } else {
      // Admin view
      return (
        <Row className="stats-row mb-4">
          <Col md={3} sm={6} className="mb-3">
            <Card className="dashboard-card text-center h-100">
              <Card.Body>
                <div className="icon-wrapper">
                  <FaClipboardList className="stats-icon text-primary" size={28} />
                </div>
                <h2 className="counter">{stats.totalDonations || 0}</h2>
                <Card.Text className="stats-label">Total Donations</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="dashboard-card text-center h-100">
              <Card.Body>
                <div className="icon-wrapper">
                  <FaUsers className="stats-icon text-info" size={28} />
                </div>
                <h2 className="counter">{stats.totalNGOs || 0}</h2>
                <Card.Text className="stats-label">Total NGOs</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="dashboard-card text-center h-100">
              <Card.Body>
                <div className="icon-wrapper">
                  <FaUsers className="stats-icon text-warning" size={28} />
                </div>
                <h2 className="counter">{stats.totalDonors || 0}</h2>
                <Card.Text className="stats-label">Total Donors</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6} className="mb-3">
            <Card className="dashboard-card text-center h-100">
              <Card.Body>
                <div className="icon-wrapper">
                  <FaUsers className="stats-icon text-success" size={28} />
                </div>
                <h2 className="counter">{stats.totalPeopleServed || 0}</h2>
                <Card.Text className="stats-label">People Served</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <Badge bg="primary">Available</Badge>;
      case 'assigned':
        return <Badge bg="warning">Assigned</Badge>;
      case 'picked':
        return <Badge bg="info">In Transit</Badge>;
      case 'delivered':
        return <Badge bg="success">Delivered</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  // Format date to a readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if date is expired
  const isExpired = (dateString) => {
    return new Date(dateString) < new Date();
  };

  // Render recent donations
  const renderRecentDonations = () => {
    if (!dashboardData.donations || dashboardData.donations.length === 0) {
      return (
        <Card className="dashboard-card mb-4">
          <Card.Body className="text-center py-5">
            <FaInfoCircle className="text-muted mb-3" size={32} />
            <h5>No recent donations found</h5>
            <p className="text-muted">
              {currentUser?.role === 'donor' 
                ? "You haven't made any donations yet." 
                : "No donations are currently available."}
            </p>
            {currentUser?.role === 'donor' && (
              <Button as={Link} to="/donate" variant="primary">
                <FaPlus className="me-2" /> Make a Donation
              </Button>
            )}
          </Card.Body>
        </Card>
      );
    }

    return (
      <div className="donations-container">
        {dashboardData.donations.map((donation) => (
          <Card key={donation._id || Math.random().toString()} className="dashboard-card mb-3">
            <Card.Body>
              <Row className="align-items-center g-3">
                <Col md={3} sm={12}>
                  <img 
                    src={donation.imageUrl || placeholders.foodDonation} 
                    alt={donation.foodType || 'Food Donation'} 
                    className="img-fluid rounded w-100"
                    style={{ height: '120px', objectFit: 'cover' }}
                  />
                </Col>
                <Col md={6} sm={8}>
                  <h5 className="mb-2">{donation.foodType || 'Food Donation'}</h5>
                  <p className="text-muted small mb-2">
                    <span className="me-2 badge bg-light text-dark">{donation.quantity || 'N/A'}</span> 
                    <span className={`badge ${isExpired(donation.expiryDate) ? 'bg-danger' : 'bg-success'}`}>
                      Expires: {donation.expiryDate ? formatDate(donation.expiryDate) : 'N/A'}
                    </span>
                  </p>
                  <p className="mb-2">
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    <span className="text-light">{donation.location || 'Location not specified'}</span>
                  </p>
                  <div className="mt-2">
                    {getStatusBadge(donation.status || 'unknown')}
                  </div>
                </Col>
                <Col md={3} sm={4} className="d-flex flex-column justify-content-between align-items-md-end align-items-start">
                  <small className="text-light">Created: {donation.createdAt ? formatDate(donation.createdAt) : 'N/A'}</small>
                  <Button 
                    as={Link} 
                    to={`/donations/${donation._id || '0'}`} 
                    variant="outline-primary" 
                    size="sm"
                    className="mt-2 w-100 w-md-auto"
                  >
                    View Details
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
        <div className="text-center mt-4">
          <Button as={Link} to="/my-donations" variant="outline-primary" className="px-4">
            View All Donations
          </Button>
        </div>
      </div>
    );
  };

  // Mock function for Activity Feed
  const renderActivityFeed = () => {
    return (
      <Card className="dashboard-card h-100">
        <Card.Body>
          <div className="activity-feed">
            <div className="activity-item">
              <div className="activity-icon bg-primary text-white">
                <FaCheckCircle />
              </div>
              <div className="ms-3 flex-grow-1">
                <p className="mb-1">Your donation of "Restaurant Surplus Food" was picked up</p>
                <small className="text-muted">2 hours ago</small>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon bg-success text-white">
                <FaPlus />
              </div>
              <div className="ms-3 flex-grow-1">
                <p className="mb-1">You created a new donation "Wedding Party Leftovers"</p>
                <small className="text-muted">5 hours ago</small>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon bg-info text-white">
                <FaBell />
              </div>
              <div className="ms-3 flex-grow-1">
                <p className="mb-1">Akshaya Patra Foundation claimed your donation</p>
                <small className="text-muted">1 day ago</small>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  // Mock function for Impact Summary
  const renderImpactSummary = () => {
    return (
      <Card className="dashboard-card h-100">
        <Card.Body>
          <Row className="g-4">
            <Col md={6} className="mb-3 mb-md-0">
              <div className="text-center p-3 rounded" style={{ backgroundColor: 'rgba(83, 144, 217, 0.15)' }}>
                <h3 className="counter">{currentUser?.role === 'donor' ? 450 : 750}</h3>
                <p className="mb-0 stats-label">People Fed</p>
              </div>
            </Col>
            <Col md={6}>
              <div className="text-center p-3 rounded" style={{ backgroundColor: 'rgba(75, 181, 67, 0.15)' }}>
                <h3 className="counter">{currentUser?.role === 'donor' ? 120 : 250}</h3>
                <p className="mb-0 stats-label">Kg Food Saved</p>
              </div>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <p>You've made a significant impact in fighting hunger and reducing food waste!</p>
          </div>
        </Card.Body>
      </Card>
    );
  };

  // Mock function for Recent Signups (Admin)
  const renderRecentSignups = () => {
    return (
      <Card className="dashboard-card">
        <Card.Body>
          <div className="recent-signup-item d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
            <div className="d-flex align-items-center">
              <div className="signup-icon bg-primary text-white rounded-circle p-2 me-3">
                <FaUserPlus />
              </div>
              <div>
                <h6 className="mb-0">Green Earth NGO</h6>
                <small className="text-muted">NGO • Joined 2 hours ago</small>
              </div>
            </div>
            <Button size="sm" variant="outline-primary">View Details</Button>
          </div>
          <div className="recent-signup-item d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
            <div className="d-flex align-items-center">
              <div className="signup-icon bg-warning text-white rounded-circle p-2 me-3">
                <FaUserPlus />
              </div>
              <div>
                <h6 className="mb-0">Spice Garden Restaurant</h6>
                <small className="text-muted">Donor • Joined 1 day ago</small>
              </div>
            </div>
            <Button size="sm" variant="outline-primary">View Details</Button>
          </div>
          <div className="recent-signup-item d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="signup-icon bg-info text-white rounded-circle p-2 me-3">
                <FaUserPlus />
              </div>
              <div>
                <h6 className="mb-0">Food For All Foundation</h6>
                <small className="text-muted">NGO • Joined 2 days ago</small>
              </div>
            </div>
            <Button size="sm" variant="outline-primary">View Details</Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  // Mock function for Site Analytics (Admin)
  const renderSiteAnalytics = () => {
    return (
      <Card className="dashboard-card">
        <Card.Body>
          <Row>
            <Col md={4} className="text-center mb-3 mb-md-0">
              <div className="analytics-icon mb-2">
                <FaChartLine className="text-primary" size={24} />
              </div>
              <h5>86%</h5>
              <p className="text-muted mb-0">Donation Success Rate</p>
            </Col>
            <Col md={4} className="text-center mb-3 mb-md-0">
              <div className="analytics-icon mb-2">
                <FaUsers className="text-info" size={24} />
              </div>
              <h5>+24%</h5>
              <p className="text-muted mb-0">User Growth</p>
            </Col>
            <Col md={4} className="text-center">
              <div className="analytics-icon mb-2">
                <FaTruck className="text-success" size={24} />
              </div>
              <h5>92%</h5>
              <p className="text-muted mb-0">On-time Delivery</p>
            </Col>
          </Row>
          <div className="text-center mt-3">
            <Button variant="outline-primary" size="sm">View Full Report</Button>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Container fluid className="dashboard-container py-4">
      <div className="dashboard-header">
        <div>
          <h1 className="website-title">Hunger Help</h1>
          <h2>Welcome, {currentUser?.name || 'Guest'}!</h2>
        </div>
        {currentUser?.role === 'donor' && (
          <Button as={Link} to="/donate" variant="primary" className="mt-3 mt-md-0">
            <FaPlus className="me-2" /> Make a Donation
          </Button>
        )}
      </div>
      
      <div className="dashboard-stats">
        {renderStats()}
      </div>

      {/* Show message if redirected with a message */}
      {message && (
        <Alert variant={messageType || 'info'} className="mb-4">
          {message}
        </Alert>
      )}
      
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading your dashboard...</p>
        </div>
      ) : error ? (
        <Alert variant="danger">
          <FaInfoCircle className="me-2" />
          {error}
        </Alert>
      ) : (
        <>
          {/* Recent Donations */}
          <div className="dashboard-section">
            <h4 className="dashboard-section-title">Recent Donations</h4>
            {renderRecentDonations()}
          </div>
          
          {/* Activity Feed Section - Single column for better centering */}
          {currentUser?.role !== 'admin' && (
            <div className="dashboard-section">
              <h4 className="dashboard-section-title">Recent Activity</h4>
              {renderActivityFeed()}
            </div>
          )}
          
          {/* Impact Summary Section */}
          {(currentUser?.role === 'donor' || currentUser?.role === 'ngo') && (
            <div className="dashboard-section">
              <h4 className="dashboard-section-title">Your Impact</h4>
              {renderImpactSummary()}
            </div>
          )}
          
          {/* Admin Dashboard Sections */}
          {currentUser?.role === 'admin' && (
            <>
              <div className="dashboard-section">
                <h4 className="dashboard-section-title">Recent Signups</h4>
                {renderRecentSignups()}
              </div>
              
              <div className="dashboard-section">
                <h4 className="dashboard-section-title">Site Analytics</h4>
                {renderSiteAnalytics()}
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Dashboard; 