import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBrain, FaHospital, FaStethoscope, FaArrowRight } from 'react-icons/fa';

const Neurology = () => {
  return (
    <div className="service-detail-page py-5 mt-5">
      <Container>
        <div className="service-header mb-5">
          <h1 className="section-title text-center mb-4">
            <FaBrain className="me-3 text-primary" />
            Neurology Department
          </h1>
          <p className="text-center lead mb-0">
            Expert care for disorders of the brain, spinal cord, and nervous system with advanced diagnostic and treatment options
          </p>
        </div>

        <Row className="mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <img 
              src="https://img.freepik.com/free-photo/doctor-examining-brain-scan_53876-14955.jpg" 
              alt="Neurology Department" 
              className="img-fluid rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400/1a73e8/FFF?text=Neurology";
              }}
            />
          </Col>
          <Col lg={6}>
            <h2 className="mb-4">About Our Neurology Department</h2>
            <p>
              Our Neurology Department specializes in the diagnosis and treatment of disorders affecting the nervous system, 
              including the brain, spinal cord, and peripheral nerves. Our team of experienced neurologists uses advanced 
              technology and techniques to provide comprehensive care for patients with neurological conditions.
            </p>
            <p>
              We offer a wide range of services, from diagnostic testing to advanced treatments for conditions such as 
              stroke, epilepsy, multiple sclerosis, Parkinson's disease, and headaches. Our patient-centered approach 
              ensures that each patient receives personalized care tailored to their specific needs.
            </p>
            <Link to="/patient/doctors">
              <Button variant="primary" className="rounded-pill mt-3">
                Find a Neurologist <FaArrowRight className="ms-2" />
              </Button>
            </Link>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="mb-4">Our Neurology Services</h2>
            <Row>
              {[
                {
                  title: 'Diagnostic Services',
                  icon: <FaStethoscope className="service-icon text-primary" />,
                  items: [
                    'Electroencephalogram (EEG)',
                    'Electromyography (EMG)',
                    'Nerve Conduction Studies',
                    'MRI and CT Scans',
                    'Lumbar Puncture',
                    'Neuropsychological Testing'
                  ]
                },
                {
                  title: 'Treatment Services',
                  icon: <FaHospital className="service-icon text-primary" />,
                  items: [
                    'Medication Management',
                    'Botox Injections for Migraines',
                    'Stroke Treatment and Prevention',
                    'Epilepsy Management',
                    'Movement Disorder Treatment',
                    'Headache and Pain Management'
                  ]
                },
                {
                  title: 'Specialized Care',
                  icon: <FaBrain className="service-icon text-primary" />,
                  items: [
                    'Multiple Sclerosis Clinic',
                    'Parkinson\'s Disease Program',
                    'Epilepsy Monitoring',
                    'Memory Disorders Clinic',
                    'Neuromuscular Disorders',
                    'Sleep Disorders Evaluation'
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
            <h2 className="mb-4">Meet Our Neurology Team</h2>
            <Row>
              {[
                {
                  name: 'Dr. Robert Anderson',
                  title: 'Head of Neurology',
                  image: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
                  description: 'Dr. Anderson is a board-certified neurologist with over 20 years of experience in treating complex neurological disorders.'
                },
                {
                  name: 'Dr. Lisa Wang',
                  title: 'Epilepsy Specialist',
                  image: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg',
                  description: 'Dr. Wang specializes in epilepsy management and has pioneered several treatment protocols for seizure disorders.'
                },
                {
                  name: 'Dr. James Miller',
                  title: 'Movement Disorder Specialist',
                  image: 'https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg',
                  description: 'Dr. Miller is an expert in treating Parkinson\'s disease and other movement disorders with both medication and advanced therapies.'
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
          <h3 className="mb-4">Need a Neurology Consultation?</h3>
          <p className="lead mb-4">
            Our team of expert neurologists is ready to provide you with the best care possible.
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

export default Neurology; 