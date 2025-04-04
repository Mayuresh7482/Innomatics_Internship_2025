import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Alert } from 'react-bootstrap';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalAction, setModalAction] = useState(''); // 'view', 'block', 'delete'

  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    setTimeout(() => {
      const mockUsers = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          role: 'patient',
          phone: '(123) 456-7890',
          address: '123 Main St, New York, NY',
          registeredOn: '2023-01-15',
          status: 'active'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'patient',
          phone: '(123) 456-7891',
          address: '456 Oak Ave, New York, NY',
          registeredOn: '2023-02-20',
          status: 'active'
        },
        {
          id: 3,
          name: 'Robert Johnson',
          email: 'robert@example.com',
          role: 'patient',
          phone: '(123) 456-7892',
          address: '789 Pine Rd, New York, NY',
          registeredOn: '2023-03-10',
          status: 'blocked'
        },
        {
          id: 4,
          name: 'Dr. Emily Davis',
          email: 'emily.doctor@example.com',
          role: 'doctor',
          phone: '(123) 456-7893',
          address: '321 Cedar Ln, New York, NY',
          registeredOn: '2023-01-05',
          status: 'active'
        },
        {
          id: 5,
          name: 'Dr. Michael Wilson',
          email: 'michael.doctor@example.com',
          role: 'doctor',
          phone: '(123) 456-7894',
          address: '654 Elm St, New York, NY',
          registeredOn: '2023-02-15',
          status: 'active'
        }
      ];
      
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setModalAction('view');
    setShowModal(true);
  };

  const handleToggleStatus = (user) => {
    setSelectedUser(user);
    setModalAction(user.status === 'active' ? 'block' : 'unblock');
    setShowModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setModalAction('delete');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleConfirmAction = () => {
    if (modalAction === 'block' || modalAction === 'unblock') {
      // Toggle user status
      setUsers(
        users.map(user => {
          if (user.id === selectedUser.id) {
            return {
              ...user,
              status: user.status === 'active' ? 'blocked' : 'active'
            };
          }
          return user;
        })
      );
    } else if (modalAction === 'delete') {
      // Delete user
      setUsers(users.filter(user => user.id !== selectedUser.id));
    }
    
    handleCloseModal();
  };

  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <span className="badge bg-success">Active</span>
    ) : (
      <span className="badge bg-danger">Blocked</span>
    );
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
      <h2 className="mb-4">Manage Users</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by name, email, or role"
                  value={searchTerm}
                  onChange={handleSearch}
                />
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
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Registered On</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === 'doctor' ? 'bg-info' : 'bg-secondary'}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td>{user.registeredOn}</td>
                    <td>{getStatusBadge(user.status)}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleViewUser(user)}
                      >
                        View
                      </Button>
                      <Button
                        variant={user.status === 'active' ? 'outline-warning' : 'outline-success'}
                        size="sm"
                        className="me-2"
                        onClick={() => handleToggleStatus(user)}
                      >
                        {user.status === 'active' ? 'Block' : 'Unblock'}
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteUser(user)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {/* User Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === 'view' && 'User Details'}
            {modalAction === 'block' && 'Block User'}
            {modalAction === 'unblock' && 'Unblock User'}
            {modalAction === 'delete' && 'Delete User'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              {modalAction === 'view' && (
                <div>
                  <p><strong>Name:</strong> {selectedUser.name}</p>
                  <p><strong>Email:</strong> {selectedUser.email}</p>
                  <p><strong>Role:</strong> {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}</p>
                  <p><strong>Phone:</strong> {selectedUser.phone}</p>
                  <p><strong>Address:</strong> {selectedUser.address}</p>
                  <p><strong>Registered On:</strong> {selectedUser.registeredOn}</p>
                  <p><strong>Status:</strong> {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}</p>
                </div>
              )}
              
              {modalAction === 'block' && (
                <div>
                  <p>Are you sure you want to block {selectedUser.name}?</p>
                  <p>This will prevent the user from logging in and accessing the system.</p>
                </div>
              )}
              
              {modalAction === 'unblock' && (
                <div>
                  <p>Are you sure you want to unblock {selectedUser.name}?</p>
                  <p>This will allow the user to log in and access the system again.</p>
                </div>
              )}
              
              {modalAction === 'delete' && (
                <div>
                  <Alert variant="danger">
                    <p><strong>Warning:</strong> This action cannot be undone.</p>
                  </Alert>
                  <p>Are you sure you want to delete {selectedUser.name}?</p>
                  <p>All user data will be permanently removed from the system.</p>
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
              variant={modalAction === 'delete' ? 'danger' : modalAction === 'block' ? 'warning' : 'success'} 
              onClick={handleConfirmAction}
            >
              {modalAction === 'delete' ? 'Delete' : modalAction === 'block' ? 'Block' : 'Unblock'}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageUsers; 