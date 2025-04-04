import React from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaClock } from 'react-icons/fa';
import '../styles/Contact.css';
import { placeholders } from '../utils/generatePlaceholderImages';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <div className="contact-page">
      {/* Page Header */}
      <div className="bg-primary-light py-5 mb-5">
        <Container className="text-center" data-aos="fade-up">
          <h1 className="display-4 fw-bold mb-4">Contact Us</h1>
          <p className="lead mb-0">
            Get in touch with our team in Pune to learn more about how you can contribute
            to reducing food waste and fighting hunger in our community.
          </p>
        </Container>
      </div>

      <Container className="mb-5">
        <Row>
          {/* Contact Form */}
          <Col lg={7} className="mb-4 mb-lg-0" data-aos="fade-up">
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">
                <h2 className="fw-bold mb-4">Send Us a Message</h2>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="formName">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" required />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="formEmail">
                        <Form.Label>Your Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" required />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="Enter your phone number" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" placeholder="What is this regarding?" required />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Your message" required />
                  </Form.Group>
                  <Button variant="primary" type="submit" size="lg" className="px-4">
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Information */}
          <Col lg={5} data-aos="fade-up" data-aos-delay="100">
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <h2 className="fw-bold mb-4">Contact Information</h2>
                <ul className="contact-info-list list-unstyled">
                  <li className="d-flex mb-4">
                    <div className="contact-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div className="ms-3">
                      <h5 className="fw-bold">Our Location</h5>
                      <p className="text-muted mb-0">
                        123 Food Street, Koregaon Park<br />
                        Pune, Maharashtra 411001<br />
                        India
                      </p>
                    </div>
                  </li>
                  <li className="d-flex mb-4">
                    <div className="contact-icon">
                      <FaPhone />
                    </div>
                    <div className="ms-3">
                      <h5 className="fw-bold">Phone</h5>
                      <p className="text-muted mb-0">
                        +91 8805322305<br />
                        +91 20 2567 8900
                      </p>
                    </div>
                  </li>
                  <li className="d-flex mb-4">
                    <div className="contact-icon">
                      <FaEnvelope />
                    </div>
                    <div className="ms-3">
                      <h5 className="fw-bold">Email</h5>
                      <p className="text-muted mb-0">
                        mborate18@gmail.com<br />
                        donations@hungerhelp.org
                      </p>
                    </div>
                  </li>
                  <li className="d-flex mb-4">
                    <div className="contact-icon">
                      <FaWhatsapp />
                    </div>
                    <div className="ms-3">
                      <h5 className="fw-bold">WhatsApp</h5>
                      <p className="text-muted mb-0">
                        +91 8805322305<br />
                        Available for emergency food donation coordination
                      </p>
                    </div>
                  </li>
                  <li className="d-flex">
                    <div className="contact-icon">
                      <FaClock />
                    </div>
                    <div className="ms-3">
                      <h5 className="fw-bold">Office Hours</h5>
                      <p className="text-muted mb-0">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed (Emergency line available)
                      </p>
                    </div>
                  </li>
                </ul>
              </Card.Body>
            </Card>

            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">Pune Food Collection Centers</h5>
                <p className="mb-3">
                  We have multiple food collection points across Pune for convenient donation drop-offs:
                </p>
                <ul className="mb-0 ps-3">
                  <li>Koregaon Park - Main Office</li>
                  <li>Camp Area - Next to SGS Mall</li>
                  <li>Aundh - Near Bremen Chowk</li>
                  <li>Hinjewadi - Phase 1 IT Park</li>
                  <li>Kothrud - Near Dahanukar Colony</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Map Section */}
      <div className="map-container mb-5" data-aos="fade-up">
        <Container fluid className="px-0">
          <div className="responsive-map">
            <img 
              src={placeholders.puneMap}
              alt="Map of our Pune location" 
              className="img-fluid w-100"
            />
            {/* This would be replaced with an actual map component */}
          </div>
        </Container>
      </div>
      
      {/* FAQ Section */}
      <Container className="mb-5" data-aos="fade-up">
        <Row>
          <Col lg={12} className="text-center mb-5">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </Col>
        </Row>
        <Row>
          <Col lg={6} className="mb-4">
            <div className="faq-item">
              <h5 className="fw-bold mb-3">How can I donate food in Pune?</h5>
              <p className="mb-0">
                You can donate food by registering on our platform and scheduling a pickup, 
                or by dropping off food items at any of our collection centers across Pune.
                For large donations, we provide free pickup services.
              </p>
            </div>
          </Col>
          <Col lg={6} className="mb-4">
            <div className="faq-item">
              <h5 className="fw-bold mb-3">What types of food do you accept?</h5>
              <p className="mb-0">
                We accept packaged food items, fresh produce, cooked meals from restaurants 
                and catering services, and bulk grain donations. All food must be safe for 
                consumption and properly stored.
              </p>
            </div>
          </Col>
          <Col lg={6} className="mb-4">
            <div className="faq-item">
              <h5 className="fw-bold mb-3">How do I become a partner NGO?</h5>
              <p className="mb-0">
                NGOs operating in Pune can apply through our website. We'll verify your 
                organization and arrange an in-person meeting to discuss collaboration 
                opportunities and food distribution capabilities.
              </p>
            </div>
          </Col>
          <Col lg={6} className="mb-4">
            <div className="faq-item">
              <h5 className="fw-bold mb-3">How can I volunteer with Hunger Help in Pune?</h5>
              <p className="mb-0">
                We welcome volunteers for food collection, sorting, distribution, and 
                administrative tasks. Register on our platform or visit our Koregaon Park 
                office to learn about current volunteer opportunities.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact; 