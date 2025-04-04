import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form } from 'react-bootstrap';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    setTimeout(() => {
      const mockAppointments = [
        {
          id: 1,
          doctorName: 'Dr. John Smith',
          doctorSpecialization: 'Cardiology',
          date: '2023-06-25',
          time: '10:00 AM',
          status: 'Upcoming',
          reason: 'Regular checkup',
          notes: '',
          cancelReason: ''
        },
        {
          id: 2,
          doctorName: 'Dr. Sarah Johnson',
          doctorSpecialization: 'Dermatology',
          date: '2023-06-15',
          time: '11:30 AM',
          status: 'Completed',
          reason: 'Skin rash',
          notes: 'Prescribed antihistamines and topical cream',
          cancelReason: ''
        },
        {
          id: 3,
          doctorName: 'Dr. Michael Brown',
          doctorSpecialization: 'Neurology',
          date: '2023-06-10',
          time: '2:00 PM',
          status: 'Cancelled',
          reason: 'Headache and dizziness',
          notes: '',
          cancelReason: 'Personal emergency'
        },
        {
          id: 4,
          doctorName: 'Dr. Emily Davis',
          doctorSpecialization: 'Pediatrics',
          date: '2023-07-05',
          time: '9:15 AM',
          status: 'Upcoming',
          reason: 'Vaccination',
          notes: '',
          cancelReason: ''
        }
      ];
      
      setAppointments(mockAppointments);
      setFilteredAppointments(mockAppointments);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredAppointments(appointments);
    } else {
      setFilteredAppointments(
        appointments.filter(appointment => appointment.status.toLowerCase() === filter.toLowerCase())
      );
    }
  }, [filter, appointments]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    setCancelReason('');
  };

  const handleCancelAppointment = () => {
    if (!cancelReason.trim()) {
      alert('Please provide a reason for cancellation');
      return;
    }
    
    // Update appointment status
    const updatedAppointments = appointments.map(appointment => {
      if (appointment.id === selectedAppointment.id) {
        return {
          ...appointment,
          status: 'Cancelled',
          cancelReason
        };
      }
      return appointment;
    });
    
    setAppointments(updatedAppointments);
    handleCloseModal();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Upcoming':
        return <Badge bg="primary">{status}</Badge>;
      case 'Completed':
        return <Badge bg="success">{status}</Badge>;
      case 'Cancelled':
        return <Badge bg="danger">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

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
      <h2 className="mb-4">My Appointments</h2>
      
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
          {filteredAppointments.length > 0 ? (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Specialization</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.doctorSpecialization}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{getStatusBadge(appointment.status)}</td>
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
              </tbody>
            </Table>
          ) : (
            <div className="text-center py-4">
              <h5>No appointments found</h5>
              <p>You don't have any {filter !== 'all' ? filter.toLowerCase() : ''} appointments.</p>
            </div>
          )}
        </Card.Body>
      </Card>
      
      {/* Appointment Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <div>
              <p><strong>Doctor:</strong> {selectedAppointment.doctorName}</p>
              <p><strong>Specialization:</strong> {selectedAppointment.doctorSpecialization}</p>
              <p><strong>Date:</strong> {selectedAppointment.date}</p>
              <p><strong>Time:</strong> {selectedAppointment.time}</p>
              <p><strong>Status:</strong> {getStatusBadge(selectedAppointment.status)}</p>
              <p><strong>Reason for Visit:</strong> {selectedAppointment.reason}</p>
              
              {selectedAppointment.notes && (
                <p><strong>Doctor's Notes:</strong> {selectedAppointment.notes}</p>
              )}
              
              {selectedAppointment.cancelReason && (
                <p><strong>Cancellation Reason:</strong> {selectedAppointment.cancelReason}</p>
              )}
              
              {selectedAppointment.status === 'Upcoming' && (
                <div className="mt-4">
                  <h6>Cancel Appointment</h6>
                  <Form.Group className="mb-3">
                    <Form.Label>Reason for Cancellation</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      placeholder="Please provide a reason for cancellation"
                    />
                  </Form.Group>
                  <Button 
                    variant="danger" 
                    onClick={handleCancelAppointment}
                    disabled={!cancelReason.trim()}
                  >
                    Cancel Appointment
                  </Button>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyAppointments; 