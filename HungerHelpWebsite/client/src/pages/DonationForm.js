import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaUtensils, FaClock } from 'react-icons/fa';

const DonationForm = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    expiryDate: '',
    location: '',
    description: '',
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Create form data for submission including the image
      const data = new FormData();
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });
      
      // TODO: Add actual API call to submit donation
      // const response = await fetch('/api/donations', {
      //   method: 'POST',
      //   headers: {
      //     Authorization: `Bearer ${currentUser.token}`,
      //   },
      //   body: data,
      // });

      // if (!response.ok) throw new Error('Failed to submit donation');
      
      // For now, simulate success
      setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        // Reset form after success
        setFormData({
          foodType: '',
          quantity: '',
          expiryDate: '',
          location: '',
          description: '',
          image: null
        });
        setPreview(null);
        
        // Redirect to donations list after 2 seconds
        setTimeout(() => {
          navigate('/my-donations');
        }, 2000);
      }, 1000);
      
    } catch (err) {
      setError(err.message || 'Something went wrong while submitting your donation');
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">
                <FaUtensils className="me-2" />
                Create New Donation
              </h3>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && (
                <Alert variant="success">
                  Your donation has been submitted successfully! Redirecting...
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Food Type</Form.Label>
                      <Form.Control
                        type="text"
                        name="foodType"
                        value={formData.foodType}
                        onChange={handleChange}
                        placeholder="e.g., Cooked Food, Packaged Food, Grains"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="e.g., 5kg, Serves 10 people"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaClock className="me-1" /> Expiry Date/Time
                      </Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pickup Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter full address"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide more details about the food donation"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Food Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <Form.Text className="text-muted">
                    Adding an image helps NGOs better understand your donation
                  </Form.Text>
                  {preview && (
                    <div className="mt-2">
                      <img
                        src={preview}
                        alt="Food preview"
                        className="img-thumbnail"
                        style={{ maxHeight: '200px' }}
                      />
                    </div>
                  )}
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    size="lg"
                    disabled={loading || success}
                  >
                    {loading ? 'Submitting...' : 'Submit Donation'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DonationForm; 