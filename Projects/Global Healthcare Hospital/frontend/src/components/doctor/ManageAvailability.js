import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

const ManageAvailability = () => {
  const { currentUser } = useContext(AuthContext);
  const [availability, setAvailability] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockAvailability = [
        { id: 1, day: 'Monday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { id: 2, day: 'Tuesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { id: 4, day: 'Thursday', startTime: '09:00', endTime: '17:00', isAvailable: true },
        { id: 5, day: 'Friday', startTime: '09:00', endTime: '15:00', isAvailable: true },
        { id: 6, day: 'Saturday', startTime: '10:00', endTime: '14:00', isAvailable: false },
        { id: 7, day: 'Sunday', startTime: '00:00', endTime: '00:00', isAvailable: false }
      ];
      
      setAvailability(mockAvailability);
    }, 1000);
  }, []);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
    setSuccess('');
    setError('');
  };

  const handleAvailabilityChange = (id, field, value) => {
    setAvailability(
      availability.map(item => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleToggleAvailability = (id) => {
    setAvailability(
      availability.map(item => {
        if (item.id === id) {
          return { ...item, isAvailable: !item.isAvailable };
        }
        return item;
      })
    );
  };

  const handleSaveAvailability = () => {
    // Validate times
    let isValid = true;
    availability.forEach(item => {
      if (item.isAvailable) {
        if (!item.startTime || !item.endTime) {
          isValid = false;
          setError('Please set both start and end times for available days');
        }
        
        if (item.startTime >= item.endTime) {
          isValid = false;
          setError('End time must be after start time');
        }
      }
    });
    
    if (!isValid) return;
    
    // In a real app, this would be an API call
    // Simulate API call
    setTimeout(() => {
      setSuccess('Availability updated successfully');
      setEditMode(false);
    }, 500);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <h2 className="mb-4">Manage Availability</h2>
      
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Weekly Schedule</h5>
          <Button 
            variant={editMode ? "secondary" : "primary"} 
            onClick={handleToggleEditMode}
          >
            {editMode ? "Cancel" : "Edit Schedule"}
          </Button>
        </Card.Header>
        <Card.Body>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Table responsive striped>
            <thead>
              <tr>
                <th>Day</th>
                <th>Available</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {availability.map(item => (
                <tr key={item.id}>
                  <td>{item.day}</td>
                  <td>
                    {editMode ? (
                      <Form.Check
                        type="switch"
                        checked={item.isAvailable}
                        onChange={() => handleToggleAvailability(item.id)}
                      />
                    ) : (
                      <span className={item.isAvailable ? "text-success" : "text-danger"}>
                        {item.isAvailable ? "Yes" : "No"}
                      </span>
                    )}
                  </td>
                  <td>
                    {editMode ? (
                      <Form.Control
                        type="time"
                        value={item.startTime}
                        onChange={(e) => handleAvailabilityChange(item.id, 'startTime', e.target.value)}
                        disabled={!item.isAvailable}
                      />
                    ) : (
                      item.isAvailable ? item.startTime : "-"
                    )}
                  </td>
                  <td>
                    {editMode ? (
                      <Form.Control
                        type="time"
                        value={item.endTime}
                        onChange={(e) => handleAvailabilityChange(item.id, 'endTime', e.target.value)}
                        disabled={!item.isAvailable}
                      />
                    ) : (
                      item.isAvailable ? item.endTime : "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          {editMode && (
            <div className="d-flex justify-content-end mt-3">
              <Button variant="primary" onClick={handleSaveAvailability}>
                Save Changes
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
      
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Availability Guidelines</h5>
            </Card.Header>
            <Card.Body>
              <ul>
                <li>Set your regular weekly schedule by toggling availability for each day.</li>
                <li>For days you are available, set your start and end times.</li>
                <li>Patients will only be able to book appointments during your available hours.</li>
                <li>You can update your availability at any time, but it won't affect existing appointments.</li>
                <li>For special cases or time off, you can manage specific dates separately.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageAvailability; 