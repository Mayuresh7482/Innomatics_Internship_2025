import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaUserMd, FaHospital, FaStethoscope, FaArrowRight } from 'react-icons/fa';

const Cardiology = () => {
  return (
    <div className="service-detail-page py-5 mt-5">
      <Container>
        <div className="service-header mb-5">
          <h1 className="section-title text-center mb-4">
            <FaHeartbeat className="me-3 text-primary" />
            Cardiology Department
          </h1>
          <p className="text-center lead mb-0">
            Comprehensive care for all heart conditions with advanced technology and expert specialists
          </p>
        </div>

        <Row className="mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <img 
              src="https://img.freepik.com/free-photo/doctor-examining-patient-with-stethoscope-clinic_1170-2166.jpg" 
              alt="Cardiology Department" 
              className="img-fluid rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400/1a73e8/FFF?text=Cardiology";
              }}
            />
          </Col>
          <Col lg={6}>
            <h2 className="mb-4">About Our Cardiology Department</h2>
            <p>
              Our Cardiology Department is dedicated to providing comprehensive care for patients with cardiovascular diseases. 
              Our team of experienced cardiologists uses state-of-the-art technology to diagnose and treat various heart conditions, 
              ensuring the best possible outcomes for our patients.
            </p>
            <p>
              We offer a wide range of services, from preventive care and diagnostic tests to advanced treatments and rehabilitation programs. 
              Our patient-centered approach ensures that each patient receives personalized care tailored to their specific needs.
            </p>
            <Link to="/patient/doctors">
              <Button variant="primary" className="rounded-pill mt-3">
                Find a Cardiologist <FaArrowRight className="ms-2" />
              </Button>
            </Link>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="mb-4">Our Cardiology Services</h2>
            <Row>
              {[
                {
                  title: 'Diagnostic Services',
                  icon: <FaStethoscope className="service-icon text-primary" />,
                  items: [
                    'Electrocardiogram (ECG/EKG)',
                    'Echocardiogram',
                    'Stress Testing',
                    'Holter Monitoring',
                    'Cardiac CT and MRI',
                    'Cardiac Catheterization'
                  ]
                },
                {
                  title: 'Treatment Services',
                  icon: <FaHospital className="service-icon text-primary" />,
                  items: [
                    'Medication Management',
                    'Angioplasty and Stenting',
                    'Pacemaker Implantation',
                    'Cardioversion',
                    'Heart Valve Repair/Replacement',
                    'Cardiac Rehabilitation'
                  ]
                },
                {
                  title: 'Preventive Care',
                  icon: <FaHeartbeat className="service-icon text-primary" />,
                  items: [
                    'Heart Health Screenings',
                    'Cholesterol Management',
                    'Blood Pressure Control',
                    'Lifestyle Counseling',
                    'Nutrition Guidance',
                    'Exercise Programs'
                  ]
                }
              ].map((service, index) => (
                <Col lg={4} md={6} className="mb-4" key={index}>
                  <Card className="h-100 shadow-sm hover-card border-0">
                    <Card.Body>
                      <div className="text-center mb-3">
                        {service.icon}
                      </div>
                      <Card.Title className="text-center mb-4">{service.title}</Card.Title>
                      <ListGroup variant="flush">
                        {service.items.map((item, idx) => (
                          <ListGroup.Item key={idx} className="border-0 py-2">
                            <FaArrowRight className="me-2 text-primary" size={12} />
                            {item}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="mb-4">Meet Our Cardiology Team</h2>
            <Row>
              {[
                {
                  name: 'Dr. Sarah Johnson',
                  title: 'Head of Cardiology',
                  image: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
                  description: 'Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating complex heart conditions.'
                },
                {
                  name: 'Dr. Michael Chen',
                  title: 'Interventional Cardiologist',
                  image: 'https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg',
                  description: 'Dr. Chen specializes in minimally invasive procedures to treat heart disease, including angioplasty and stenting.'
                },
                {
                  name: 'Dr. Emily Rodriguez',
                  title: 'Cardiac Electrophysiologist',
                  image: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg',
                  description: 'Dr. Rodriguez is an expert in diagnosing and treating heart rhythm disorders and managing pacemakers.'
                }
              ].map((doctor, index) => (
                <Col lg={4} md={6} className="mb-4" key={index}>
                  <Card className="doctor-card border-0">
                    <Card.Img 
                      variant="top" 
                      src={doctor.image} 
                      className="doctor-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/300x300/1a73e8/FFF?text=${doctor.name}`;
                      }}
                    />
                    <Card.Body className="text-center">
                      <Card.Title>{doctor.name}</Card.Title>
                      <p className="doctor-specialty">{doctor.title}</p>
                      <Card.Text>{doctor.description}</Card.Text>
                      <Button variant="outline-primary" size="sm" className="rounded-pill">
                        View Profile
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <div className="text-center mt-5">
          <h3 className="mb-4">Need a Cardiology Consultation?</h3>
          <p className="lead mb-4">
            Our team of expert cardiologists is ready to provide you with the best care possible.
          </p>
          <Link to="/patient/doctors">
            <Button variant="primary" size="lg" className="rounded-pill">
              Book an Appointment <FaArrowRight className="ms-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Cardiology; 