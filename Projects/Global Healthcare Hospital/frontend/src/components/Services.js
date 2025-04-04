import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserMd, FaHeartbeat, FaBrain, FaBone, FaBaby, FaFemale, FaAllergies } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      id: 'cardiology',
      title: 'Cardiology',
      icon: <FaHeartbeat className="service-icon" />,
      description: 'Our cardiology department provides comprehensive care for heart conditions, including diagnostic tests, treatment plans, and preventive care.',
      details: 'Our team of experienced cardiologists uses state-of-the-art technology to diagnose and treat various heart conditions, including coronary artery disease, heart failure, arrhythmias, and valve disorders. We offer services such as ECGs, echocardiograms, stress tests, cardiac catheterization, and cardiac rehabilitation programs.',
      image: 'https://img.freepik.com/free-photo/doctor-examining-patient-with-stethoscope-clinic_1170-2166.jpg'
    },
    {
      id: 'neurology',
      title: 'Neurology',
      icon: <FaBrain className="service-icon" />,
      description: 'Our neurology department specializes in diagnosing and treating disorders of the nervous system, including the brain, spinal cord, and nerves.',
      details: `Our neurologists are experts in treating conditions such as stroke, epilepsy, multiple sclerosis, Parkinson's disease, Alzheimer's disease, and headaches. We offer comprehensive neurological evaluations, EEGs, EMGs, and advanced imaging studies to diagnose and manage neurological disorders effectively.`,
      image: 'https://img.freepik.com/free-photo/doctor-examining-brain-scan_53876-14955.jpg'
    },
    {
      id: 'orthopedics',
      title: 'Orthopedics',
      icon: <FaBone className="service-icon" />,
      description: 'Our orthopedic department focuses on the diagnosis, treatment, and prevention of disorders of the bones, joints, ligaments, tendons, and muscles.',
      details: 'Our orthopedic surgeons provide expert care for conditions such as fractures, sports injuries, arthritis, joint replacements, spine disorders, and hand and foot problems. We offer both surgical and non-surgical treatments, including physical therapy, joint injections, minimally invasive procedures, and complex reconstructive surgeries.',
      image: 'https://img.freepik.com/free-photo/doctor-examining-x-ray-office_23-2148868646.jpg'
    },
    {
      id: 'pediatrics',
      title: 'Pediatrics',
      icon: <FaBaby className="service-icon" />,
      description: 'Our pediatric department provides comprehensive healthcare services for infants, children, and adolescents, focusing on their unique needs.',
      details: 'Our pediatricians are dedicated to providing compassionate care for children from birth through adolescence. We offer well-child visits, vaccinations, developmental assessments, treatment for acute illnesses, and management of chronic conditions. Our child-friendly environment helps make medical visits less stressful for our young patients.',
      image: 'https://img.freepik.com/free-photo/doctor-child-patient-hospital_23-2148968951.jpg'
    },
    {
      id: 'gynecology',
      title: 'Gynecology',
      icon: <FaFemale className="service-icon" />,
      description: `Our gynecology department provides comprehensive care for women's reproductive health, including preventive care, diagnosis, and treatment.`,
      details: 'Our gynecologists offer a full range of services, including annual exams, Pap smears, contraception counseling, menopause management, and treatment for conditions such as endometriosis, fibroids, and ovarian cysts. We also provide prenatal care, delivery services, and postpartum care for expectant mothers.',
      image: 'https://img.freepik.com/free-photo/gynecologist-consulting-female-patient-clinic_1170-2195.jpg'
    },
    {
      id: 'dermatology',
      title: 'Dermatology',
      icon: <FaAllergies className="service-icon" />,
      description: 'Our dermatology department specializes in diagnosing and treating conditions affecting the skin, hair, and nails.',
      details: 'Our dermatologists provide expert care for conditions such as acne, eczema, psoriasis, skin cancer, hair loss, and nail disorders. We offer services including skin examinations, biopsies, cryotherapy, phototherapy, and both medical and cosmetic dermatology treatments to help patients maintain healthy skin.',
      image: 'https://img.freepik.com/free-photo/dermatologist-examining-patient-skin_23-2148868649.jpg'
    }
  ];

  return (
    <div className="services-page py-5 mt-5">
      <Container>
        <h1 className="section-title text-center mb-5">Our Services</h1>
        <p className="text-center mb-5 lead">
          At Global Healthcare Hospital, we offer a wide range of medical services to meet all your healthcare needs. 
          Our team of experienced doctors and state-of-the-art facilities ensure that you receive the best care possible.
        </p>

        {services.map((service) => (
          <div key={service.id} id={service.id} className="service-section mb-5 pb-4 border-bottom">
            <Row className="align-items-center mb-4">
              <Col lg={6} className="mb-4 mb-lg-0">
                <div className="service-image">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="img-fluid rounded-lg shadow"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/600x400/1a73e8/FFF?text=${service.title}`;
                    }}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="service-content">
                  <div className="d-flex align-items-center mb-3">
                    {service.icon}
                    <h2 className="mb-0 ms-3">{service.title}</h2>
                  </div>
                  <p className="lead mb-3">{service.description}</p>
                  <p>{service.details}</p>
                  <div className="d-flex flex-wrap gap-2">
                    <Link to={`/services/${service.id}`}>
                      <Button variant="primary" className="rounded-pill me-2 mb-2">
                        Learn More About {service.title}
                      </Button>
                    </Link>
                    <Link to="/patient/doctors">
                      <Button variant="outline-primary" className="rounded-pill mb-2">
                        Find {service.title} Specialists
                      </Button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Services; 