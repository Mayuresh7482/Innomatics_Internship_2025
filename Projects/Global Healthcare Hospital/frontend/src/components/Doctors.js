import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaSearch, FaFilter, FaUserMd } from 'react-icons/fa';

const Doctors = () => {
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
          image: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
          education: 'MD, Cardiology, Harvard Medical School',
          description: 'Dr. Smith is a board-certified cardiologist with over 15 years of experience in treating various heart conditions.'
        },
        {
          id: 2,
          name: 'Dr. Sarah Johnson',
          specialization: 'Neurology',
          experience: 12,
          fees: 180,
          rating: 4.9,
          image: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
          education: 'MD, Neurology, Johns Hopkins University',
          description: 'Dr. Johnson specializes in neurological disorders and has extensive experience in treating conditions like epilepsy and stroke.'
        },
        {
          id: 3,
          name: 'Dr. Michael Chen',
          specialization: 'Orthopedics',
          experience: 10,
          fees: 160,
          rating: 4.7,
          image: 'https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg',
          education: 'MD, Orthopedic Surgery, Stanford University',
          description: 'Dr. Chen is an orthopedic surgeon specializing in sports injuries and joint replacements.'
        },
        {
          id: 4,
          name: 'Dr. Emily Rodriguez',
          specialization: 'Pediatrics',
          experience: 8,
          fees: 120,
          rating: 4.9,
          image: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg',
          education: 'MD, Pediatrics, University of California',
          description: 'Dr. Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children of all ages.'
        },
        {
          id: 5,
          name: 'Dr. David Wilson',
          specialization: 'Dermatology',
          experience: 14,
          fees: 170,
          rating: 4.6,
          image: 'https://img.freepik.com/free-photo/portrait-doctor_144627-39390.jpg',
          education: 'MD, Dermatology, Yale University',
          description: 'Dr. Wilson is a dermatologist with expertise in treating various skin conditions and performing cosmetic procedures.'
        },
        {
          id: 6,
          name: 'Dr. Lisa Wang',
          specialization: 'Gynecology',
          experience: 11,
          fees: 160,
          rating: 4.8,
          image: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg',
          education: 'MD, Obstetrics and Gynecology, Columbia University',
          description: 'Dr. Wang is a gynecologist specializing in women\'s reproductive health and prenatal care.'
        },
        {
          id: 7,
          name: 'Dr. Robert Brown',
          specialization: 'Cardiology',
          experience: 20,
          fees: 200,
          rating: 4.9,
          image: 'https://img.freepik.com/free-photo/handsome-young-male-doctor-with-stethoscope-standing-against-blue-background_662251-337.jpg',
          education: 'MD, Cardiology, Mayo Clinic',
          description: 'Dr. Brown is a senior cardiologist with extensive experience in interventional cardiology and heart failure management.'
        },
        {
          id: 8,
          name: 'Dr. Jennifer Lee',
          specialization: 'Neurology',
          experience: 9,
          fees: 170,
          rating: 4.7,
          image: 'https://img.freepik.com/free-photo/doctor-standing-with-folder-stethoscope_1291-16.jpg',
          education: 'MD, Neurology, University of Pennsylvania',
          description: 'Dr. Lee specializes in headache disorders and multiple sclerosis, providing personalized treatment plans for her patients.'
        }
      ];
      
      setDoctors(mockDoctors);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = specialization === '' || doctor.specialization === specialization;
    
    return matchesSearch && matchesSpecialization;
  });

  const specializations = [...new Set(doctors.map(doctor => doctor.specialization))];

  return (
    <div className="doctors-page py-5 mt-5">
      <Container>
        <div className="text-center mb-5">
          <h1 className="section-title">Our Expert Doctors</h1>
          <p className="lead">
            Meet our team of experienced and specialized doctors dedicated to providing the best healthcare services.
          </p>
        </div>

        <Row className="mb-4">
          <Col md={6} lg={4} className="mb-3 mb-md-0">
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search by name or specialization"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={6} lg={3}>
            <InputGroup>
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

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading doctors...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-5">
            <FaUserMd size={50} className="text-muted mb-3" />
            <h3>No doctors found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <Row>
            {filteredDoctors.map(doctor => (
              <Col lg={3} md={6} className="mb-4" key={doctor.id}>
                <Card className="doctor-card border-0 h-100">
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
                  <Card.Body>
                    <Card.Title>{doctor.name}</Card.Title>
                    <p className="doctor-specialty">{doctor.specialization}</p>
                    <div className="doctor-rating mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(doctor.rating) ? 'text-warning' : 'text-muted'} />
                      ))}
                      <span className="ms-1">{doctor.rating}</span>
                    </div>
                    <div className="doctor-info mb-3">
                      <p className="mb-1"><strong>Experience:</strong> {doctor.experience} years</p>
                      <p className="mb-1"><strong>Fees:</strong> ${doctor.fees}</p>
                    </div>
                    <Card.Text className="doctor-description">
                      {doctor.description}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 pt-0">
                    <Link to="/login">
                      <Button variant="primary" className="w-100 rounded-pill">
                        Book Appointment
                      </Button>
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Doctors; 