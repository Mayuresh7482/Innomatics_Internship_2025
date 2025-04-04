import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBaby, FaHospital, FaStethoscope, FaArrowRight } from 'react-icons/fa';

const Pediatrics = () => {
  return (
    <div className="service-detail-page py-5 mt-5">
      <Container>
        <div className="service-header mb-5">
          <h1 className="section-title text-center mb-4">
            <FaBaby className="me-3 text-primary" />
            Pediatrics Department
          </h1>
          <p className="text-center lead mb-0">
            Specialized healthcare for infants, children, and adolescents in a child-friendly environment
          </p>
        </div>

        <Row className="mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <img 
              src="https://img.freepik.com/free-photo/doctor-child-patient-hospital_23-2148968951.jpg" 
              alt="Pediatrics Department" 
              className="img-fluid rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400/1a73e8/FFF?text=Pediatrics";
              }}
            />
          </Col>
          <Col lg={6}>
            <h2 className="mb-4">About Our Pediatrics Department</h2>
            <p>
              Our Pediatrics Department is dedicated to providing comprehensive healthcare services for children from 
              birth through adolescence. Our team of experienced pediatricians and specialists focuses on the unique 
              physical, emotional, and developmental needs of young patients in a warm, friendly environment.
            </p>
            <p>
              We offer a wide range of services, from routine check-ups and vaccinations to specialized care for 
              chronic conditions and developmental disorders. Our child-centered approach ensures that each young 
              patient receives personalized care in a setting designed to make medical visits less stressful.
            </p>
            <Link to="/patient/doctors">
              <Button variant="primary" className="rounded-pill mt-3">
                Find a Pediatrician <FaArrowRight className="ms-2" />
              </Button>
            </Link>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="mb-4">Our Pediatric Services</h2>
            <Row>
              {[
                {
                  title: 'Preventive Care',
                  icon: <FaStethoscope className="service-icon text-primary" />,
                  items: [
                    'Well-Child Visits',
                    'Immunizations',
                    'Growth and Development Monitoring',
                    'Vision and Hearing Screenings',
                    'Nutrition Counseling',
                    'Safety Education'
                  ]
                },
                {
                  title: 'Treatment Services',
                  icon: <FaHospital className="service-icon text-primary" />,
                  items: [
                    'Acute Illness Care',
                    'Chronic Disease Management',
                    'Allergy and Asthma Treatment',
                    'Behavioral Health Services',
                    'Pediatric Surgery Consultation',
                    'Emergency Care'
                  ]
                },
                {
                  title: 'Specialized Services',
                  icon: <FaBaby className="service-icon text-primary" />,
                  items: [
                    'Newborn Care',
                    'Developmental Assessments',
                    'ADHD Evaluation and Management',
                    'Adolescent Medicine',
                    'Sports Physicals',
                    'School Health Services'
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
            <h2 className="mb-4">Meet Our Pediatric Team</h2>
            <Row>
              {[
                {
                  name: 'Dr. Emily Davis',
                  title: 'Head of Pediatrics',
                  image: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg',
                  description: 'Dr. Davis is a board-certified pediatrician with over 12 years of experience in providing comprehensive care for children of all ages.'
                },
                {
                  name: 'Dr. Jason Martinez',
                  title: 'Pediatric Allergist',
                  image: 'https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg',
                  description: 'Dr. Martinez specializes in pediatric allergies and asthma, helping children manage these conditions for better quality of life.'
                },
                {
                  name: 'Dr. Sophia Lee',
                  title: 'Developmental Pediatrician',
                  image: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg',
                  description: 'Dr. Lee focuses on developmental disorders and behavioral health, providing support for children with special needs and their families.'
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
          <h3 className="mb-4">Need a Pediatric Consultation?</h3>
          <p className="lead mb-4">
            Our team of expert pediatricians is ready to provide your child with the best care possible.
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

export default Pediatrics; 