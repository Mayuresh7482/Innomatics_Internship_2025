import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Alert } from 'react-bootstrap';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    experience: '',
    fees: '',
    phone: '',
    address: ''
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    setTimeout(() => {
      const mockDoctors = [
        {
          id: 1,
          name: 'Dr. John Smith',
          email: 'john.smith@example.com',
          specialization: 'Cardiology',
          experience: 15,
          fees: 150,
          phone: '(123) 456-7890',
          address: '123 Medical Center, New York, NY',
          status: 'Active'
        },
        {
          id: 2,
          name: 'Dr. Sarah Johnson',
          email: 'sarah.johnson@example.com',
          specialization: 'Dermatology',
          experience: 10,
          fees: 130,
          phone: '(123) 456-7891',
          address: '456 Health Avenue, New York, NY',
          status: 'Active'
        },
        {
          id: 3,
          name: 'Dr. Michael Brown',
          email: 'michael.brown@example.com',
          specialization: 'Neurology',
          experience: 12,
          fees: 160,
          phone: '(123) 456-7892',
          address: '789 Hospital Road, New York, NY',
          status: 'Inactive'
        },
        {
          id: 4,
          name: 'Dr. Emily Davis',
          email: 'emily.davis@example.com',
          specialization: 'Pediatrics',
          experience: 8,
          fees: 120,
          phone: '(123) 456-7893',
          address: `321 Children's Way, New York, NY`,
          status: 'Active'
        }
      ];
      
      setDoctors(mockDoctors);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter(doctor => {
    return (
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleAddDoctor = () => {
    setModalMode('add');
    setFormData({
      name: '',
      email: '',
      specialization: '',
      experience: '',
      fees: '',
      phone: '',
      address: ''
    });
    setFormError('');
    setFormSuccess('');
    setShowModal(true);
  };

  const handleEditDoctor = (doctor) => {
    setModalMode('edit');
    setSelectedDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      specialization: doctor.specialization,
      experience: doctor.experience,
      fees: doctor.fees,
      phone: doctor.phone,
      address: doctor.address
    });
    setFormError('');
    setFormSuccess('');
    setShowModal(true);
  };

  const handleToggleStatus = (id) => {
    setDoctors(
      doctors.map(doctor => {
        if (doctor.id === id) {
          return {
            ...doctor,
            status: doctor.status === 'Active' ? 'Inactive' : 'Active'
          };
        }
        return doctor;
      })
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    
    // Validate form
    if (!formData.name || !formData.email || !formData.specialization || 
        !formData.experience || !formData.fees || !formData.phone || !formData.address) {
      setFormError('Please fill in all fields');
      return;
    }
    
    if (modalMode === 'add') {
      // Add new doctor
      const newDoctor = {
        id: doctors.length + 1,
        ...formData,
        status: 'Active'
      };
      
      setDoctors([...doctors, newDoctor]);
      setFormSuccess('Doctor added successfully');
      
      // Clear form after 2 seconds
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } else {
      // Update existing doctor
      setDoctors(
        doctors.map(doctor => {
          if (doctor.id === selectedDoctor.id) {
            return {
              ...doctor,
              ...formData
            };
          }
          return doctor;
        })
      );
      
      setFormSuccess('Doctor updated successfully');
      
      // Close modal after 2 seconds
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
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
      <h2 className="mb-4">Manage Doctors</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by name, email, or specialization"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="text-end">
              <Button variant="primary" onClick={handleAddDoctor}>
                Add New Doctor
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Card>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Fees</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map(doctor => (
                  <tr key={doctor.id}>
                    <td>
                      <div>{doctor.name}</div>
                      <small className="text-muted">{doctor.email}</small>
                    </td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.experience} years</td>
                    <td>${doctor.fees}</td>
                    <td>
                      <span className={`badge ${doctor.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                        {doctor.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditDoctor(doctor)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant={doctor.status === 'Active' ? 'outline-danger' : 'outline-success'}
                        size="sm"
                        onClick={() => handleToggleStatus(doctor.id)}
                      >
                        {doctor.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No doctors found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {/* Add/Edit Doctor Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'add' ? 'Add New Doctor' : 'Edit Doctor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && <Alert variant="danger">{formError}</Alert>}
          {formSuccess && <Alert variant="success">{formSuccess}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Experience (years)</Form.Label>
                  <Form.Control
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Consultation Fees ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
            
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseModal} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {modalMode === 'add' ? 'Add Doctor' : 'Update Doctor'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageDoctors; 