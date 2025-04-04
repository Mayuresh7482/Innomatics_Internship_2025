import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserMd, 
  faUsers, 
  faCalendarCheck, 
  faChartLine,
  faUserPlus,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    approvedDoctors: 0,
    pendingDoctors: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    confirmedAppointments: 0,
    cancelledAppointments: 0,
    completedAppointments: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get dashboard stats
    setTimeout(() => {
      const mockStats = {
        totalPatients: 120,
        totalDoctors: 25,
        approvedDoctors: 18,
        pendingDoctors: 7,
        totalAppointments: 450,
        pendingAppointments: 35,
        confirmedAppointments: 85,
        cancelledAppointments: 20,
        completedAppointments: 310
      };
      
      const mockRecentAppointments = [
        {
          id: '1',
          patient: {
            name: 'John Doe'
          },
          doctor: {
            user: {
              name: 'Dr. Sarah Johnson'
            },
            specialization: 'Dermatology'
          },
          appointmentDate: '2023-04-15T10:30:00',
          status: 'confirmed'
        },
        {
          id: '2',
          patient: {
            name: 'Jane Smith'
          },
          doctor: {
            user: {
              name: 'Dr. Michael Brown'
            },
            specialization: 'Cardiology'
          },
          appointmentDate: '2023-04-16T14:00:00',
          status: 'pending'
        },
        {
          id: '3',
          patient: {
            name: 'Robert Johnson'
          },
          doctor: {
            user: {
              name: 'Dr. Emily Davis'
            },
            specialization: 'Neurology'
          },
          appointmentDate: '2023-04-14T09:15:00',
          status: 'completed'
        },
        {
          id: '4',
          patient: {
            name: 'Lisa Anderson'
          },
          doctor: {
            user: {
              name: 'Dr. James Wilson'
            },
            specialization: 'Orthopedics'
          },
          appointmentDate: '2023-04-13T16:45:00',
          status: 'cancelled'
        }
      ];
      
      const mockPendingDoctors = [
        {
          id: '1',
          user: {
            name: 'Dr. Thomas Clark',
            email: 'thomas.clark@example.com'
          },
          specialization: 'Psychiatry',
          experience: 8,
          createdAt: '2023-04-10T08:30:00'
        },
        {
          id: '2',
          user: {
            name: 'Dr. Amanda Lewis',
            email: 'amanda.lewis@example.com'
          },
          specialization: 'Pediatrics',
          experience: 5,
          createdAt: '2023-04-12T14:45:00'
        },
        {
          id: '3',
          user: {
            name: 'Dr. Richard Moore',
            email: 'richard.moore@example.com'
          },
          specialization: 'Gastroenterology',
          experience: 12,
          createdAt: '2023-04-11T11:20:00'
        }
      ];
      
      setStats(mockStats);
      setRecentAppointments(mockRecentAppointments);
      setPendingDoctors(mockPendingDoctors);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <Container>
      <h2 className="mb-4">Admin Dashboard</h2>
      
      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body>
              <FontAwesomeIcon icon={faUsers} size="2x" className="text-primary mb-2" />
              <h5>Total Patients</h5>
              <h2>{stats.totalPatients}</h2>
              <Link to="/admin/users">
                <Button variant="outline-primary" size="sm">View All</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body>
              <FontAwesomeIcon icon={faUserMd} size="2x" className="text-success mb-2" />
              <h5>Total Doctors</h5>
              <h2>{stats.totalDoctors}</h2>
              <div className="small mb-2">
                <span className="text-success">{stats.approvedDoctors} Approved</span> • 
                <span className="text-warning"> {stats.pendingDoctors} Pending</span>
              </div>
              <Link to="/admin/doctors">
                <Button variant="outline-success" size="sm">Manage</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body>
              <FontAwesomeIcon icon={faCalendarCheck} size="2x" className="text-info mb-2" />
              <h5>Appointments</h5>
              <h2>{stats.totalAppointments}</h2>
              <div className="small mb-2">
                <span className="text-warning">{stats.pendingAppointments} Pending</span> • 
                <span className="text-success"> {stats.confirmedAppointments} Confirmed</span>
              </div>
              <Link to="/admin/appointments">
                <Button variant="outline-info" size="sm">View All</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body>
              <FontAwesomeIcon icon={faChartLine} size="2x" className="text-danger mb-2" />
              <h5>Completion Rate</h5>
              <h2>
                {Math.round((stats.completedAppointments / stats.totalAppointments) * 100)}%
              </h2>
              <div className="small mb-2">
                {stats.completedAppointments} of {stats.totalAppointments} completed
              </div>
              <Button variant="outline-danger" size="sm" disabled>
                Details
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col md={7}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Recent Appointments</h5>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map(appointment => (
                    <tr key={appointment.id}>
                      <td>{appointment.patient.name}</td>
                      <td>
                        {appointment.doctor.user.name}
                        <div className="small text-muted">
                          {appointment.doctor.specialization}
                        </div>
                      </td>
                      <td>
                        {new Date(appointment.appointmentDate).toLocaleDateString()}
                        <div className="small text-muted">
                          {new Date(appointment.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td>
                        <Badge 
                          bg={
                            appointment.status === 'confirmed' 
                              ? 'success' 
                              : appointment.status === 'pending' 
                                ? 'warning' 
                                : appointment.status === 'completed'
                                  ? 'info'
                                  : 'danger'
                          }
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </Badge>
                      </td>
                      <td>
                        <Link to={`/admin/appointments/${appointment.id}`}>
                          <Button variant="outline-primary" size="sm">View</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="text-center mt-3">
                <Link to="/admin/appointments">
                  <Button variant="primary">View All Appointments</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={5}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-warning text-white">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                Pending Doctor Approvals
              </h5>
            </Card.Header>
            <Card.Body>
              {pendingDoctors.length === 0 ? (
                <p>No pending doctor approvals.</p>
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Specialization</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingDoctors.map(doctor => (
                      <tr key={doctor.id}>
                        <td>
                          {doctor.user.name}
                          <div className="small text-muted">{doctor.user.email}</div>
                        </td>
                        <td>
                          {doctor.specialization}
                          <div className="small text-muted">{doctor.experience} years exp.</div>
                        </td>
                        <td>
                          <Button 
                            variant="outline-success" 
                            size="sm" 
                            className="me-1"
                            title="Approve"
                          >
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            title="Reject"
                          >
                            <FontAwesomeIcon icon={faTimesCircle} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              <div className="text-center mt-3">
                <Link to="/admin/doctors">
                  <Button variant="warning">Manage All Doctors</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Link to="/admin/users">
                  <Button variant="primary" className="mb-2 w-100">
                    Manage Users
                  </Button>
                </Link>
                <Link to="/admin/doctors">
                  <Button variant="success" className="mb-2 w-100">
                    Manage Doctors
                  </Button>
                </Link>
                <Link to="/admin/appointments">
                  <Button variant="info" className="text-white w-100">
                    View Appointments
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard; 