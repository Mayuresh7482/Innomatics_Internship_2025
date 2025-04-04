import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUtensils, FaClock, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaRegClock } from 'react-icons/fa';

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [claimLoading, setClaimLoading] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState(false);

  useEffect(() => {
    // For demo, create a mock donation
    // In a real app, fetch from API
    const fetchDonation = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockDonation = {
            id,
            foodType: 'Cooked Food - Rice and Curry',
            quantity: 'Serves 15 people',
            expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString(), // 3 hours from now
            createdAt: new Date().toISOString(),
            location: '123 Main St, Kothrud, Pune, Maharashtra 411038',
            description: 'Freshly prepared vegetarian food from our restaurant. Contains rice, dal, and mixed vegetable curry. Can feed approximately 15 people.',
            status: 'available',
            donor: {
              id: '123',
              name: 'Raj Restaurant',
              phone: '+91 9876543210',
              email: 'contact@rajrestaurant.com'
            },
            imageUrl: 'https://via.placeholder.com/800x400?text=Food+Donation'
          };
          setDonation(mockDonation);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load donation details');
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id]);

  const handleClaimDonation = async () => {
    setClaimLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setDonation({
          ...donation,
          status: 'claimed',
          claimedBy: {
            id: currentUser.id,
            name: currentUser.name || 'Your NGO',
            phone: currentUser.phone || '+91 1234567890'
          }
        });
        setClaimSuccess(true);
        setClaimLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to claim donation');
      setClaimLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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

  const getExpiryStatus = () => {
    if (!donation) return null;
    
    const expiryDate = new Date(donation.expiryDate);
    const now = new Date();
    const hoursLeft = Math.floor((expiryDate - now) / (1000 * 60 * 60));
    
    if (hoursLeft < 0) {
      return <Badge bg="danger">Expired</Badge>;
    } else if (hoursLeft < 3) {
      return <Badge bg="warning" text="dark">Expires soon: {hoursLeft}h left</Badge>;
    } else {
      return <Badge bg="info">Expires in {hoursLeft}h</Badge>;
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading donation details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (!donation) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Donation not found</Alert>
        <Button variant="outline-primary" onClick={() => navigate('/my-donations')}>
          View All Donations
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {claimSuccess && (
        <Alert variant="success" className="mb-4">
          <Alert.Heading>Donation Claimed Successfully!</Alert.Heading>
          <p>You have successfully claimed this donation. Please contact the donor to arrange pickup details.</p>
        </Alert>
      )}
      
      <Card className="shadow-sm border-0 mb-4">
        <Row className="g-0">
          <Col md={6}>
            <img 
              src={donation.imageUrl} 
              alt={donation.foodType} 
              className="img-fluid rounded-start" 
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="card-title mb-0">{donation.foodType}</h2>
                {getStatusBadge(donation.status)}
              </div>
              
              <p className="text-muted">
                <FaUtensils className="me-2" />
                Quantity: {donation.quantity}
              </p>
              
              <p className="d-flex align-items-center">
                <FaClock className="me-2 text-warning" />
                {getExpiryStatus()} | Expires: {formatDate(donation.expiryDate)}
              </p>
              
              <p className="d-flex align-items-start">
                <FaMapMarkerAlt className="me-2 mt-1 text-danger" />
                <span>{donation.location}</span>
              </p>
              
              <Card.Text className="mb-4 mt-3">
                <strong>Description:</strong><br />
                {donation.description}
              </Card.Text>
              
              <div className="border-top pt-3 mt-3">
                <h5>Donor Information</h5>
                <p className="mb-1"><strong>Name:</strong> {donation.donor.name}</p>
                <p className="mb-1"><strong>Contact:</strong> {donation.donor.phone}</p>
                <p><strong>Email:</strong> {donation.donor.email}</p>
              </div>
              
              {donation.status === 'available' && currentUser?.role === 'ngo' && (
                <div className="d-grid gap-2 mt-4">
                  <Button 
                    variant="success" 
                    size="lg" 
                    onClick={handleClaimDonation}
                    disabled={claimLoading}
                  >
                    {claimLoading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="me-2" />
                        Claim This Donation
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {donation.status === 'claimed' && donation.claimedBy && (
                <div className="mt-3 p-3 bg-light rounded">
                  <h5><FaCheckCircle className="text-success me-2" />Claimed by NGO</h5>
                  <p className="mb-1"><strong>Organization:</strong> {donation.claimedBy.name}</p>
                  <p className="mb-1"><strong>Contact:</strong> {donation.claimedBy.phone}</p>
                </div>
              )}
            </Card.Body>
          </Col>
        </Row>
      </Card>
      
      <div className="d-flex justify-content-between mt-4">
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        
        <Button variant="outline-primary" onClick={() => navigate('/my-donations')}>
          View All Donations
        </Button>
      </div>
    </Container>
  );
};

export default DonationDetails; 