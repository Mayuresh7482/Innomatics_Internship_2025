import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Tab, Tabs, Table, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { FaStar, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUserMd, FaArrowLeft } from 'react-icons/fa';

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    setTimeout(() => {
      const mockDoctor = {
        id: parseInt(id),
        name: 'Dr. John Smith',
        specialization: 'Cardiology',
        experience: 15,
        fees: 150,
        rating: 4.8,
        image: 'https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg',
        email: 'john.smith@example.com',
        phone: '(123) 456-7890',
        address: '123 Medical Center, New York, NY',
        education: [
          { degree: 'MD', institution: 'Harvard Medical School', year: '2005' },
          { degree: 'Residency in Cardiology', institution: 'Mayo Clinic', year: '2009' },
          { degree: 'Fellowship in Interventional Cardiology', institution: 'Cleveland Clinic', year: '2011' }
        ],
        about: 'Dr. John Smith is a board-certified cardiologist with over 15 years of experience in treating various heart conditions. He specializes in interventional cardiology and has performed over 1,000 cardiac procedures. Dr. Smith is known for his patient-centered approach and dedication to providing the highest quality of care.',
        services: [
          'Cardiac Consultation',
          'Electrocardiogram (ECG)',
          'Echocardiogram',
          'Stress Testing',
          'Holter Monitoring',
          'Cardiac Catheterization'
        ],
        availability: [
          { day: 'Monday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
          { day: 'Wednesday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
          { day: 'Friday', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] }
        ],
        reviews: [
          { id: 1, patient: 'Jane Doe', rating: 5, comment: 'Excellent doctor! Very thorough and caring.', date: '2023-05-15' },
          { id: 2, patient: 'Robert Johnson', rating: 4, comment: 'Good experience overall. Explained everything clearly.', date: '2023-04-22' },
          { id: 3, patient: 'Emily Wilson', rating: 5, comment: 'Dr. Smith is amazing. He took the time to address all my concerns.', date: '2023-03-10' }
        ]
      };
      
      setDoctor(mockDoctor);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 mt-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  if (!doctor) {
    return (
      <Container className="py-5 mt-5">
        <div className="text-center py-5">
          <h3>Doctor not found</h3>
          <Link to="/patient/doctors">
            <Button variant="primary" className="mt-3 rounded-pill">
              <FaArrowLeft className="me-2" /> Back to Doctors List
            </Button>
          </Link>
        </div>
      </Container>
    );
  }

  // Generate star rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < Math.floor(rating) ? "text-warning" : "text-muted"} />
    ));
  };

  return (
    <Container className="py-5 mt-5">
      <Link to="/patient/doctors" className="btn btn-outline-primary mb-4 rounded-pill">
        <FaArrowLeft className="me-2" /> Back to Doctors List
      </Link>
      
      <Row>
        <Col lg={4} md={5}>
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body className="text-center">
              <div className="doctor-profile-img-wrapper mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="doctor-profile-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/300x300/1a73e8/FFF?text=${doctor.name.split(' ')[1][0]}${doctor.name.split(' ')[2] ? doctor.name.split(' ')[2][0] : ''}`;
                  }}
                />
              </div>
              <h3>{doctor.name}</h3>
              <p className="doctor-specialty">{doctor.specialization}</p>
              <div className="d-flex justify-content-center mb-3">
                {renderStars(doctor.rating)}
                <span className="ms-2">{doctor.rating}/5</span>
              </div>
              <div className="d-flex justify-content-center mb-3">
                <Badge bg="primary" className="me-2 px-3 py-2">
                  {doctor.experience} Years Experience
                </Badge>
                <Badge bg="success" className="px-3 py-2">
                  ${doctor.fees} Fee
                </Badge>
              </div>
              <Link to={`/patient/book-appointment/${doctor.id}`}>
                <Button variant="primary" className="w-100 rounded-pill">
                  <FaCalendarAlt className="me-2" /> Book Appointment
                </Button>
              </Link>
            </Card.Body>
          </Card>
          
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <FaClock className="me-2" /> Available Days
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {doctor.availability.map((avail, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center border-0 py-3">
                    <strong>{avail.day}</strong>
                    <span className="text-success">{avail.slots.length} slots available</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              <FaUserMd className="me-2" /> Contact Information
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="border-0 py-3">
                  <div className="d-flex">
                    <div className="me-3">
                      <FaPhone className="text-primary" />
                    </div>
                    <div>
                      <small className="text-muted d-block">Phone</small>
                      {doctor.phone}
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="border-0 py-3">
                  <div className="d-flex">
                    <div className="me-3">
                      <FaEnvelope className="text-primary" />
                    </div>
                    <div>
                      <small className="text-muted d-block">Email</small>
                      {doctor.email}
                    </div>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="border-0 py-3">
                  <div className="d-flex">
                    <div className="me-3">
                      <FaMapMarkerAlt className="text-primary" />
                    </div>
                    <div>
                      <small className="text-muted d-block">Address</small>
                      {doctor.address}
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={8} md={7}>
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              About Doctor
            </Card.Header>
            <Card.Body>
              <p>{doctor.about}</p>
            </Card.Body>
          </Card>
          
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              Education & Training
            </Card.Header>
            <Card.Body>
              <Table responsive borderless>
                <tbody>
                  {doctor.education.map((edu, index) => (
                    <tr key={index}>
                      <td width="30%">
                        <strong>{edu.year}</strong>
                      </td>
                      <td>
                        <div>{edu.degree}</div>
                        <small className="text-muted">{edu.institution}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              Services
            </Card.Header>
            <Card.Body>
              <Row>
                {doctor.services.map((service, index) => (
                  <Col md={6} key={index}>
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        <FaStar className="text-primary" />
                      </div>
                      <div>{service}</div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
          
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary text-white">
              Patient Reviews
            </Card.Header>
            <Card.Body>
              {doctor.reviews.map((review) => (
                <div key={review.id} className="mb-4 pb-4 border-bottom">
                  <div className="d-flex justify-content-between mb-2">
                    <h5>{review.patient}</h5>
                    <small className="text-muted">{review.date}</small>
                  </div>
                  <div className="mb-2">
                    {renderStars(review.rating)}
                    <span className="ms-2">{review.rating}/5</span>
                  </div>
                  <p className="mb-0">{review.comment}</p>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDetails; 