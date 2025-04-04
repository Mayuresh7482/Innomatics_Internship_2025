import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHospital, FaUserMd, FaAward, FaHistory } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-page py-5 mt-5">
      <Container>
        <h1 className="section-title text-center mb-5">About Global Healthcare Hospital</h1>
        
        <Row className="mb-5 align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <img 
              src="https://img.freepik.com/free-photo/hospital-building-modern-parking-lot_23-2148982291.jpg" 
              alt="Hospital Building" 
              className="img-fluid rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400/1a73e8/FFF?text=Hospital";
              }}
            />
          </Col>
          <Col lg={6}>
            <h2 className="mb-4">Our Mission</h2>
            <p className="lead">
              To provide exceptional healthcare services with compassion, integrity, and excellence.
            </p>
            <p>
              At Global Healthcare Hospital, we are committed to delivering the highest quality medical care to our patients. 
              Our team of experienced healthcare professionals works tirelessly to ensure that every patient receives 
              personalized attention and the best possible treatment.
            </p>
            <p>
              We believe in a patient-centered approach, where the needs and well-being of our patients come first. 
              Our state-of-the-art facilities and advanced medical technologies enable us to provide comprehensive 
              healthcare services across various specialties.
            </p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Our Values</h2>
            <Row>
              {[
                {
                  title: 'Excellence',
                  icon: <FaAward className="value-icon text-primary" />,
                  description: 'We strive for excellence in all aspects of our service, from medical care to patient experience.'
                },
                {
                  title: 'Compassion',
                  icon: <FaHospital className="value-icon text-primary" />,
                  description: 'We treat every patient with kindness, empathy, and respect, recognizing their individual needs and concerns.'
                },
                {
                  title: 'Integrity',
                  icon: <FaUserMd className="value-icon text-primary" />,
                  description: 'We uphold the highest ethical standards in our practice, ensuring transparency and honesty in all interactions.'
                },
                {
                  title: 'Innovation',
                  icon: <FaHistory className="value-icon text-primary" />,
                  description: 'We embrace innovation and continuous improvement to enhance our services and patient outcomes.'
                }
              ].map((value, index) => (
                <Col md={6} lg={3} className="mb-4" key={index}>
                  <Card className="h-100 text-center shadow-sm hover-card border-0">
                    <Card.Body>
                      <div className="mb-3">
                        {value.icon}
                      </div>
                      <Card.Title>{value.title}</Card.Title>
                      <Card.Text>
                        {value.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">Our History</h2>
            <div className="history-timeline">
              <div className="timeline-item">
                <div className="timeline-year">2005</div>
                <div className="timeline-content">
                  <h4>Foundation</h4>
                  <p>Global Healthcare Hospital was founded with a vision to provide accessible and quality healthcare services to all.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2010</div>
                <div className="timeline-content">
                  <h4>Expansion</h4>
                  <p>We expanded our facilities and added new departments to cater to a wider range of medical specialties.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2015</div>
                <div className="timeline-content">
                  <h4>Technological Advancement</h4>
                  <p>We invested in cutting-edge medical technologies and equipment to enhance our diagnostic and treatment capabilities.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">2020</div>
                <div className="timeline-content">
                  <h4>Digital Transformation</h4>
                  <p>We launched our online appointment booking system and telemedicine services to make healthcare more accessible.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-year">Present</div>
                <div className="timeline-content">
                  <h4>Continuing Excellence</h4>
                  <p>Today, we continue to grow and evolve, maintaining our commitment to excellence in healthcare.</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <h2 className="text-center mb-4">Our Team</h2>
            <p className="text-center mb-5">
              Our team consists of highly qualified and experienced healthcare professionals dedicated to providing the best care to our patients.
            </p>
            <Row>
              {[
                {
                  name: 'Dr. Robert Johnson',
                  position: 'Chief Medical Officer',
                  image: 'https://img.freepik.com/free-photo/portrait-doctor_144627-39390.jpg'
                },
                {
                  name: 'Dr. Emily Chen',
                  position: 'Head of Cardiology',
                  image: 'https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg'
                },
                {
                  name: 'Dr. Michael Rodriguez',
                  position: 'Head of Neurology',
                  image: 'https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg'
                },
                {
                  name: 'Dr. Sarah Thompson',
                  position: 'Head of Pediatrics',
                  image: 'https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg'
                }
              ].map((member, index) => (
                <Col md={6} lg={3} className="mb-4" key={index}>
                  <Card className="team-card border-0">
                    <Card.Img 
                      variant="top" 
                      src={member.image} 
                      className="team-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/300x300/1a73e8/FFF?text=${member.name}`;
                      }}
                    />
                    <Card.Body className="text-center">
                      <Card.Title>{member.name}</Card.Title>
                      <p className="text-muted">{member.position}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About; 