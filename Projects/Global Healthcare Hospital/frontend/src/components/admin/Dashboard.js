import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserMd, FaUsers, FaCalendarCheck, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    recentRegistrations: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    setTimeout(() => {
      setStats({
        totalDoctors: 15,
        totalPatients: 120,
        totalAppointments: 450,
        pendingAppointments: 28,
        recentRegistrations: [
          { id: 1, name: 'John Doe', role: 'patient', date: '2023-06-15' },
          { id: 2, name: 'Dr. Sarah Johnson', role: 'doctor', date: '2023-06-14' },
          { id: 3, name: 'Michael Brown', role: 'patient', date: '2023-06-13' },
          { id: 4, name: 'Dr. Robert Wilson', role: 'doctor', date: '2023-06-12' },
          { id: 5, name: 'Emily Davis', role: 'patient', date: '2023-06-11' }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4">Admin Dashboard</h2>
      
      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <div className="display-4 text-primary mb-2">
                <FaUserMd />
              </div>
              <h3>{stats.totalDoctors}</h3>
              <Card.Text>Total Doctors</Card.Text>
              <Link to="/admin/doctors">
                <Button variant="outline-primary" size="sm">Manage Doctors</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <div className="display-4 text-success mb-2">
                <FaUsers />
              </div>
              <h3>{stats.totalPatients}</h3>
              <Card.Text>Total Patients</Card.Text>
              <Link to="/admin/users">
                <Button variant="outline-success" size="sm">Manage Users</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <div className="display-4 text-info mb-2">
                <FaCalendarCheck />
              </div>
              <h3>{stats.totalAppointments}</h3>
              <Card.Text>Total Appointments</Card.Text>
              <Link to="/admin/appointments">
                <Button variant="outline-info" size="sm">View All</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="text-center h-100 shadow-sm">
            <Card.Body>
              <div className="display-4 text-warning mb-2">
                <FaCalendarCheck />
              </div>
              <h3>{stats.pendingAppointments}</h3>
              <Card.Text>Pending Appointments</Card.Text>
              <Link to="/admin/appointments?status=pending">
                <Button variant="outline-warning" size="sm">Review</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Quick Actions */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <Link to="/admin/doctors/add" className="text-decoration-none">
                    <Card className="text-center mb-3 py-3 border-primary">
                      <Card.Body>
                        <FaUserMd className="fs-1 text-primary mb-2" />
                        <Card.Title>Add Doctor</Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
                
                <Col md={3}>
                  <Link to="/admin/users" className="text-decoration-none">
                    <Card className="text-center mb-3 py-3 border-success">
                      <Card.Body>
                        <FaUsers className="fs-1 text-success mb-2" />
                        <Card.Title>Manage Users</Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
                
                <Col md={3}>
                  <Link to="/admin/appointments" className="text-decoration-none">
                    <Card className="text-center mb-3 py-3 border-info">
                      <Card.Body>
                        <FaCalendarCheck className="fs-1 text-info mb-2" />
                        <Card.Title>Appointments</Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
                
                <Col md={3}>
                  <Link to="/admin/reports" className="text-decoration-none">
                    <Card className="text-center mb-3 py-3 border-warning">
                      <Card.Body>
                        <FaChartLine className="fs-1 text-warning mb-2" />
                        <Card.Title>Reports</Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Recent Registrations */}
      <Row>
        <Col>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Recent Registrations</h5>
            </Card.Header>
            <Card.Body>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentRegistrations.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>
                        <span className={`badge ${user.role === 'doctor' ? 'bg-info' : 'bg-secondary'}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td>{user.date}</td>
                      <td>
                        <Button variant="outline-primary" size="sm">View Profile</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-end">
                <Link to="/admin/users">
                  <Button variant="primary">View All Users</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard; 