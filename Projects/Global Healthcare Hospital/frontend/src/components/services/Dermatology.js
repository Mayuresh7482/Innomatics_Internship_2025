import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaAllergies, FaHospital, FaStethoscope, FaArrowRight } from 'react-icons/fa';

const Dermatology = () => {
  return (
    <div className="service-detail-page py-5 mt-5">
      <Container>
        <div className="service-header mb-5">
          <h1 className="section-title text-center mb-4">
            <FaAllergies className="me-3 text-primary" />
            Dermatology Department
          </h1>
          <p className="text-center lead mb-0">
            Expert care for all conditions affecting the skin, hair, and nails with advanced diagnostic and treatment options
          </p>
        </div>

        <Row className="mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <img 
              src="https://img.freepik.com/free-photo/dermatologist-examining-patient-skin_23-2148868649.jpg" 
              alt="Dermatology Department" 
              className="img-fluid rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400/1a73e8/FFF?text=Dermatology";
              }}
            />
          </Col>
          <Col lg={6}>
            <h2 className="mb-4">About Our Dermatology Department</h2>
            <p>
              Our Dermatology Department specializes in the diagnosis and treatment of conditions affecting the skin, 
              hair, and nails. Our team of experienced dermatologists uses advanced technology and techniques to 
              provide comprehensive care for patients with a wide range of dermatological concerns.
            </p>
            <p>
              We offer a wide range of services, from medical dermatology for conditions like acne, eczema, and psoriasis 
              to cosmetic procedures and skin cancer screenings. Our patient-centered approach ensures that each patient 
              receives personalized care tailored to their specific needs.
            </p>
            <Link to="/patient/doctors">
              <Button variant="primary" className="rounded-pill mt-3">
                Find a Dermatologist <FaArrowRight className="ms-2" />
              </Button>
            </Link>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="mb-4">Our Dermatology Services</h2>
            <Row>
              {[
                {
                  title: 'Medical Dermatology',
                  icon: <FaStethoscope className="service-icon text-primary" />,
                  items: [
                    'Acne Treatment',
                    'Eczema Management',
                    'Psoriasis Care',
                    'Rosacea Treatment',
                    'Skin Infection Management',
                    'Allergy Testing'
                  ]
                },
                {
                  title: 'Surgical Dermatology',
                  icon: <FaHospital className="service-icon text-primary" />,
                  items: [
                    'Skin Cancer Screening',
                    'Mole Removal',
                    'Skin Biopsy',
                    'Cyst Removal',
                    'Mohs Surgery',
                    'Scar Revision'
                  ]
                },
                {
                  title: 'Cosmetic Dermatology',
                  icon: <FaAllergies className="service-icon text-primary" />,
                  items: [
                    'Botox and Fillers',
                    'Chemical Peels',
                    'Laser Therapy',
                    'Microdermabrasion',
                    'Anti-Aging Treatments',
                    'Hair Loss Treatment'
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
            <h2 className="mb-4">Meet Our Dermatology Team</h2>
            <Row>
              {[
                {
                  name: 'Dr. Sarah Johnson',
                  title: 'Head of Dermatology',
                  image: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
                  description: 'Dr. Johnson is a board-certified dermatologist with over 15 years of experience in treating various skin conditions and performing cosmetic procedures.'
                },
                {
                  name: 'Dr. James Wilson',
                  title: 'Surgical Dermatologist',
                  image: 'https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg',
                  description: 'Dr. Wilson specializes in skin cancer detection and treatment, including Mohs surgery for precise tumor removal with minimal scarring.'
                },
                {
                  name: 'Dr. Michelle Park',
                  title: 'Cosmetic Dermatologist',
                  image: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg',
                  description: 'Dr. Park is an expert in cosmetic dermatology, offering the latest techniques in anti-aging treatments and aesthetic enhancements.'
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
          <h3 className="mb-4">Need a Dermatology Consultation?</h3>
          <p className="lead mb-4">
            Our team of expert dermatologists is ready to provide you with the best care possible.
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

export default Dermatology; 