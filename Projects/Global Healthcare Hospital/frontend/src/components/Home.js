import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserMd, FaCalendarCheck, FaHospital, FaUserPlus, FaArrowRight, FaStar, FaQuoteLeft } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">Welcome to Global Healthcare Hospital</h1>
              <p className="lead mb-4">
                Your health is our priority. We provide world-class healthcare services with compassion and care.
              </p>
              <div className="d-flex gap-3">
                <Link to="/register">
                  <Button variant="light" size="lg" className="rounded-pill">
                    Register Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline-light" size="lg" className="rounded-pill">
                    Login
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={6} className="mt-5 mt-lg-0 text-center">
              <img 
                src="https://img.freepik.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21199.jpg" 
                alt="Healthcare Team" 
                className="img-fluid rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/600x400/1a73e8/FFF?text=Healthcare+Team";
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Stats Section */}
      <Container className="py-5">
        <Row className="text-center">
          <Col md={3} className="mb-4 mb-md-0">
            <div className="stat-item fade-in">
              <h2 className="display-4 fw-bold text-primary">50+</h2>
              <p className="text-muted">Expert Doctors</p>
            </div>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <div className="stat-item fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="display-4 fw-bold text-primary">10k+</h2>
              <p className="text-muted">Happy Patients</p>
            </div>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <div className="stat-item fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="display-4 fw-bold text-primary">15+</h2>
              <p className="text-muted">Years Experience</p>
            </div>
          </Col>
          <Col md={3} className="mb-4 mb-md-0">
            <div className="stat-item fade-in" style={{ animationDelay: '0.6s' }}>
              <h2 className="display-4 fw-bold text-primary">24/7</h2>
              <p className="text-muted">Emergency Service</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Services Section */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="section-title text-center mb-5">Our Services</h2>
          <Row>
            <Col md={3} className="mb-4">
              <Card className="h-100 text-center shadow-sm hover-card border-0">
                <Card.Body>
                  <div className="icon-wrapper mb-3">
                    <FaUserMd className="service-icon" />
                  </div>
                  <Card.Title>Expert Doctors</Card.Title>
                  <Card.Text>
                    Our team of experienced and specialized doctors provide the best care possible.
                  </Card.Text>
                  <Link to="/doctors" className="btn btn-sm btn-outline-primary rounded-pill mt-3">
                    Learn More <FaArrowRight className="ms-1" size={12} />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="h-100 text-center shadow-sm hover-card border-0">
                <Card.Body>
                  <div className="icon-wrapper mb-3">
                    <FaCalendarCheck className="service-icon" />
                  </div>
                  <Card.Title>Easy Appointments</Card.Title>
                  <Card.Text>
                    Book appointments online with your preferred doctor at your convenient time.
                  </Card.Text>
                  <Link to="/login" className="btn btn-sm btn-outline-primary rounded-pill mt-3">
                    Book Now <FaArrowRight className="ms-1" size={12} />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="h-100 text-center shadow-sm hover-card border-0">
                <Card.Body>
                  <div className="icon-wrapper mb-3">
                    <FaHospital className="service-icon" />
                  </div>
                  <Card.Title>Modern Facilities</Card.Title>
                  <Card.Text>
                    State-of-the-art equipment and facilities to provide the best healthcare services.
                  </Card.Text>
                  <Link to="/services" className="btn btn-sm btn-outline-primary rounded-pill mt-3">
                    View Facilities <FaArrowRight className="ms-1" size={12} />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="mb-4">
              <Card className="h-100 text-center shadow-sm hover-card border-0">
                <Card.Body>
                  <div className="icon-wrapper mb-3">
                    <FaUserPlus className="service-icon" />
                  </div>
                  <Card.Title>24/7 Support</Card.Title>
                  <Card.Text>
                    Our dedicated team is available round the clock to assist you with any medical needs.
                  </Card.Text>
                  <Link to="/contact" className="btn btn-sm btn-outline-primary rounded-pill mt-3">
                    Contact Us <FaArrowRight className="ms-1" size={12} />
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Featured Doctors */}
      <Container className="py-5">
        <h2 className="section-title text-center mb-5">Our Expert Doctors</h2>
        <Row>
          {[
            {
              name: "Dr. Sarah Johnson",
              specialty: "Cardiologist",
              image: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg"
            },
            {
              name: "Dr. Michael Chen",
              specialty: "Neurologist",
              image: "https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg"
            },
            {
              name: "Dr. Emily Rodriguez",
              specialty: "Pediatrician",
              image: "https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg"
            },
            {
              name: "Dr. James Wilson",
              specialty: "Orthopedic Surgeon",
              image: "https://img.freepik.com/free-photo/portrait-doctor_144627-39390.jpg"
            }
          ].map((doctor, index) => (
            <Col lg={3} md={6} className="mb-4" key={index}>
              <Card className="doctor-card border-0">
                <div className="doctor-img-wrapper">
                  <Card.Img 
                    variant="top" 
                    src={doctor.image} 
                    className="doctor-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/300x300/1a73e8/FFF?text=${doctor.name}`;
                    }}
                  />
                </div>
                <Card.Body className="text-center">
                  <Card.Title>{doctor.name}</Card.Title>
                  <p className="doctor-specialty">{doctor.specialty}</p>
                  <div className="doctor-rating mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <Button variant="outline-primary" size="sm" className="rounded-pill">
                    View Profile
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Link to="/doctors">
            <Button variant="primary" className="rounded-pill">
              View All Doctors <FaArrowRight className="ms-2" />
            </Button>
          </Link>
        </div>
      </Container>

      {/* Testimonials Section */}
      <div className="bg-light py-5">
        <Container>
          <h2 className="section-title text-center mb-5">What Our Patients Say</h2>
          <Carousel className="testimonial-carousel" indicators={false}>
            {[
              {
                name: "John Smith",
                text: "The doctors and staff at Global Healthcare Hospital are amazing. They provided excellent care during my treatment.",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Sarah Johnson",
                text: "I was impressed by the modern facilities and the caring attitude of the medical staff. Highly recommended!",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Michael Brown",
                text: "The online appointment system is so convenient. I could easily book an appointment with my preferred doctor.",
                image: "https://randomuser.me/api/portraits/men/22.jpg"
              }
            ].map((testimonial, index) => (
              <Carousel.Item key={index}>
                <div className="testimonial-item text-center p-4">
                  <FaQuoteLeft className="text-primary mb-3" size={30} />
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="testimonial-avatar"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/70x70/1a73e8/FFF?text=${testimonial.name.charAt(0)}`;
                    }}
                  />
                  <div className="testimonial-content">
                    <p className="lead mb-3">
                      {testimonial.text}
                    </p>
                    <h5 className="mb-0">{testimonial.name}</h5>
                    <p className="text-muted">Patient</p>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </div>

      {/* CTA Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="text-center shadow border-0 bg-primary text-white rounded-lg">
              <Card.Body className="p-5">
                <h2 className="mb-3">Ready to experience our healthcare services?</h2>
                <p className="lead mb-4">
                  Register now to book appointments with our expert doctors and access our world-class healthcare services.
                </p>
                <Link to="/register">
                  <Button variant="light" size="lg" className="rounded-pill">
                    Register Now <FaArrowRight className="ms-2" />
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home; 