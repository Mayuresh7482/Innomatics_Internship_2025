import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

const AdminProfile = () => {
  const { currentUser } = useContext(AuthContext);
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  useEffect(() => {
    // In a real app, this would be an API call to get the admin's profile
    setTimeout(() => {
      setProfile({
        name: currentUser?.name || 'Admin User',
        email: currentUser?.email || 'admin@example.com',
        phone: '(123) 456-7890',
        address: '123 Admin St, New York, NY',
        password: '',
        confirmPassword: ''
      });
      setLoading(false);
    }, 1000);
  }, [currentUser]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (profile.password && profile.password !== profile.confirmPassword) {
      setMessage({
        type: 'danger',
        text: 'Passwords do not match'
      });
      return;
    }
    
    // In a real app, this would be an API call to update the admin's profile
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      setMessage({
        type: 'success',
        text: 'Profile updated successfully'
      });
      
      // Clear password fields after successful update
      setProfile(prevProfile => ({
        ...prevProfile,
        password: '',
        confirmPassword: ''
      }));
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
    }, 1000);
  };
  
  if (loading) {
    return (
      <Container>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }
  
  return (
    <Container>
      <h2 className="mb-4">Admin Profile</h2>
      
      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
          {message.text}
        </Alert>
      )}
      
      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
            </Row>
            
            {isEditing && (
              <>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={profile.password}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                      />
                      <Form.Text className="text-muted">
                        Leave blank if you don't want to change your password
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={profile.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}
            
            <div className="d-flex justify-content-end mt-3">
              {!isEditing ? (
                <Button variant="primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="secondary" className="me-2" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button variant="success" type="submit">
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
      
      <Card className="mt-4 shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Account Information</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Role:</strong> Administrator</p>
              <p><strong>Account Created:</strong> January 1, 2023</p>
            </Col>
            <Col md={6}>
              <p><strong>Last Login:</strong> Today at 9:30 AM</p>
              <p><strong>Account Status:</strong> <span className="badge bg-success">Active</span></p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminProfile; 