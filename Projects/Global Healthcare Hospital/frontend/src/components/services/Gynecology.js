import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFemale, FaHospital, FaStethoscope, FaArrowRight } from 'react-icons/fa';

const Gynecology = () => {
  return (
    <div className="service-detail-page py-5 mt-5">
      <Container>
        <div className="service-header mb-5">
          <h1 className="section-title text-center mb-4">
            <FaFemale className="me-3 text-primary" />
            Gynecology Department
          </h1>
          <p className="text-center lead mb-0">
            Comprehensive women's healthcare services with a focus on reproductive health and wellness
          </p>
        </div>

        <Row className="mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <img 
              src="https://img.freepik.com/free-photo/gynecologist-consulting-female-patient-clinic_1170-2195.jpg" 
              alt="Gynecology Department" 
              className="img-fluid rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400/1a73e8/FFF?text=Gynecology";
              }}
            />
          </Col>
          <Col lg={6}>
            <h2 className="mb-4">About Our Gynecology Department</h2>
            <p>
              Our Gynecology Department is dedicated to providing comprehensive healthcare services for women of all ages. 
              Our team of experienced gynecologists and specialists focuses on reproductive health, preventive care, 
              and treatment of conditions affecting the female reproductive system.
            </p>
            <p>
              We offer a wide range of services, from routine check-ups and screenings to specialized treatments for 
              complex gynecological conditions. Our patient-centered approach ensures that each woman receives 
              personalized care in a comfortable and supportive environment.
            </p>
            <Link to="/patient/doctors">
              <Button variant="primary" className="rounded-pill mt-3">
                Find a Gynecologist <FaArrowRight className="ms-2" />
              </Button>
            </Link>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="mb-4">Our Gynecological Services</h2>
            <Row>
              {[
                {
                  title: 'Preventive Care',
                  icon: <FaStethoscope className="service-icon text-primary" />,
                  items: [
                    'Annual Well-Woman Exams',
                    'Pap Smears',
                    'HPV Testing',
                    'Breast Examinations',
                    'STI Screening',
                    'Contraception Counseling'
                  ]
                },
                {
                  title: 'Treatment Services',
                  icon: <FaHospital className="service-icon text-primary" />,
                  items: [
                    'Menstrual Disorder Management',
                    'Endometriosis Treatment',
                    'Fibroid Management',
                    'Ovarian Cyst Treatment',
                    'Pelvic Pain Evaluation',
                    'Minimally Invasive Surgery'
                  ]
                },
                {
                  title: 'Specialized Services',
                  icon: <FaFemale className="service-icon text-primary" />,
                  items: [
                    'Prenatal Care',
                    'Menopause Management',
                    'Fertility Evaluation',
                    'Family Planning',
                    'Gynecologic Oncology',
                    'Urogynecology'
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
            <h2 className="mb-4">Meet Our Gynecology Team</h2>
            <Row>
              {[
                {
                  name: 'Dr. Jennifer Lee',
                  title: 'Head of Gynecology',
                  image: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg',
                  description: 'Dr. Lee is a board-certified gynecologist with over 15 years of experience in women\'s reproductive health and minimally invasive surgery.'
                },
                {
                  name: 'Dr. Rachel Thompson',
                  title: 'Reproductive Endocrinologist',
                  image: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg',
                  description: 'Dr. Thompson specializes in fertility issues and hormonal disorders, helping women achieve their reproductive goals.'
                },
                {
                  name: 'Dr. Michael Carter',
                  title: 'Gynecologic Oncologist',
                  image: 'https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg',
                  description: 'Dr. Carter is an expert in diagnosing and treating cancers of the female reproductive system with a focus on early detection and intervention.'
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
          <h3 className="mb-4">Need a Gynecological Consultation?</h3>
          <p className="lead mb-4">
            Our team of expert gynecologists is ready to provide you with the best care possible.
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

export default Gynecology; 