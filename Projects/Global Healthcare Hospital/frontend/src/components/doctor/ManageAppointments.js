import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

const ManageAppointments = () => {
  const { currentUser } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockAppointments = [
        {
          id: 1,
          patientName: 'John Doe',
          patientEmail: 'john@example.com',
          patientPhone: '(123) 456-7890',
          date: '2023-06-15',
          time: '10:00 AM',
          status: 'Upcoming',
          reason: 'Regular checkup',
          notes: ''
        },
        {
          id: 2,
          patientName: 'Jane Smith',
          patientEmail: 'jane@example.com',
          patientPhone: '(123) 456-7891',
          date: '2023-06-14',
          time: '11:30 AM',
          status: 'Completed',
          reason: 'Fever and cold',
          notes: 'Prescribed antibiotics for 5 days'
        },
        {
          id: 3,
          patientName: 'Robert Johnson',
          patientEmail: 'robert@example.com',
          patientPhone: '(123) 456-7892',
          date: '2023-06-16',
          time: '2:00 PM',
          status: 'Upcoming',
          reason: 'Headache and dizziness',
          notes: ''
        },
        {
          id: 4,
          patientName: 'Emily Davis',
          patientEmail: 'emily@example.com',
          patientPhone: '(123) 456-7893',
          date: '2023-06-13',
          time: '9:15 AM',
          status: 'Completed',
          reason: 'Annual physical',
          notes: 'All tests normal'
        },
        {
          id: 5,
          patientName: 'Michael Wilson',
          patientEmail: 'michael@example.com',
          patientPhone: '(123) 456-7894',
          date: '2023-06-12',
          time: '3:45 PM',
          status: 'Cancelled',
          reason: 'Skin rash',
          notes: 'Patient cancelled due to emergency'
        },
        {
          id: 6,
          patientName: 'Sarah Brown',
          patientEmail: 'sarah@example.com',
          patientPhone: '(123) 456-7895',
          date: '2023-06-17',
          time: '1:30 PM',
          status: 'Upcoming',
          reason: 'Back pain',
          notes: ''
        },
        {
          id: 7,
          patientName: 'David Miller',
          patientEmail: 'david@example.com',
          patientPhone: '(123) 456-7896',
          date: '2023-06-11',
          time: '10:45 AM',
          status: 'Completed',
          reason: 'Diabetes follow-up',
          notes: 'Blood sugar levels improved'
        }
      ];
      
      setAppointments(mockAppointments);
      setFilteredAppointments(mockAppointments);
    }, 1000);
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter(appointment => appointment.status.toLowerCase() === filter)
      );
    }
  }, [filter, appointments]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setNotes(appointment.notes);
    setStatus(appointment.status);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const handleUpdateAppointment = () => {
    // In a real app, this would be an API call
    const updatedAppointments = appointments.map(appointment => {
      if (appointment.id === selectedAppointment.id) {
        return {
          ...appointment,
          status,
          notes
        };
      }
      return appointment;
    });
    
    setAppointments(updatedAppointments);
    handleCloseModal();
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2 className="mb-4">Manage Appointments</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <h5>Filter Appointments</h5>
            </Col>
            <Col md={6}>
              <Form.Select value={filter} onChange={handleFilterChange}>
                <option value="all">All Appointments</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.reason}</td>
                  <td>
                    <Badge bg={
                      appointment.status === 'Completed' ? 'success' :
                      appointment.status === 'Upcoming' ? 'primary' :
                      'warning'
                    }>
                      {appointment.status}
                    </Badge>
                  </td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => handleViewDetails(appointment)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">No appointments found</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {/* Appointment Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <Row className="mb-3">
                <Col md={6}>
                  <p><strong>Patient Name:</strong> {selectedAppointment.patientName}</p>
                  <p><strong>Email:</strong> {selectedAppointment.patientEmail}</p>
                  <p><strong>Phone:</strong> {selectedAppointment.patientPhone}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Date:</strong> {selectedAppointment.date}</p>
                  <p><strong>Time:</strong> {selectedAppointment.time}</p>
                  <p><strong>Reason:</strong> {selectedAppointment.reason}</p>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about the appointment"
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateAppointment}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageAppointments; 