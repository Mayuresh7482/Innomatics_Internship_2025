import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaSearch, FaFilter } from 'react-icons/fa';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    setTimeout(() => {
      const mockDoctors = [
        {
          id: 1,
          name: 'Dr. John Smith',
          specialization: 'Cardiology',
          experience: 15,
          fees: 150,
          rating: 4.8,
          image: 'https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg'
        },
        {
          id: 2,
          name: 'Dr. Sarah Johnson',
          specialization: 'Dermatology',
          experience: 10,
          fees: 130,
          rating: 4.7,
          image: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg'
        },
        {
          id: 3,
          name: 'Dr. Michael Brown',
          specialization: 'Neurology',
          experience: 12,
          fees: 160,
          rating: 4.9,
          image: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg'
        },
        {
          id: 4,
          name: 'Dr. Emily Davis',
          specialization: 'Pediatrics',
          experience: 8,
          fees: 120,
          rating: 4.6,
          image: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg'
        },
        {
          id: 5,
          name: 'Dr. Robert Wilson',
          specialization: 'Orthopedics',
          experience: 14,
          fees: 170,
          rating: 4.8,
          image: 'https://img.freepik.com/free-photo/portrait-doctor_144627-39390.jpg'
        },
        {
          id: 6,
          name: 'Dr. Jennifer Lee',
          specialization: 'Gynecology',
          experience: 11,
          fees: 140,
          rating: 4.7,
          image: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg'
        }
      ];
      
      setDoctors(mockDoctors);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter doctors based on search term and specialization
  const filteredDoctors = doctors.filter(doctor => {
    return (
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (specialization === '' || doctor.specialization === specialization)
    );
  });

  // Get unique specializations for filter dropdown
  const specializations = [...new Set(doctors.map(doctor => doctor.specialization))];

  return (
    <Container>
      <h2 className="section-title mb-4">Find Doctors</h2>
      
      {/* Search and Filter */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <Row>
            <Col md={6}>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search doctors by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FaFilter />
                </InputGroup.Text>
                <Form.Select
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                >
                  <option value="">All Specializations</option>
                  {specializations.map((spec, index) => (
                    <option key={index} value={spec}>{spec}</option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      {/* Doctor List */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Row>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map(doctor => (
              <Col lg={4} md={6} className="mb-4" key={doctor.id}>
                <Card className="doctor-card border-0 h-100">
                  <div className="doctor-img-wrapper">
                    <Card.Img 
                      variant="top" 
                      src={doctor.image} 
                      className="doctor-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/300x300/1a73e8/FFF?text=${doctor.name.split(' ')[1][0]}${doctor.name.split(' ')[2] ? doctor.name.split(' ')[2][0] : ''}`;
                      }}
                    />
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title>{doctor.name}</Card.Title>
                    <p className="doctor-specialty">{doctor.specialization}</p>
                    <div className="doctor-rating mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(doctor.rating) ? "text-warning" : "text-muted"} />
                      ))}
                      <span className="ms-2">{doctor.rating}</span>
                    </div>
                    <Row className="mb-3 text-center">
                      <Col>
                        <small className="text-muted d-block">Experience</small>
                        <span>{doctor.experience} years</span>
                      </Col>
                      <Col>
                        <small className="text-muted d-block">Fees</small>
                        <span>${doctor.fees}</span>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-between mt-auto">
                      <Link to={`/patient/doctors/${doctor.id}`}>
                        <Button variant="outline-primary" className="rounded-pill">
                          View Profile
                        </Button>
                      </Link>
                      <Link to={`/patient/book-appointment/${doctor.id}`}>
                        <Button variant="primary" className="rounded-pill">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <div className="text-center py-5">
                <h4>No doctors found matching your criteria</h4>
                <p>Try adjusting your search or filter</p>
              </div>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default DoctorList; 