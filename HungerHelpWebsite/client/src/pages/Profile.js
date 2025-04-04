import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Tabs, Tab } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { FaUser, FaLock, FaIdCard, FaBuilding, FaImage, FaMapMarkerAlt, FaPhone, FaEnvelope, FaSave } from 'react-icons/fa';

const Profile = () => {
  const { currentUser, updateUser, error: authError } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    website: '',
    profileImage: null
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
  
  // Mock verification data (only for NGO type users)
  const [verificationData, setVerificationData] = useState({
    organizationName: '',
    registrationNumber: '',
    foundedYear: '',
    address: '',
    contactPerson: '',
    documents: null,
    isVerified: false,
    verificationStatus: 'not_submitted' // not_submitted, pending, verified, rejected
  });

  // Load user data only once on component mount or if currentUser changes
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || '',
        bio: currentUser.bio || '',
        website: currentUser.website || '',
        profileImage: currentUser.profileImage || null
      });
      setProfilePreview(currentUser.profileImage || null);
      
      // If NGO, set verification data
      if (currentUser.role === 'ngo') {
        setVerificationData({
          organizationName: 'Helping Hands Foundation',
          registrationNumber: 'NGO123456789',
          foundedYear: '2012',
          address: 'Plot No. 123, Koregaon Park, Pune',
          contactPerson: 'Ananya Sharma',
          documents: null,
          isVerified: false,
          verificationStatus: 'pending' // Sample status
        });
      }
    }
  }, [currentUser?.id]); // Only reload if the user ID changes

  const handleProfileChange = useCallback((e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleVerificationChange = useCallback((e) => {
    const { name, value } = e.target;
    setVerificationData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData(prev => ({
        ...prev,
        profileImage: file
      }));
      setProfilePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleDocumentChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      setVerificationData(prev => ({
        ...prev,
        documents: file
      }));
    }
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setMessage({ type: '', text: '' });
    
    try {
      // Update user data
      await updateUser({
        ...profileData,
        // Don't send the file object to avoid serialization issues
        profileImage: profilePreview
      });
      
      // Show success message
      setSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setMessage({ 
        type: 'danger', 
        text: err.message || 'Failed to update profile' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password inputs
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ 
        type: 'danger', 
        text: 'New passwords do not match' 
      });
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordMessage({ 
        type: 'danger', 
        text: 'Password must be at least 8 characters long' 
      });
      return;
    }
    
    setLoading(true);
    setPasswordMessage({ type: '', text: '' });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, call the password update API
      
      setLoading(false);
      setPasswordMessage({ 
        type: 'success', 
        text: 'Password changed successfully!' 
      });
      
      // Reset password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setLoading(false);
      setPasswordMessage({ 
        type: 'danger', 
        text: error.message || 'Failed to change password' 
      });
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVerificationData(prev => ({
        ...prev,
        verificationStatus: 'pending'
      }));
      
      setLoading(false);
      setMessage({ 
        type: 'success', 
        text: 'Verification request submitted successfully! Our team will review your documents.' 
      });
    } catch (error) {
      setLoading(false);
      setMessage({ 
        type: 'danger', 
        text: error.message || 'Failed to submit verification request' 
      });
    }
  };

  const getVerificationStatusBadge = () => {
    switch (verificationData.verificationStatus) {
      case 'verified':
        return <span className="badge bg-success">Verified</span>;
      case 'pending':
        return <span className="badge bg-warning text-dark">Pending Review</span>;
      case 'rejected':
        return <span className="badge bg-danger">Rejected</span>;
      default:
        return <span className="badge bg-secondary">Not Submitted</span>;
    }
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">My Profile</h2>
      
      <Tabs defaultActiveKey="profile" className="mb-4">
        <Tab eventKey="profile" title="Profile Information">
          <Row>
            <Col md={4} className="mb-4 mb-md-0">
              <Card className="text-center">
                <Card.Body>
                  <div className="mb-3">
                    {profilePreview ? (
                      <img 
                        src={profilePreview} 
                        alt="Profile" 
                        className="rounded-circle img-thumbnail" 
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                      />
                    ) : (
                      <div className="avatar-circle mx-auto">
                        {profileData.name ? profileData.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                  </div>
                  <h5>{profileData.name}</h5>
                  <p className="text-muted">
                    {currentUser?.role === 'ngo' ? 'NGO' : currentUser?.role === 'admin' ? 'Administrator' : 'Food Donor'}
                  </p>
                  
                  {currentUser?.role === 'ngo' && (
                    <div className="mt-2">
                      <p>Verification Status: {getVerificationStatusBadge()}</p>
                    </div>
                  )}
                  
                  <div className="mt-3">
                    <Form.Group controlId="profileImage" className="mb-3">
                      <Form.Label>Update Profile Picture</Form.Label>
                      <Form.Control 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        size="sm"
                      />
                    </Form.Group>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={8}>
              <Card>
                <Card.Body>
                  {message.text && (
                    <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
                      {message.text}
                    </Alert>
                  )}
                  {success && <Alert variant="success">Profile updated successfully!</Alert>}
                  
                  <Form onSubmit={handleProfileSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>
                        <FaUser className="me-2" />
                        {currentUser?.role === 'ngo' ? 'Organization Name' : 'Full Name'}
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name"
                        value={profileData.name} 
                        onChange={handleProfileChange}
                        required
                      />
                    </Form.Group>
                    
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>
                            <FaEnvelope className="me-2" />
                            Email
                          </Form.Label>
                          <Form.Control 
                            type="email" 
                            name="email"
                            value={profileData.email} 
                            onChange={handleProfileChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="phone">
                          <Form.Label>
                            <FaPhone className="me-2" />
                            Phone Number
                          </Form.Label>
                          <Form.Control 
                            type="tel" 
                            name="phone"
                            value={profileData.phone} 
                            onChange={handleProfileChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3" controlId="address">
                      <Form.Label>
                        <FaMapMarkerAlt className="me-2" />
                        Address
                      </Form.Label>
                      <Form.Control 
                        type="text" 
                        name="address"
                        value={profileData.address} 
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="bio">
                      <Form.Label>Bio / About</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={3} 
                        name="bio"
                        value={profileData.bio} 
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="website">
                      <Form.Label>Website</Form.Label>
                      <Form.Control 
                        type="url" 
                        name="website"
                        value={profileData.website} 
                        onChange={handleProfileChange}
                        placeholder="https://example.com"
                      />
                    </Form.Group>
                    
                    <div className="d-grid gap-2 mt-4">
                      <Button 
                        variant="primary" 
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <FaSave className="me-2" /> Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
        
        <Tab eventKey="password" title="Change Password">
          <Row className="justify-content-center">
            <Col md={6}>
              <Card>
                <Card.Body>
                  {passwordMessage.text && (
                    <Alert variant={passwordMessage.type} dismissible onClose={() => setPasswordMessage({ type: '', text: '' })}>
                      {passwordMessage.text}
                    </Alert>
                  )}
                  
                  <Form onSubmit={handlePasswordSubmit}>
                    <Form.Group className="mb-3" controlId="currentPassword">
                      <Form.Label>
                        <FaLock className="me-2" />
                        Current Password
                      </Form.Label>
                      <Form.Control 
                        type="password" 
                        name="currentPassword"
                        value={passwordData.currentPassword} 
                        onChange={handlePasswordChange}
                        required
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="newPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        name="newPassword"
                        value={passwordData.newPassword} 
                        onChange={handlePasswordChange}
                        required
                      />
                      <Form.Text className="text-muted">
                        Password must be at least 8 characters long.
                      </Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="confirmPassword">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control 
                        type="password" 
                        name="confirmPassword"
                        value={passwordData.confirmPassword} 
                        onChange={handlePasswordChange}
                        required
                      />
                    </Form.Group>
                    
                    <div className="d-grid gap-2 mt-4">
                      <Button 
                        variant="primary" 
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Updating...
                          </>
                        ) : 'Change Password'}
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
        
        {currentUser?.role === 'ngo' && (
          <Tab eventKey="verification" title="NGO Verification">
            <Row className="justify-content-center">
              <Col md={8}>
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">NGO Verification</h5>
                  </Card.Header>
                  <Card.Body>
                    <Alert variant="info">
                      <strong>Why verify?</strong> Verified NGOs receive priority access to donations and increased visibility to donors.
                    </Alert>
                    
                    {verificationData.verificationStatus === 'verified' ? (
                      <Alert variant="success">
                        <h5>Your organization is verified! ✓</h5>
                        <p>Your NGO has been verified and has full access to all platform features.</p>
                      </Alert>
                    ) : verificationData.verificationStatus === 'pending' ? (
                      <Alert variant="warning">
                        <h5>Verification in progress</h5>
                        <p>We're currently reviewing your verification documents. This process typically takes 3-5 business days.</p>
                      </Alert>
                    ) : verificationData.verificationStatus === 'rejected' ? (
                      <Alert variant="danger">
                        <h5>Verification rejected</h5>
                        <p>Your verification was rejected. Please review the information below and resubmit.</p>
                      </Alert>
                    ) : (
                      <Form onSubmit={handleVerificationSubmit}>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3" controlId="organizationName">
                              <Form.Label>
                                <FaBuilding className="me-2" />
                                Organization Name
                              </Form.Label>
                              <Form.Control 
                                type="text" 
                                name="organizationName"
                                value={verificationData.organizationName} 
                                onChange={handleVerificationChange}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3" controlId="registrationNumber">
                              <Form.Label>
                                <FaIdCard className="me-2" />
                                Registration Number
                              </Form.Label>
                              <Form.Control 
                                type="text" 
                                name="registrationNumber"
                                value={verificationData.registrationNumber} 
                                onChange={handleVerificationChange}
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3" controlId="foundedYear">
                              <Form.Label>Year Founded</Form.Label>
                              <Form.Control 
                                type="number" 
                                name="foundedYear"
                                value={verificationData.foundedYear} 
                                onChange={handleVerificationChange}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3" controlId="contactPerson">
                              <Form.Label>Primary Contact Person</Form.Label>
                              <Form.Control 
                                type="text" 
                                name="contactPerson"
                                value={verificationData.contactPerson} 
                                onChange={handleVerificationChange}
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Form.Group className="mb-3" controlId="verificationAddress">
                          <Form.Label>Registered Address</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="address"
                            value={verificationData.address} 
                            onChange={handleVerificationChange}
                            required
                          />
                        </Form.Group>
                        
                        <Form.Group controlId="documents" className="mb-3">
                          <Form.Label>
                            <FaImage className="me-2" />
                            Upload Verification Documents
                          </Form.Label>
                          <Form.Control 
                            type="file" 
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={handleDocumentChange}
                            required
                          />
                          <Form.Text className="text-muted">
                            Please upload a scanned copy of your NGO registration certificate (PDF or image format).
                          </Form.Text>
                        </Form.Group>
                        
                        <div className="d-grid gap-2 mt-4">
                          <Button 
                            variant="success" 
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Submitting...
                              </>
                            ) : 'Submit for Verification'}
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>
        )}
      </Tabs>
    </Container>
  );
};

export default Profile; 