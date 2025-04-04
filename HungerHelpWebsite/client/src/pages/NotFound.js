import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={6}>
          <FaExclamationTriangle className="text-warning mb-4" size={80} />
          <h1 className="mb-3">404 - Page Not Found</h1>
          <p className="lead mb-4">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Button as={Link} to="/" variant="primary" size="lg">
            <FaHome className="me-2" /> Back to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound; 