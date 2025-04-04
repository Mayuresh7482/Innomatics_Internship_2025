import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Tab, Nav } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserPlus, FaHandHoldingHeart, FaTruck, FaBuilding } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [activeTab, setActiveTab] = useState('donor');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    userType: 'donor',
    ngoDetails: {
      registrationNumber: '',
      description: '',
      foundedYear: ''
    }
  });
  
  const [validated, setValidated] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [registerError, setRegisterError] = useState('');
  
  const { register, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check URL for user type selection
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type && ['donor', 'ngo', 'volunteer'].includes(type)) {
      setActiveTab(type);
      setFormData(prev => ({ ...prev, userType: type }));
    }
  }, [location]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData(prev => ({ ...prev, userType: tab }));
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Check password match
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password') {
        setPasswordMatch(value === formData.confirmPassword);
      } else {
        setPasswordMatch(formData.password === value);
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    
    // Form validation
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    setRegisterError('');
    
    try {
      // Remove confirmPassword field before sending to API
      const { confirmPassword, ...dataToSend } = formData;
      
      await register(dataToSend);
      
      // Redirect to dashboard or verification page for NGOs
      if (formData.userType === 'ngo') {
        navigate('/dashboard', { 
          state: { 
            message: 'Your NGO account has been created but requires verification. Please check your email.' 
          } 
        });
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      setRegisterError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <FaUserPlus className="text-primary mb-3" size={40} />
                <h2>Create Your Account</h2>
                <p className="text-muted">
                  Join our community and help reduce food waste
                </p>
              </div>
              
              {(registerError || error) && (
                <Alert variant="danger">{registerError || error}</Alert>
              )}
              
              <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
                <Nav variant="pills" className="nav-justified mb-4">
                  <Nav.Item>
                    <Nav.Link eventKey="donor" className="d-flex flex-column align-items-center">
                      <FaHandHoldingHeart size={20} className="mb-1" />
                      <span>Donor</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="ngo" className="d-flex flex-column align-items-center">
                      <FaBuilding size={20} className="mb-1" />
                      <span>NGO</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="volunteer" className="d-flex flex-column align-items-center">
                      <FaTruck size={20} className="mb-1" />
                      <span>Volunteer</span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                
                <Tab.Content>
                  <Tab.Pane eventKey={activeTab}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your full name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide your name.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter your email address"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid email address.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Create a password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                              minLength={6}
                            />
                            <Form.Control.Feedback type="invalid">
                              Password must be at least 6 characters.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Confirm your password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                              isInvalid={validated && !passwordMatch}
                            />
                            <Form.Control.Feedback type="invalid">
                              Passwords do not match.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                              type="tel"
                              placeholder="Enter your phone number"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a phone number.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="address.city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your city"
                              name="address.city"
                              value={formData.address.city}
                              onChange={handleChange}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide your city.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={12}>
                          <Form.Group className="mb-3" controlId="address.street">
                            <Form.Label>Street Address</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your street address"
                              name="address.street"
                              value={formData.address.street}
                              onChange={handleChange}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide your street address.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={4}>
                          <Form.Group className="mb-3" controlId="address.state">
                            <Form.Label>State/Province</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your state"
                              name="address.state"
                              value={formData.address.state}
                              onChange={handleChange}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide your state.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={4}>
                          <Form.Group className="mb-3" controlId="address.postalCode">
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your postal code"
                              name="address.postalCode"
                              value={formData.address.postalCode}
                              onChange={handleChange}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide your postal code.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={4}>
                          <Form.Group className="mb-3" controlId="address.country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your country"
                              name="address.country"
                              value={formData.address.country}
                              onChange={handleChange}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide your country.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      {/* NGO-specific fields */}
                      {activeTab === 'ngo' && (
                        <>
                          <hr className="my-4" />
                          <h5 className="mb-3">NGO Details</h5>
                          
                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3" controlId="ngoDetails.registrationNumber">
                                <Form.Label>Registration Number</Form.Label>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter NGO registration number"
                                  name="ngoDetails.registrationNumber"
                                  value={formData.ngoDetails.registrationNumber}
                                  onChange={handleChange}
                                  required
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide NGO registration number.
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group className="mb-3" controlId="ngoDetails.foundedYear">
                                <Form.Label>Year Founded</Form.Label>
                                <Form.Control
                                  type="number"
                                  placeholder="Enter year founded"
                                  name="ngoDetails.foundedYear"
                                  value={formData.ngoDetails.foundedYear}
                                  onChange={handleChange}
                                  required
                                />
                                <Form.Control.Feedback type="invalid">
                                  Please provide founding year.
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Col>
                          </Row>
                          
                          <Form.Group className="mb-3" controlId="ngoDetails.description">
                            <Form.Label>NGO Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Describe your NGO and its mission"
                              name="ngoDetails.description"
                              value={formData.ngoDetails.description}
                              onChange={handleChange}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a description.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </>
                      )}
                      
                      <div className="d-grid mt-4">
                        <Button
                          variant="primary"
                          type="submit"
                          size="lg"
                          disabled={loading}
                        >
                          {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                      </div>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
              
              <div className="text-center mt-4">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="text-decoration-none">
                    Login here
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register; 