import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge } from 'react-bootstrap';

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalAction, setModalAction] = useState(''); // 'view', 'approve', 'cancel'
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    setTimeout(() => {
      const mockAppointments = [
        {
          id: 1,
          patientName: 'John Doe',
          patientEmail: 'john@example.com',
          doctorName: 'Dr. Emily Davis',
          specialization: 'Cardiology',
          date: '2023-06-20',
          time: '10:00 AM',
          status: 'pending',
          createdAt: '2023-06-15'
        },
        {
          id: 2,
          patientName: 'Jane Smith',
          patientEmail: 'jane@example.com',
          doctorName: 'Dr. Michael Wilson',
          specialization: 'Neurology',
          date: '2023-06-21',
          time: '11:30 AM',
          status: 'approved',
          createdAt: '2023-06-16'
        },
        {
          id: 3,
          patientName: 'Robert Johnson',
          patientEmail: 'robert@example.com',
          doctorName: 'Dr. Emily Davis',
          specialization: 'Cardiology',
          date: '2023-06-22',
          time: '09:00 AM',
          status: 'completed',
          createdAt: '2023-06-15',
          notes: 'Patient reported improvement after medication.'
        },
        {
          id: 4,
          patientName: 'Sarah Williams',
          patientEmail: 'sarah@example.com',
          doctorName: 'Dr. Michael Wilson',
          specialization: 'Neurology',
          date: '2023-06-19',
          time: '02:00 PM',
          status: 'cancelled',
          createdAt: '2023-06-14',
          cancelledBy: 'patient',
          cancelReason: 'Personal emergency'
        },
        {
          id: 5,
          patientName: 'David Brown',
          patientEmail: 'david@example.com',
          doctorName: 'Dr. Emily Davis',
          specialization: 'Cardiology',
          date: '2023-06-23',
          time: '03:30 PM',
          status: 'pending',
          createdAt: '2023-06-17'
        }
      ];
      
      setAppointments(mockAppointments);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setModalAction('view');
    setShowModal(true);
  };

  const handleApproveAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setModalAction('approve');
    setShowModal(true);
  };

  const handleCancelAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setModalAction('cancel');
    setCancelReason('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
    setCancelReason('');
  };

  const handleConfirmAction = () => {
    if (modalAction === 'approve') {
      // Approve appointment
      setAppointments(
        appointments.map(appointment => {
          if (appointment.id === selectedAppointment.id) {
            return {
              ...appointment,
              status: 'approved'
            };
          }
          return appointment;
        })
      );
    } else if (modalAction === 'cancel') {
      // Cancel appointment
      setAppointments(
        appointments.map(appointment => {
          if (appointment.id === selectedAppointment.id) {
            return {
              ...appointment,
              status: 'cancelled',
              cancelledBy: 'admin',
              cancelReason: cancelReason
            };
          }
          return appointment;
        })
      );
    }
    
    handleCloseModal();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'approved':
        return <Badge bg="primary">Approved</Badge>;
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
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
      <h2 className="mb-4">Manage Appointments</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by patient, doctor, or specialization"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Select value={statusFilter} onChange={handleStatusFilter}>
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>#{appointment.id}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.specialization}</td>
                    <td>{appointment.date} at {appointment.time}</td>
                    <td>{getStatusBadge(appointment.status)}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleViewAppointment(appointment)}
                      >
                        View
                      </Button>
                      
                      {appointment.status === 'pending' && (
                        <>
                          <Button
                            variant="outline-success"
                            size="sm"
                            className="me-2"
                            onClick={() => handleApproveAppointment(appointment)}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleCancelAppointment(appointment)}
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {/* Appointment Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === 'view' && 'Appointment Details'}
            {modalAction === 'approve' && 'Approve Appointment'}
            {modalAction === 'cancel' && 'Cancel Appointment'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              {modalAction === 'view' && (
                <div>
                  <p><strong>Appointment ID:</strong> #{selectedAppointment.id}</p>
                  <p><strong>Patient:</strong> {selectedAppointment.patientName}</p>
                  <p><strong>Patient Email:</strong> {selectedAppointment.patientEmail}</p>
                  <p><strong>Doctor:</strong> {selectedAppointment.doctorName}</p>
                  <p><strong>Specialization:</strong> {selectedAppointment.specialization}</p>
                  <p><strong>Date:</strong> {selectedAppointment.date}</p>
                  <p><strong>Time:</strong> {selectedAppointment.time}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedAppointment.status)}</p>
                  <p><strong>Created On:</strong> {selectedAppointment.createdAt}</p>
                  
                  {selectedAppointment.status === 'completed' && selectedAppointment.notes && (
                    <p><strong>Notes:</strong> {selectedAppointment.notes}</p>
                  )}
                  
                  {selectedAppointment.status === 'cancelled' && (
                    <>
                      <p><strong>Cancelled By:</strong> {selectedAppointment.cancelledBy}</p>
                      <p><strong>Cancellation Reason:</strong> {selectedAppointment.cancelReason}</p>
                    </>
                  )}
                </div>
              )}
              
              {modalAction === 'approve' && (
                <div>
                  <p>Are you sure you want to approve this appointment?</p>
                  <p><strong>Patient:</strong> {selectedAppointment.patientName}</p>
                  <p><strong>Doctor:</strong> {selectedAppointment.doctorName}</p>
                  <p><strong>Date & Time:</strong> {selectedAppointment.date} at {selectedAppointment.time}</p>
                </div>
              )}
              
              {modalAction === 'cancel' && (
                <div>
                  <p>Are you sure you want to cancel this appointment?</p>
                  <p><strong>Patient:</strong> {selectedAppointment.patientName}</p>
                  <p><strong>Doctor:</strong> {selectedAppointment.doctorName}</p>
                  <p><strong>Date & Time:</strong> {selectedAppointment.date} at {selectedAppointment.time}</p>
                  
                  <Form.Group className="mt-3">
                    <Form.Label>Cancellation Reason</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            {modalAction === 'view' ? 'Close' : 'Cancel'}
          </Button>
          
          {modalAction !== 'view' && (
            <Button 
              variant={modalAction === 'approve' ? 'success' : 'danger'} 
              onClick={handleConfirmAction}
              disabled={modalAction === 'cancel' && !cancelReason.trim()}
            >
              {modalAction === 'approve' ? 'Approve' : 'Cancel Appointment'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageAppointments; 