import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Badge, Button, Tab, Nav, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUtensils, FaClock, FaMapMarkerAlt, FaCheck, FaTimesCircle, FaPlus } from 'react-icons/fa';

const MyDonations = () => {
  const { currentUser } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeKey, setActiveKey] = useState('active');

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock data
          const mockDonations = [
            {
              id: '1',
              foodType: 'Cooked Food - Rice and Curry',
              quantity: 'Serves 15 people',
              expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(), // 3 hours from now
              createdAt: new Date().toISOString(),
              location: '123 Main St, Kothrud, Pune',
              status: 'available',
              imageUrl: 'https://via.placeholder.com/300x200?text=Food+Donation+1'
            },
            {
              id: '2',
              foodType: 'Packaged Food - Biscuits and Snacks',
              quantity: '10 packets',
              expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days from now
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
              location: '456 Park Ave, Koregaon Park, Pune',
              status: 'claimed',
              claimedBy: {
                id: 'ngo1',
                name: 'Helping Hands NGO',
                phone: '+91 9876543210'
              },
              imageUrl: 'https://via.placeholder.com/300x200?text=Food+Donation+2'
            },
            {
              id: '3',
              foodType: 'Grains - Rice and Wheat',
              quantity: '25 kg',
              expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(), // 30 days from now
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
              location: '789 Food St, Shivaji Nagar, Pune',
              status: 'completed',
              claimedBy: {
                id: 'ngo2',
                name: 'Food For All',
                phone: '+91 8765432109'
              },
              imageUrl: 'https://via.placeholder.com/300x200?text=Food+Donation+3'
            },
            {
              id: '4',
              foodType: 'Fresh Fruits - Apples and Bananas',
              quantity: '15 kg',
              expiryDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
              createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(), // 7 days ago
              location: '101 Fruit Market, Hadapsar, Pune',
              status: 'expired',
              imageUrl: 'https://via.placeholder.com/300x200?text=Food+Donation+4'
            }
          ];
          
          setDonations(mockDonations);
          setLoading(false);
        }, 1500);
      } catch (err) {
        setError('Failed to load your donations');
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <Badge bg="success">Available</Badge>;
      case 'claimed':
        return <Badge bg="info">Claimed</Badge>;
      case 'completed':
        return <Badge bg="primary">Completed</Badge>;
      case 'expired':
        return <Badge bg="danger">Expired</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const filteredDonations = () => {
    switch (activeKey) {
      case 'active':
        return donations.filter(d => ['available', 'claimed'].includes(d.status));
      case 'completed':
        return donations.filter(d => d.status === 'completed');
      case 'expired':
        return donations.filter(d => d.status === 'expired');
      default:
        return donations;
    }
  };

  const renderDonationCards = () => {
    const filtered = filteredDonations();
    
    if (filtered.length === 0) {
      return (
        <Alert variant="info" className="text-center my-4">
          No donations found in this category.
        </Alert>
      );
    }
    
    return (
      <Row xs={1} md={2} className="g-4">
        {filtered.map(donation => (
          <Col key={donation.id}>
            <Card className="h-100 shadow-sm hover-shadow">
              <div className="position-relative">
                <Card.Img 
                  variant="top" 
                  src={donation.imageUrl} 
                  alt={donation.foodType}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="position-absolute top-0 end-0 m-2">
                  {getStatusBadge(donation.status)}
                </div>
              </div>
              <Card.Body>
                <Card.Title className="mb-2 h5">{donation.foodType}</Card.Title>
                <Card.Text as="div" className="small text-muted mb-3">
                  <div className="mb-2">
                    <FaUtensils className="me-2" />
                    {donation.quantity}
                  </div>
                  <div className="mb-2">
                    <FaClock className="me-2" />
                    Expires: {formatDate(donation.expiryDate)}
                  </div>
                  <div>
                    <FaMapMarkerAlt className="me-2" />
                    {donation.location}
                  </div>
                </Card.Text>
                
                {donation.status === 'claimed' && donation.claimedBy && (
                  <div className="mt-2 p-2 bg-light rounded small">
                    <p className="mb-1">
                      <FaCheck className="text-success me-1" />
                      <strong>Claimed by:</strong> {donation.claimedBy.name}
                    </p>
                  </div>
                )}
                
                <div className="d-grid gap-2 mt-3">
                  <Link 
                    to={`/donations/${donation.id}`} 
                    className="btn btn-outline-primary"
                  >
                    View Details
                  </Link>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted small">
                <div className="d-flex justify-content-between">
                  <span>Posted: {formatDate(donation.createdAt)}</span>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading your donations...</p>
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
        <h2 className="mb-0">My Donations</h2>
        <Link to="/donate" className="btn btn-primary">
          <FaPlus className="me-2" />
          New Donation
        </Link>
      </div>
      
      <Tab.Container activeKey={activeKey} onSelect={k => setActiveKey(k)}>
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="active">Active Donations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="completed">Completed</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="expired">Expired</Nav.Link>
          </Nav.Item>
        </Nav>
        
        <Tab.Content>
          <Tab.Pane eventKey={activeKey}>
            {renderDonationCards()}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      
      {donations.length === 0 && (
        <div className="text-center py-5">
          <h5 className="text-muted mb-4">You haven't made any donations yet</h5>
          <Link to="/donate" className="btn btn-primary btn-lg">
            <FaPlus className="me-2" />
            Create Your First Donation
          </Link>
        </div>
      )}
    </Container>
  );
};

export default MyDonations; 