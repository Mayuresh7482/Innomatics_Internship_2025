import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaHandHoldingHeart, FaUsers, FaBuilding, FaHistory, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/About.css';
import { placeholders } from '../utils/generatePlaceholderImages';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="bg-primary-light py-5 mb-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0" data-aos="fade-right">
              <h1 className="display-4 fw-bold mb-4">About Hunger Help Pune</h1>
              <p className="lead mb-4">
                Connecting food donors with NGOs across Pune to reduce food waste and feed those in need.
              </p>
              <p className="mb-4">
                We are a community initiative based in Pune, Maharashtra, dedicated to fighting hunger 
                and reducing food waste through technology and community engagement.
              </p>
              <Button variant="primary" size="lg" as={Link} to="/contact" className="me-3">
                Contact Us
              </Button>
              <Button variant="outline-primary" size="lg" as={Link} to="/ngos">
                Partner NGOs
              </Button>
            </Col>
            <Col lg={6} data-aos="fade-left">
              <img 
                src={placeholders.aboutHero}
                alt="Food donation drive in Pune" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Mission & Vision */}
      <Container className="section" data-aos="fade-up">
        <Row className="mb-5">
          <Col lg={12} className="text-center">
            <h2 className="section-title">Our Mission & Vision</h2>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-4" data-aos="fade-up" data-aos-delay="100">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4 text-center">
                <div className="icon-wrapper mb-4">
                  <FaHandHoldingHeart className="text-primary" size={50} />
                </div>
                <Card.Title as="h3" className="fw-bold mb-3">Our Mission</Card.Title>
                <Card.Text>
                  To create a sustainable connection between food donors and NGOs in Pune, thereby 
                  reducing food waste and ensuring that surplus food reaches those who need it most.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4" data-aos="fade-up" data-aos-delay="200">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4 text-center">
                <div className="icon-wrapper mb-4">
                  <FaUsers className="text-primary" size={50} />
                </div>
                <Card.Title as="h3" className="fw-bold mb-3">Our Vision</Card.Title>
                <Card.Text>
                  A Pune where no one goes hungry and no food is wasted. We envision a city where 
                  the community comes together to ensure equitable distribution of food resources.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* About Pune */}
      <div className="bg-light-gray py-5 my-5">
        <Container className="section" data-aos="fade-up">
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0 order-lg-2" data-aos="fade-left">
              <h2 className="fw-bold mb-4">About Pune City</h2>
              <p className="mb-3">
                Pune, often called the "Oxford of the East," is Maharashtra's second-largest city and a 
                vibrant hub of education, industry, and culture, located about 150 km from Mumbai.
              </p>
              <p className="mb-3">
                Home to prestigious institutions like Pune University, COEP, and numerous IT parks, 
                the city blends traditional Maharashtrian culture with modern development.
              </p>
              <p className="mb-3">
                Despite its prosperity, Pune faces challenges of food insecurity, with many residents 
                in underprivileged areas struggling to access nutritious meals, particularly in regions 
                like Hadapsar, Yerawada, and parts of Pimpri-Chinchwad.
              </p>
              <p className="mb-3">
                The city's thriving restaurant scene, catering businesses, and large 
                events often generate substantial food surplus that could benefit those in need.
              </p>
              <div className="d-flex align-items-center mt-4">
                <FaMapMarkerAlt className="text-primary me-2" size={24} />
                <p className="mb-0 fw-bold">Located in Maharashtra, Western India</p>
              </div>
            </Col>
            <Col lg={6} className="order-lg-1" data-aos="fade-right">
              <img 
                src={placeholders.puneCity}
                alt="Pune City Skyline" 
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Our Story */}
      <Container className="section" data-aos="fade-up">
        <Row className="mb-5">
          <Col className="text-center">
            <h2 className="section-title">Our Story</h2>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0" data-aos="fade-right">
            <img 
              src={placeholders.ourStory}
              alt="Hunger Help Team" 
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col lg={6} data-aos="fade-left">
            <div className="d-flex align-items-center mb-4">
              <FaHistory className="text-primary me-3" size={30} />
              <h3 className="fw-bold mb-0">How We Started</h3>
            </div>
            <p className="mb-3">
              Hunger Help began in 2022 when a group of Pune University students witnessed large amounts 
              of food being wasted at a campus event while knowing that many in nearby communities struggled 
              with food insecurity.
            </p>
            <p className="mb-3">
              The initiative started as a simple WhatsApp group connecting college canteens with local 
              shelters. As word spread, restaurants and catering businesses across Pune joined our network.
            </p>
            <p className="mb-3">
              Today, we've evolved into a full-fledged platform connecting hundreds of food donors with 
              dozens of NGOs across Pune, facilitating the redistribution of thousands of meals every month 
              to areas including Kothrud, Aundh, and Koregaon Park.
            </p>
          </Col>
        </Row>
      </Container>

      {/* Impact */}
      <div className="bg-primary-light py-5 my-5">
        <Container className="section text-center" data-aos="fade-up">
          <h2 className="section-title mb-5">Our Impact in Pune</h2>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4" data-aos="fade-up" data-aos-delay="100">
              <div className="impact-stat">
                <h2 className="display-4 fw-bold text-primary mb-2">50,000+</h2>
                <p className="lead mb-0">Meals Delivered</p>
              </div>
            </Col>
            <Col md={4} className="mb-4" data-aos="fade-up" data-aos-delay="200">
              <div className="impact-stat">
                <h2 className="display-4 fw-bold text-primary mb-2">200+</h2>
                <p className="lead mb-0">Food Donors</p>
              </div>
            </Col>
            <Col md={4} className="mb-4" data-aos="fade-up" data-aos-delay="300">
              <div className="impact-stat">
                <h2 className="display-4 fw-bold text-primary mb-2">25+</h2>
                <p className="lead mb-0">Partner NGOs</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Team */}
      <Container className="section" data-aos="fade-up">
        <Row className="mb-5">
          <Col lg={12} className="text-center">
            <h2 className="section-title">Our Team</h2>
            <p className="lead mb-0">
              Meet the dedicated individuals behind Hunger Help Pune
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={3} md={6} className="mb-4" data-aos="fade-up" data-aos-delay="100">
            <Card className="team-card border-0 shadow-sm h-100">
              <Card.Img variant="top" src={placeholders.teamMember1} alt="Mayuresh Borate" />
              <Card.Body className="text-center">
                <Card.Title as="h5" className="fw-bold">Mayuresh Borate</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">Founder & CEO</Card.Subtitle>
                <Card.Text>
                  Developer and entrepreneur from Pune who initiated the food redistribution project
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4" data-aos="fade-up" data-aos-delay="200">
            <Card className="team-card border-0 shadow-sm h-100">
              <Card.Img variant="top" src={placeholders.teamMember2} alt="Priya Patel" />
              <Card.Body className="text-center">
                <Card.Title as="h5" className="fw-bold">Priya Patel</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">Operations Director</Card.Subtitle>
                <Card.Text>
                  Logistics expert who coordinates food pickups and deliveries across Pune
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4" data-aos="fade-up" data-aos-delay="300">
            <Card className="team-card border-0 shadow-sm h-100">
              <Card.Img variant="top" src={placeholders.teamMember3} alt="Rahul Deshmukh" />
              <Card.Body className="text-center">
                <Card.Title as="h5" className="fw-bold">Rahul Deshmukh</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">NGO Relations</Card.Subtitle>
                <Card.Text>
                  Works with NGOs throughout Pune to understand their needs and capabilities
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-4" data-aos="fade-up" data-aos-delay="400">
            <Card className="team-card border-0 shadow-sm h-100">
              <Card.Img variant="top" src={placeholders.teamMember4} alt="Meera Joshi" />
              <Card.Body className="text-center">
                <Card.Title as="h5" className="fw-bold">Meera Joshi</Card.Title>
                <Card.Subtitle className="mb-3 text-muted">Technology Lead</Card.Subtitle>
                <Card.Text>
                  Developed the platform connecting Pune's food donors with distribution partners
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CTA */}
      <div className="bg-primary text-white text-center py-5 my-5">
        <Container className="py-3" data-aos="fade-up">
          <h2 className="display-5 fw-bold mb-4">Join Our Mission in Pune</h2>
          <p className="lead mb-4">
            Whether you're a restaurant owner, an NGO, or simply someone who wants to make a difference in Pune,
            we welcome you to join our community.
          </p>
          <Button variant="light" size="lg" as={Link} to="/register" className="me-3 mb-3 mb-md-0">
            Sign Up
          </Button>
          <Button variant="outline-light" size="lg" as={Link} to="/contact">
            Contact Us
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default About; 