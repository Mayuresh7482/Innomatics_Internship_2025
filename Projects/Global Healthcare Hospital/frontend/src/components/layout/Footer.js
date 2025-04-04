import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaGithub, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <div className="footer-about">
              <h4 className="footer-title">Global Healthcare</h4>
              <p className="mb-4">
                Providing world-class healthcare services with compassion and care. Our mission is to improve the health and wellbeing of our community.
              </p>
              <div className="social-icons d-flex">
                <a href="https://www.facebook.com/mayuresh.borate.1" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaFacebookF />
                </a>
                <a href="https://github.com/Mayuresh7482" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaGithub />
                </a>
                <a href="https://www.instagram.com/mayureshborate5080" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaInstagram />
                </a>
                <a href="https://www.linkedin.com/in/mayuresh-borate-8a732b1b3" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaLinkedinIn />
                </a>
                <a href="https://mayureshborateportfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FaGlobe />
                </a>
              </div>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h4 className="footer-title">Quick Links</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/about">About Us</Link>
              <Link to="/services">Services</Link>
              <Link to="/doctors">Doctors</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h4 className="footer-title">Our Services</h4>
            <div className="footer-links">
              <Link to="/services/cardiology">Cardiology</Link>
              <Link to="/services/neurology">Neurology</Link>
              <Link to="/services/orthopedics">Orthopedics</Link>
              <Link to="/services/pediatrics">Pediatrics</Link>
              <Link to="/services/gynecology">Gynecology</Link>
            </div>
          </Col>
          
          <Col lg={3} md={6}>
            <h4 className="footer-title">Contact Info</h4>
            <div className="footer-contact">
              <p>
                <FaMapMarkerAlt />
                <span>123 Healthcare St, Medical City, 10001</span>
              </p>
              <p>
                <FaPhoneAlt />
                <span>+1 (123) 456-7890</span>
              </p>
              <p>
                <FaEnvelope />
                <span>info@globalhealthcare.com</span>
              </p>
              <p>
                <FaClock />
                <span>Mon-Fri: 8:00 AM - 8:00 PM</span>
              </p>
            </div>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <p className="mb-0">
            &copy; {currentYear} Global Healthcare Hospital. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 