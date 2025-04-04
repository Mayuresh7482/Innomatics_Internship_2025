import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaTruck, FaUsers, FaUtensils, FaHandsHelping, FaCheckCircle, FaLeaf, FaChartLine } from 'react-icons/fa';
import { placeholders } from '../utils/generatePlaceholderImages';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out'
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section position-relative">
        <div className="hero-image" style={{ backgroundImage: `url(${placeholders.heroBackground})` }}>
          <div className="hero-overlay"></div>
          <Container className="py-5">
            <Row className="py-5 align-items-center">
              <Col md={6} className="text-white" data-aos="fade-right">
                <h1 className="display-4 fw-bold mb-4">
                  Fight Hunger, Reduce Waste
                </h1>
                <p className="lead mb-4">
                  Connecting food donors with NGOs to reduce food waste and fight hunger in Pune.
                  Join our mission to create a sustainable and hunger-free community.
                </p>
                <div className="d-flex flex-wrap">
                  <Button 
                    as={Link}
                    to="/register" 
                    variant="primary" 
                    size="lg" 
                    className="me-3 mb-3 mb-md-0"
                  >
                    Get Started
                  </Button>
                  <Button 
                    as={Link}
                    to="/about" 
                    variant="outline-light" 
                    size="lg"
                  >
                    Learn More
                  </Button>
                </div>
              </Col>
              <Col md={6} className="mt-5 mt-md-0 text-center" data-aos="fade-left">
                <img 
                  src={placeholders.heroIllustration} 
                  alt="Food donation illustration" 
                  className="img-fluid hero-illustration"
                />
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-5 bg-light">
        <Container>
          <Row className="text-center">
            <Col md={3} sm={6} className="mb-4" data-aos="fade-up">
              <div className="stat-card p-4 bg-white shadow-sm rounded-3">
                <div className="stat-icon mb-3">
                  <FaUtensils className="text-primary" size={40} />
                </div>
                <h2 className="counter fw-bold">50K+</h2>
                <p className="text-muted">Meals Donated</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="stat-card p-4 bg-white shadow-sm rounded-3">
                <div className="stat-icon mb-3">
                  <FaUsers className="text-primary" size={40} />
                </div>
                <h2 className="counter fw-bold">1.2K+</h2>
                <p className="text-muted">Active Donors</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="stat-card p-4 bg-white shadow-sm rounded-3">
                <div className="stat-icon mb-3">
                  <FaHandHoldingHeart className="text-primary" size={40} />
                </div>
                <h2 className="counter fw-bold">300+</h2>
                <p className="text-muted">Partner NGOs</p>
              </div>
            </Col>
            <Col md={3} sm={6} className="mb-4" data-aos="fade-up" data-aos-delay="300">
              <div className="stat-card p-4 bg-white shadow-sm rounded-3">
                <div className="stat-icon mb-3">
                  <FaLeaf className="text-primary" size={40} />
                </div>
                <h2 className="counter fw-bold">20+</h2>
                <p className="text-muted">Cities Covered</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-5">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h2 className="section-title" data-aos="fade-up">How It Works</h2>
              <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Three simple steps to make a difference
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={4} className="mb-4" data-aos="fade-up">
              <div className="process-card text-center p-4">
                <div className="process-icon mb-4">
                  <div className="icon-circle bg-primary text-white">
                    <span>1</span>
                  </div>
                </div>
                <h4>Register as a Donor or NGO</h4>
                <p className="text-muted">
                  Create an account specifying whether you're a food donor or an NGO looking to collect donations.
                </p>
              </div>
            </Col>
            <Col lg={4} className="mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="process-card text-center p-4">
                <div className="process-icon mb-4">
                  <div className="icon-circle bg-primary text-white">
                    <span>2</span>
                  </div>
                </div>
                <h4>Post or Claim Donations</h4>
                <p className="text-muted">
                  Donors can post available food while NGOs can browse and claim donations in their area.
                </p>
              </div>
            </Col>
            <Col lg={4} className="mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="process-card text-center p-4">
                <div className="process-icon mb-4">
                  <div className="icon-circle bg-primary text-white">
                    <span>3</span>
                  </div>
                </div>
                <h4>Coordinate Pickup & Delivery</h4>
                <p className="text-muted">
                  Connect through the platform to arrange food pickup/delivery and help feed those in need.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <Container>
          <Row className="mb-5 text-center">
            <Col>
              <h2 className="section-title" data-aos="fade-up">Platform Features</h2>
              <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
                Designed to make food donation efficient and impactful
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={4} className="mb-4" data-aos="zoom-in">
              <Card className="feature-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div className="feature-icon mb-3">
                    <span className="icon-circle bg-info text-white">
                      <i className="fa fa-bell"></i>
                    </span>
                  </div>
                  <Card.Title>Real-time Notifications</Card.Title>
                  <Card.Text>
                    Get instant alerts about new donations, claims, and pickup confirmations.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4" data-aos="zoom-in" data-aos-delay="100">
              <Card className="feature-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div className="feature-icon mb-3">
                    <span className="icon-circle bg-success text-white">
                      <i className="fa fa-check-circle"></i>
                    </span>
                  </div>
                  <Card.Title>NGO Verification</Card.Title>
                  <Card.Text>
                    All partner NGOs are verified to ensure donations reach legitimate organizations.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4" data-aos="zoom-in" data-aos-delay="200">
              <Card className="feature-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div className="feature-icon mb-3">
                    <span className="icon-circle bg-warning text-white">
                      <i className="fa fa-map-marker-alt"></i>
                    </span>
                  </div>
                  <Card.Title>Location-based Matching</Card.Title>
                  <Card.Text>
                    Connect with nearby donors or NGOs to minimize transportation time.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4" data-aos="zoom-in" data-aos-delay="300">
              <Card className="feature-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div className="feature-icon mb-3">
                    <span className="icon-circle bg-danger text-white">
                      <i className="fa fa-clock"></i>
                    </span>
                  </div>
                  <Card.Title>Expiration Tracking</Card.Title>
                  <Card.Text>
                    Monitor food expiration dates to prioritize urgent donations.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4" data-aos="zoom-in" data-aos-delay="400">
              <Card className="feature-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div className="feature-icon mb-3">
                    <span className="icon-circle bg-primary text-white">
                      <i className="fa fa-history"></i>
                    </span>
                  </div>
                  <Card.Title>Donation History</Card.Title>
                  <Card.Text>
                    Track your contribution history and the impact you've made.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4} className="mb-4" data-aos="zoom-in" data-aos-delay="500">
              <Card className="feature-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div className="feature-icon mb-3">
                    <span className="icon-circle bg-secondary text-white">
                      <i className="fa fa-chart-bar"></i>
                    </span>
                  </div>
                  <Card.Title>Impact Dashboard</Card.Title>
                  <Card.Text>
                    Visualize your contribution to fighting hunger and reducing waste.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-5 text-white" style={{ backgroundImage: `url(${placeholders.ctaBackground})` }}>
        <div className="cta-overlay"></div>
        <Container className="py-5 position-relative">
          <Row className="justify-content-center text-center">
            <Col lg={8} data-aos="fade-up">
              <h2 className="display-4 fw-bold mb-4">Ready to Make a Difference?</h2>
              <p className="lead mb-4">
                Join Hunger Help today and become part of our mission to reduce food waste and fight hunger in Pune.
              </p>
              <div className="d-flex justify-content-center flex-wrap">
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="light" 
                  size="lg" 
                  className="me-3 mb-3 mb-md-0"
                >
                  Sign Up Now
                </Button>
                <Button 
                  as={Link} 
                  to="/contact" 
                  variant="outline-light" 
                  size="lg"
                >
                  Contact Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h2 className="section-title" data-aos="fade-up">Testimonials</h2>
              <p className="lead mb-0" data-aos="fade-up">Hear from our donors, partner NGOs, and community members</p>
            </Col>
          </Row>
          <Row>
            <Col lg={4} md={6} className="mb-4" data-aos="fade-up" data-aos-delay="100">
              <Card className="testimonial-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="testimonial-rating mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-warning me-1">★</span>
                    ))}
                  </div>
                  <Card.Text className="mb-4">
                    "Hunger Help transformed how our restaurant handles excess food. Instead of disposal, 
                    we now ensure it reaches those in need. The platform is intuitive, and their team is 
                    responsive and passionate."
                  </Card.Text>
                  <div className="testimonial-author d-flex align-items-center">
                    <img 
                      src={placeholders.testimonial1}
                      alt="Testimonial Author" 
                      className="rounded-circle me-3" 
                      width="50" 
                      height="50" 
                    />
                    <div>
                      <Card.Title as="h6" className="mb-0">Rahul Sharma</Card.Title>
                      <small className="text-muted">Restaurant Owner, Pune</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4" data-aos="fade-up" data-aos-delay="200">
              <Card className="testimonial-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="testimonial-rating mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-warning me-1">★</span>
                    ))}
                  </div>
                  <Card.Text className="mb-4">
                    "As an NGO serving underprivileged communities, Hunger Help has been a game-changer. 
                    We now receive consistent food donations, allowing us to feed more people. The quality 
                    and variety of food have greatly improved."
                  </Card.Text>
                  <div className="testimonial-author d-flex align-items-center">
                    <img 
                      src={placeholders.testimonial2}
                      alt="Testimonial Author" 
                      className="rounded-circle me-3" 
                      width="50" 
                      height="50" 
                    />
                    <div>
                      <Card.Title as="h6" className="mb-0">Priya Desai</Card.Title>
                      <small className="text-muted">NGO Director, Pune</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} className="mb-4 mx-auto" data-aos="fade-up" data-aos-delay="300">
              <Card className="testimonial-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="testimonial-rating mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-warning me-1">★</span>
                    ))}
                  </div>
                  <Card.Text className="mb-4">
                    "Being a volunteer with Hunger Help has been incredibly rewarding. Seeing the direct impact 
                    of our work when distributing food to those who need it most gives me a sense of purpose 
                    and community connection."
                  </Card.Text>
                  <div className="testimonial-author d-flex align-items-center">
                    <img 
                      src={placeholders.testimonial3}
                      alt="Testimonial Author" 
                      className="rounded-circle me-3" 
                      width="50" 
                      height="50" 
                    />
                    <div>
                      <Card.Title as="h6" className="mb-0">Arjun Patel</Card.Title>
                      <small className="text-muted">Volunteer, Pune</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home; 