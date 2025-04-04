import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer py-5">
      <Container>
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <div className="footer-brand mb-3 d-flex align-items-center">
              <FaHeart className="text-danger me-2" size={24} />
              <span className="fw-bold fs-4 text-white">Hunger Help</span>
            </div>
            <p className="footer-description">
              Connecting food donors with NGOs to reduce food waste and feed those in 
              need. Join our community and make a difference today.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaGithub />
              </a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/ngos">NGOs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/donate">Donate</Link></li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Contact Us</h5>
            <ul className="footer-contact">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                123 Food Street, Pune, Maharashtra
              </li>
              <li>
                <FaPhone className="contact-icon" />
                +91 8805322305
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                mborate18@gmail.com
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6}>
            <h5 className="footer-heading">Portfolio</h5>
            <p className="mb-2">Check out Mayuresh Borate's portfolio to learn more about his work and projects.</p>
            <a href="https://mayureshborate.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline-light mt-2">
              View Portfolio
            </a>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <div className="text-center mt-4">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Hunger Help. All rights reserved. Designed with 
            <FaHeart className="text-danger mx-1" size={14} /> by Mayuresh Borate
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 