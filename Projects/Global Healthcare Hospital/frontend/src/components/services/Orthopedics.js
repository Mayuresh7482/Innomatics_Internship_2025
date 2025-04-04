import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBone, FaHospital, FaStethoscope, FaArrowRight } from 'react-icons/fa';

const Orthopedics = () => {
  return (
    <div className="service-detail-page py-5 mt-5">
      <Container>
        <div className="service-header mb-5">
          <h1 className="section-title text-center mb-4">
            <FaBone className="me-3 text-primary" />
            Orthopedics Department
          </h1>
          <p className="text-center lead mb-0">
            Specialized care for bone, joint, and muscle conditions with advanced surgical and non-surgical treatments
          </p>
        </div>

        <Row className="mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <img 
              src="https://img.freepik.com/free-photo/doctor-examining-x-ray-office_23-2148868646.jpg" 
              alt="Orthopedics Department" 
              className="img-fluid rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400/1a73e8/FFF?text=Orthopedics";
              }}
            />
          </Col>
          <Col lg={6}>
            <h2 className="mb-4">About Our Orthopedics Department</h2>
            <p>
              Our Orthopedics Department specializes in the diagnosis, treatment, prevention, and rehabilitation of 
              disorders, injuries, and diseases of the musculoskeletal system. Our team of experienced orthopedic 
              surgeons and specialists provides comprehensive care for conditions affecting the bones, joints, 
              ligaments, tendons, and muscles.
            </p>
            <p>
              We offer a wide range of services, from minimally invasive procedures to complex reconstructive surgeries, 
              as well as non-surgical treatments and rehabilitation programs. Our patient-centered approach ensures 
              that each patient receives personalized care tailored to their specific needs.
            </p>
            <Link to="/patient/doctors">
              <Button variant="primary" className="rounded-pill mt-3">
                Find an Orthopedic Specialist <FaArrowRight className="ms-2" />
              </Button>
            </Link>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="mb-4">Our Orthopedic Services</h2>
            <Row>
              {[
                {
                  title: 'Diagnostic Services',
                  icon: <FaStethoscope className="service-icon text-primary" />,
                  items: [
                    'X-rays and Imaging',
                    'MRI and CT Scans',
                    'Bone Density Testing',
                    'Arthroscopy',
                    'Electromyography (EMG)',
                    'Gait Analysis'
                  ]
                },
                {
                  title: 'Treatment Services',
                  icon: <FaHospital className="service-icon text-primary" />,
                  items: [
                    'Joint Replacement Surgery',
                    'Fracture Care',
                    'Sports Medicine',
                    'Arthroscopic Surgery',
                    'Spine Surgery',
                    'Hand and Foot Surgery'
                  ]
                },
                {
                  title: 'Rehabilitation Services',
                  icon: <FaBone className="service-icon text-primary" />,
                  items: [
                    'Physical Therapy',
                    'Occupational Therapy',
                    'Pain Management',
                    'Custom Orthotics',
                    'Bracing and Casting',
                    'Post-Surgical Rehabilitation'
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
            <h2 className="mb-4">Meet Our Orthopedic Team</h2>
            <Row>
              {[
                {
                  name: 'Dr. Thomas Wilson',
                  title: 'Head of Orthopedics',
                  image: 'https://img.freepik.com/free-photo/portrait-doctor_144627-39390.jpg',
                  description: 'Dr. Wilson is a board-certified orthopedic surgeon with over 15 years of experience in joint replacement and sports medicine.'
                },
                {
                  name: 'Dr. Maria Garcia',
                  title: 'Spine Specialist',
                  image: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg',
                  description: 'Dr. Garcia specializes in spine surgery and has pioneered minimally invasive techniques for treating back and neck conditions.'
                },
                {
                  name: 'Dr. David Kim',
                  title: 'Sports Medicine Specialist',
                  image: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
                  description: 'Dr. Kim is an expert in sports-related injuries and has worked with professional athletes to help them return to peak performance.'
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
          <h3 className="mb-4">Need an Orthopedic Consultation?</h3>
          <p className="lead mb-4">
            Our team of expert orthopedic specialists is ready to provide you with the best care possible.
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

export default Orthopedics; 