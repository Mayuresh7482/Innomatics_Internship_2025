import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Alert, Spinner, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaCheckCircle, FaHistory, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';

const NGODetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // For demo, create a mock NGO
    // In a real app, fetch from API
    const fetchNGO = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const mockNGO = {
            id,
            name: 'Helping Hands Foundation',
            description: 'Working to eliminate hunger and food waste in urban areas by connecting excess food from restaurants to those in need.',
            mission: 'Our mission is to create sustainable food sharing systems that benefit both communities in need and the environment. We believe that no one should go hungry while food goes to waste.',
            vision: 'A world where food waste is minimized and everyone has access to nutritious meals, regardless of their economic situation.',
            foundedYear: 2012,
            location: 'Pune, Maharashtra',
            categories: ['Food Distribution', 'Hunger Relief', 'Environmental Sustainability'],
            phone: '+91 9876543210',
            email: 'contact@helpinghands.org',
            website: 'https://helpinghands.org',
            socialMedia: {
              facebook: 'https://facebook.com/helpinghandsfoundation',
              twitter: 'https://twitter.com/helpinghands',
              instagram: 'https://instagram.com/helpinghandsfoundation'
            },
            isVerified: true,
            imageUrl: 'https://via.placeholder.com/1200x400?text=Helping+Hands+Foundation',
            logoUrl: 'https://via.placeholder.com/200x200?text=HHF',
            teamMembers: [
              { name: 'Ananya Sharma', role: 'Founder & CEO', imageUrl: 'https://via.placeholder.com/100x100?text=AS' },
              { name: 'Raj Mehta', role: 'Operations Director', imageUrl: 'https://via.placeholder.com/100x100?text=RM' },
              { name: 'Priya Verma', role: 'Community Outreach', imageUrl: 'https://via.placeholder.com/100x100?text=PV' }
            ],
            achievements: [
              'Distributed over 500,000 meals since inception',
              'Reduced food waste by 120 tons in 2022',
              'Partnered with 50+ restaurants and food businesses',
              'Awarded "Best Social Impact NGO" in 2021'
            ],
            currentProjects: [
              {
                name: 'School Meal Program',
                description: 'Providing nutritious lunches to underprivileged schools',
              },
              {
                name: 'Restaurant Food Rescue',
                description: 'Daily collection of excess food from partner restaurants',
              },
              {
                name: 'Community Kitchen',
                description: 'Operating a community kitchen that serves 200+ people daily',
              }
            ],
            donationNeeds: [
              'Non-perishable food items',
              'Fresh produce and grains',
              'Cooking equipment',
              'Refrigeration units',
              'Packaging materials'
            ]
          };
          setNgo(mockNGO);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to load NGO details');
        setLoading(false);
      }
    };

    fetchNGO();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading NGO details...</p>
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

  if (!ngo) {
    return (
      <Container className="py-5">
        <Alert variant="warning">NGO not found</Alert>
        <Button variant="outline-primary" onClick={() => navigate('/ngos')}>
          View All NGOs
        </Button>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="position-relative mb-5">
        <img 
          src={ngo.imageUrl} 
          alt={ngo.name} 
          className="w-100" 
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'rgba(0,0,0,0.6)' }}>
          <Container>
            <Row className="align-items-center">
              <Col md={2} className="text-center text-md-start">
                <img 
                  src={ngo.logoUrl} 
                  alt={`${ngo.name} logo`} 
                  className="rounded-circle border border-3 border-white" 
                  width="100"
                  height="100"
                />
              </Col>
              <Col md={8} className="text-white">
                <div className="d-flex align-items-center mb-2">
                  <h1 className="mb-0 me-3">{ngo.name}</h1>
                  {ngo.isVerified && (
                    <Badge bg="success" className="d-flex align-items-center">
                      <FaCheckCircle className="me-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="lead mb-0">{ngo.description}</p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <Container className="py-4 mb-5">
        <Row>
          <Col md={8}>
            <Tabs defaultActiveKey="about" className="mb-4">
              <Tab eventKey="about" title="About">
                <Card>
                  <Card.Body>
                    <h4>Our Mission</h4>
                    <p>{ngo.mission}</p>
                    
                    <h4 className="mt-4">Our Vision</h4>
                    <p>{ngo.vision}</p>
                    
                    <h4 className="mt-4">
                      <FaHistory className="me-2" />
                      Our Story
                    </h4>
                    <p>
                      Founded in {ngo.foundedYear}, {ngo.name} has been at the forefront of 
                      connecting food resources with communities in need. What started as a small 
                      initiative has grown into a comprehensive food donation and distribution network.
                    </p>
                    
                    <h4 className="mt-4">
                      <FaHandHoldingHeart className="me-2" />
                      Achievements
                    </h4>
                    <ListGroup variant="flush">
                      {ngo.achievements.map((achievement, index) => (
                        <ListGroup.Item key={index}>{achievement}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="projects" title="Current Projects">
                <Card>
                  <Card.Body>
                    <h4 className="mb-4">Active Initiatives</h4>
                    {ngo.currentProjects.map((project, index) => (
                      <div key={index} className="mb-4 pb-3 border-bottom">
                        <h5>{project.name}</h5>
                        <p>{project.description}</p>
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              </Tab>
              <Tab eventKey="team" title="Our Team">
                <Card>
                  <Card.Body>
                    <h4 className="mb-4">
                      <FaUsers className="me-2" />
                      Team Members
                    </h4>
                    <Row xs={1} md={3} className="g-4">
                      {ngo.teamMembers.map((member, index) => (
                        <Col key={index}>
                          <Card className="text-center h-100 border-0 shadow-sm">
                            <Card.Img 
                              variant="top" 
                              src={member.imageUrl} 
                              className="rounded-circle mx-auto mt-3" 
                              style={{ width: '100px', height: '100px' }}
                            />
                            <Card.Body>
                              <Card.Title>{member.name}</Card.Title>
                              <Card.Text className="text-muted">{member.role}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
          </Col>
          
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Contact Information</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaMapMarkerAlt className="me-3 text-primary" />
                    <span>{ngo.location}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaPhone className="me-3 text-primary" />
                    <span>{ngo.phone}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaEnvelope className="me-3 text-primary" />
                    <a href={`mailto:${ngo.email}`}>{ngo.email}</a>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaGlobe className="me-3 text-primary" />
                    <a href={ngo.website} target="_blank" rel="noopener noreferrer">
                      {ngo.website.replace('https://', '')}
                    </a>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            
            <Card className="mb-4 shadow-sm">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">Donation Needs</h5>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {ngo.donationNeeds.map((need, index) => (
                    <ListGroup.Item key={index}>{need}</ListGroup.Item>
                  ))}
                </ListGroup>
                
                <div className="d-grid gap-2 mt-3">
                  <Button variant="success" size="lg">
                    Donate Food
                  </Button>
                </div>
              </Card.Body>
            </Card>
            
            <Card className="shadow-sm">
              <Card.Header>
                <h5 className="mb-0">Categories</h5>
              </Card.Header>
              <Card.Body>
                <div>
                  {ngo.categories.map(category => (
                    <Badge
                      key={category}
                      bg="light"
                      text="dark"
                      className="me-2 mb-2 p-2"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NGODetails; 