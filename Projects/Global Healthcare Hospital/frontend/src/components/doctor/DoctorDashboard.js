import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const DoctorDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0
  });
  
  const [recentAppointments, setRecentAppointments] = useState([]);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalAppointments: 45,
        upcomingAppointments: 12,
        completedAppointments: 30,
        cancelledAppointments: 3
      });
      
      setRecentAppointments([
        {
          id: 1,
          patientName: 'John Doe',
          date: '2023-06-15',
          time: '10:00 AM',
          status: 'Upcoming'
        },
        {
          id: 2,
          patientName: 'Jane Smith',
          date: '2023-06-14',
          time: '11:30 AM',
          status: 'Completed'
        },
        {
          id: 3,
          patientName: 'Robert Johnson',
          date: '2023-06-16',
          time: '2:00 PM',
          status: 'Upcoming'
        },
        {
          id: 4,
          patientName: 'Emily Davis',
          date: '2023-06-13',
          time: '9:15 AM',
          status: 'Completed'
        },
        {
          id: 5,
          patientName: 'Michael Wilson',
          date: '2023-06-12',
          time: '3:45 PM',
          status: 'Cancelled'
        }
      ]);
    }, 1000);
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2 className="mb-4">Doctor Dashboard</h2>
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center h-100 bg-primary text-white">
            <Card.Body>
              <h5>Total Appointments</h5>
              <h2>{stats.totalAppointments}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 bg-success text-white">
            <Card.Body>
              <h5>Upcoming</h5>
              <h2>{stats.upcomingAppointments}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 bg-info text-white">
            <Card.Body>
              <h5>Completed</h5>
              <h2>{stats.completedAppointments}</h2>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 bg-warning text-white">
            <Card.Body>
              <h5>Cancelled</h5>
              <h2>{stats.cancelledAppointments}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Appointments</h5>
              <Button as={Link} to="/doctor/appointments" variant="primary" size="sm">
                View All
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td>{appointment.patientName}</td>
                      <td>{appointment.date}</td>
                      <td>{appointment.time}</td>
                      <td>
                        <span className={`badge ${
                          appointment.status === 'Completed' ? 'bg-success' :
                          appointment.status === 'Upcoming' ? 'bg-primary' :
                          'bg-warning'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td>
                        <Button variant="outline-primary" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">My Availability</h5>
              <Button as={Link} to="/doctor/availability" variant="primary" size="sm">
                Manage
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive striped>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monday</td>
                    <td>9:00 AM</td>
                    <td>5:00 PM</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>9:00 AM</td>
                    <td>5:00 PM</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td>9:00 AM</td>
                    <td>5:00 PM</td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>9:00 AM</td>
                    <td>5:00 PM</td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>9:00 AM</td>
                    <td>3:00 PM</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Profile Information</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Name:</Col>
                <Col md={8}>{currentUser.name}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Email:</Col>
                <Col md={8}>{currentUser.email}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Specialization:</Col>
                <Col md={8}>{currentUser.specialization || 'General Medicine'}</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Experience:</Col>
                <Col md={8}>{currentUser.experience || '5'} years</Col>
              </Row>
              <Row className="mb-3">
                <Col md={4} className="fw-bold">Phone:</Col>
                <Col md={8}>{currentUser.phone || '(123) 456-7890'}</Col>
              </Row>
              <div className="text-end">
                <Button as={Link} to="/doctor/profile" variant="primary">
                  Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDashboard; 