import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFilter, FaCheckCircle } from 'react-icons/fa';
import { placeholders } from '../utils/generatePlaceholderImages';

const NGOList = () => {
  const [ngos, setNgos] = useState([]);
  const [filteredNgos, setFilteredNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    verifiedOnly: false,
    location: '',
    category: ''
  });

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock data - Pune specific NGOs
          const mockNGOs = [
            {
              id: '1',
              name: 'Akshaya Patra Foundation - Pune Chapter',
              description: 'Serving mid-day meals to school children and running community kitchens in Pune\'s underprivileged areas, focusing on sustainable food solutions.',
              location: 'Kothrud, Pune',
              categories: ['Food Distribution', 'Children Welfare', 'Education'],
              phone: '+91 20 2546 7890',
              email: 'pune@akshayapatra.org',
              website: 'https://www.akshayapatra.org',
              isVerified: true,
              imageUrl: placeholders.ngoLogo
            },
            {
              id: '2',
              name: 'Robin Hood Army Pune',
              description: 'A volunteer-based zero-funds organization that collects surplus food from restaurants and distributes it to the less fortunate across Pune city.',
              location: 'Koregaon Park, Pune',
              categories: ['Food Rescue', 'Volunteer-driven', 'Zero Waste'],
              phone: '+91 99765 43210',
              email: 'pune@robinhoodarmy.com',
              website: 'https://robinhoodarmy.com',
              isVerified: true,
              imageUrl: placeholders.ngoLogo
            },
            {
              id: '3',
              name: 'Pune Food Bank',
              description: 'Collecting, storing, and distributing food to vulnerable communities with a focus on nutrition and sustainable food systems in Pune region.',
              location: 'Hadapsar, Pune',
              categories: ['Food Banking', 'Nutrition', 'Community Development'],
              phone: '+91 20 2447 8910',
              email: 'info@punefoodbank.org',
              website: 'https://punefoodbank.org',
              isVerified: true,
              imageUrl: placeholders.ngoLogo
            },
            {
              id: '4',
              name: 'Annapurna Movement',
              description: 'Tackling food waste in Pune\'s IT parks and corporate offices by collecting surplus food and redistributing it to slum communities and night shelters.',
              location: 'Hinjewadi, Pune',
              categories: ['Corporate Food Rescue', 'Urban Poor', 'Food Distribution'],
              phone: '+91 89765 43211',
              email: 'connect@annapurnamovement.org',
              website: 'https://annapurnamovement.org',
              isVerified: false,
              imageUrl: placeholders.ngoLogo
            },
            {
              id: '5',
              name: 'Seva Sahayog Foundation',
              description: 'Providing nutrition support to orphanages, old age homes, and homeless shelters across Pune with daily meal programs and grocery donations.',
              location: 'Shivaji Nagar, Pune',
              categories: ['Senior Care', 'Children Welfare', 'Homeless Support'],
              phone: '+91 20 2553 6789',
              email: 'contact@sevasahayog.org',
              website: 'https://sevasahayog.org',
              isVerified: true,
              imageUrl: placeholders.ngoLogo
            },
            {
              id: '6',
              name: 'Green Warrior Pune',
              description: 'Combining environmental sustainability with hunger relief through urban farming initiatives and community kitchen programs in Pune\'s peri-urban areas.',
              location: 'Baner, Pune',
              categories: ['Sustainable Food', 'Environment', 'Urban Farming'],
              phone: '+91 79765 43212',
              email: 'info@greenwarrior.org',
              website: 'https://greenwarrior.org',
              isVerified: false,
              imageUrl: placeholders.ngoLogo
            }
          ];
          
          setNgos(mockNGOs);
          setFilteredNgos(mockNGOs);
          setLoading(false);
        }, 1500);
      } catch (err) {
        setError('Failed to load NGOs');
        setLoading(false);
      }
    };

    fetchNGOs();
  }, []);

  // Extract unique locations and categories for filter options
  const locations = [...new Set(ngos.map(ngo => ngo.location))];
  const categories = [...new Set(ngos.flatMap(ngo => ngo.categories))];

  useEffect(() => {
    // Apply filters and search
    let result = [...ngos];
    
    // Filter by verification status
    if (filters.verifiedOnly) {
      result = result.filter(ngo => ngo.isVerified);
    }
    
    // Filter by location
    if (filters.location) {
      result = result.filter(ngo => ngo.location === filters.location);
    }
    
    // Filter by category
    if (filters.category) {
      result = result.filter(ngo => ngo.categories.includes(filters.category));
    }
    
    // Search by name or description
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        ngo => 
          ngo.name.toLowerCase().includes(searchLower) || 
          ngo.description.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredNgos(result);
  }, [ngos, search, filters]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const resetFilters = () => {
    setFilters({
      verifiedOnly: false,
      location: '',
      category: ''
    });
    setSearch('');
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading NGOs...</p>
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
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3">Partner NGOs in Pune</h1>
        <p className="lead">
          Connect with our verified partners who are fighting hunger across Pune city.
          These organizations help distribute your food donations to those in need.
        </p>
      </div>
      
      <Row className="mb-4">
        <Col md={8}>
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search NGOs by name or description..."
              value={search}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <div className="d-flex justify-content-end">
            <Button 
              variant="outline-primary" 
              className="d-flex align-items-center"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#filterCollapse"
              aria-expanded="false"
              aria-controls="filterCollapse"
            >
              <FaFilter className="me-2" />
              Filters
            </Button>
          </div>
        </Col>
      </Row>
      
      <div className="collapse mb-4" id="filterCollapse">
        <Card className="border-0 shadow-sm">
          <Card.Body>
            <h5 className="mb-3">Filter Options</h5>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    id="verifiedOnly"
                    name="verifiedOnly"
                    label="Verified NGOs Only"
                    checked={filters.verifiedOnly}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Select
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Locations in Pune</option>
                    {locations.map(location => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      
      {filteredNgos.length === 0 ? (
        <Alert variant="info" className="text-center">
          No NGOs found matching your criteria. Please try different filters.
        </Alert>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredNgos.map(ngo => (
            <Col key={ngo.id} data-aos="fade-up">
              <Card className="h-100 shadow-sm hover-lift border-0">
                <div className="position-relative">
                  <Card.Img 
                    variant="top" 
                    src={ngo.imageUrl} 
                    alt={ngo.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  {ngo.isVerified && (
                    <div className="position-absolute top-0 end-0 m-2">
                      <Badge bg="success" className="d-flex align-items-center">
                        <FaCheckCircle className="me-1" />
                        Verified
                      </Badge>
                    </div>
                  )}
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">{ngo.name}</Card.Title>
                  <div className="mb-2 text-muted small d-flex align-items-center">
                    <FaMapMarkerAlt className="me-1 text-primary" />
                    {ngo.location}
                  </div>
                  <Card.Text className="small mb-3">
                    {ngo.description.length > 120
                      ? `${ngo.description.substring(0, 120)}...`
                      : ngo.description}
                  </Card.Text>
                  <div className="mb-3">
                    {ngo.categories.map(category => (
                      <Badge 
                        key={category} 
                        bg="light" 
                        text="dark" 
                        className="me-1 mb-1"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <div className="d-flex align-items-center small text-muted mb-2">
                    <FaPhone className="me-1 text-primary" />
                    <span>{ngo.phone}</span>
                  </div>
                  <div className="d-flex align-items-center small text-muted">
                    <FaEnvelope className="me-1 text-primary" />
                    <span>{ngo.email}</span>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white border-0">
                  <Link 
                    to={`/ngos/${ngo.id}`} 
                    className="btn btn-primary w-100"
                  >
                    View Details
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default NGOList; 