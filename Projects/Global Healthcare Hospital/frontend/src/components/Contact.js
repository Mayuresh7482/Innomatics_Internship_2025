import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // In a real application, you would send the form data to a server here
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setValidated(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page py-5 mt-5">
      <Container>
        <h1 className="section-title text-center mb-5">Contact Us</h1>
        
        <Row className="mb-5">
          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 text-center shadow-sm hover-card border-0">
              <Card.Body>
                <div className="contact-icon-wrapper mb-3">
                  <FaPhone className="contact-icon text-primary" />
                </div>
                <Card.Title>Phone</Card.Title>
                <Card.Text>
                  <a href="tel:+1234567890" className="text-decoration-none">+1 (234) 567-890</a>
                  <br />
                  <a href="tel:+1234567891" className="text-decoration-none">+1 (234) 567-891</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 text-center shadow-sm hover-card border-0">
              <Card.Body>
                <div className="contact-icon-wrapper mb-3">
                  <FaEnvelope className="contact-icon text-primary" />
                </div>
                <Card.Title>Email</Card.Title>
                <Card.Text>
                  <a href="mailto:info@globalhealthcare.com" className="text-decoration-none">info@globalhealthcare.com</a>
                  <br />
                  <a href="mailto:support@globalhealthcare.com" className="text-decoration-none">support@globalhealthcare.com</a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} md={12} className="mb-4">
            <Card className="h-100 text-center shadow-sm hover-card border-0">
              <Card.Body>
                <div className="contact-icon-wrapper mb-3">
                  <FaMapMarkerAlt className="contact-icon text-primary" />
                </div>
                <Card.Title>Location</Card.Title>
                <Card.Text>
                  123 Healthcare Avenue,<br />
                  Medical District, NY 10001,<br />
                  United States
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <h2 className="mb-4">Get In Touch</h2>
            {submitted ? (
              <div className="alert alert-success">
                <h4>Thank you for your message!</h4>
                <p>We have received your inquiry and will get back to you as soon as possible.</p>
                <Button 
                  variant="outline-success" 
                  onClick={() => setSubmitted(false)}
                  className="mt-3"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="contactName">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="contactEmail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="contactPhone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="contactSubject">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="Enter subject"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a subject.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="contactMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Enter your message"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a message.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" className="rounded-pill">
                  <FaPaperPlane className="me-2" /> Send Message
                </Button>
              </Form>
            )}
          </Col>
          <Col lg={6}>
            <h2 className="mb-4">Working Hours</h2>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <FaClock className="text-primary me-2" size={20} />
                  <h5 className="mb-0">Our Schedule</h5>
                </div>
                <ul className="list-unstyled working-hours">
                  <li className="d-flex justify-content-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Sunday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                </ul>
                <div className="alert alert-info mt-4">
                  <strong>Emergency Services:</strong> Available 24/7
                </div>
              </Card.Body>
            </Card>
            
            <h2 className="mb-4 mt-5">Find Us</h2>
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3059353029!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1647834074073!5m2!1sen!2sin" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Hospital Location"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact; 