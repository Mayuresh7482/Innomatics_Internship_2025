import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faUserMd, faClock } from '@fortawesome/free-solid-svg-icons';

const PatientDashboard = () => {
  const [user, setUser] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Simulate API call to get upcoming appointments
    setTimeout(() => {
      const mockAppointments = [
        {
          id: '1',
          doctor: {
            user: {
              name: 'Dr. John Smith'
            },
            specialization: 'Cardiology'
          },
          appointmentDate: '2023-04-15T10:30:00',
          timeSlot: {
            startTime: '10:30 AM',
            endTime: '11:00 AM'
          },
          status: 'confirmed'
        },
        {
          id: '2',
          doctor: {
            user: {
              name: 'Dr. Sarah Johnson'
            },
            specialization: 'Dermatology'
          },
          appointmentDate: '2023-04-20T14:00:00',
          timeSlot: {
            startTime: '2:00 PM',
            endTime: '2:30 PM'
          },
          status: 'pending'
        }
      ];
      
      setUpcomingAppointments(mockAppointments);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <Container>
      <h2 className="mb-4">Patient Dashboard</h2>
      
      {user && (
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <h4>Welcome, {user.name}!</h4>
                <p className="text-muted">
                  Here's an overview of your healthcare appointments and activities.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      
      <Row>
        <Col md={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faCalendarCheck} className="me-2" />
                Upcoming Appointments
              </h5>
            </Card.Header>
            <Card.Body>
              {upcomingAppointments.length === 0 ? (
                <p>You have no upcoming appointments.</p>
              ) : (
                <ListGroup variant="flush">
                  {upcomingAppointments.map(appointment => (
                    <ListGroup.Item key={appointment.id} className="py-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6>{appointment.doctor.user.name}</h6>
                          <p className="text-muted mb-0">
                            {appointment.doctor.specialization} • {' '}
                            {new Date(appointment.appointmentDate).toLocaleDateString()} • {' '}
                            {appointment.timeSlot.startTime} - {appointment.timeSlot.endTime}
                          </p>
                        </div>
                        <div>
                          <span className={`badge bg-${appointment.status === 'confirmed' ? 'success' : 'warning'} me-2`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                          <Link to={`/patient/appointments/${appointment.id}`}>
                            <Button variant="outline-primary" size="sm">View</Button>
                          </Link>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <div className="mt-3">
                <Link to="/patient/appointments">
                  <Button variant="outline-primary">View All Appointments</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faUserMd} className="me-2" />
                Quick Actions
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Link to="/patient/doctors">
                  <Button variant="primary" className="mb-2 w-100">
                    Find a Doctor
                  </Button>
                </Link>
                <Link to="/patient/appointments">
                  <Button variant="outline-primary" className="mb-2 w-100">
                    My Appointments
                  </Button>
                </Link>
                <Link to="/patient/profile">
                  <Button variant="outline-primary" className="w-100">
                    Update Profile
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faClock} className="me-2" />
                Recent Activity
              </h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <small className="text-muted">Yesterday</small>
                  <p className="mb-0">Booked an appointment with Dr. Sarah Johnson</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <small className="text-muted">3 days ago</small>
                  <p className="mb-0">Updated your profile information</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <small className="text-muted">1 week ago</small>
                  <p className="mb-0">Completed appointment with Dr. John Smith</p>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientDashboard; 