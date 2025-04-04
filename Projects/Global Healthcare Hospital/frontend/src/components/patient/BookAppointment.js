import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
    notes: ''
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { date, time, reason, notes } = formData;

  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    setTimeout(() => {
      const mockDoctor = {
        id: parseInt(doctorId),
        name: 'Dr. John Smith',
        specialization: 'Cardiology',
        fees: 150,
        image: 'https://via.placeholder.com/150',
        availability: [
          { day: 'Monday', date: '2023-06-19', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
          { day: 'Wednesday', date: '2023-06-21', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
          { day: 'Friday', date: '2023-06-23', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] }
        ]
      };
      
      setDoctor(mockDoctor);
      setLoading(false);
    }, 1000);
  }, [doctorId]);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setFormData({ ...formData, date: selectedDate, time: '' });
    
    // Find available times for the selected date
    if (doctor) {
      const dayInfo = doctor.availability.find(day => day.date === selectedDate);
      if (dayInfo) {
        setAvailableTimes(dayInfo.slots);
      } else {
        setAvailableTimes([]);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate form
    if (!date || !time || !reason) {
      setError('Please fill in all required fields');
      return;
    }
    
    setSubmitting(true);
    
    // Mock API call - in a real app, this would be an actual API call
    setTimeout(() => {
      // Simulate successful booking
      setSuccess('Appointment booked successfully!');
      setSubmitting(false);
      
      // Redirect to appointments page after 2 seconds
      setTimeout(() => {
        navigate('/patient/appointments');
      }, 2000);
    }, 1500);
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

  if (!doctor) {
    return (
      <Container>
        <div className="text-center py-5">
          <h3>Doctor not found</h3>
          <Link to="/patient/doctors">
            <Button variant="primary" className="mt-3">Back to Doctors List</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4">Book an Appointment</h2>
      
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body className="text-center">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="rounded-circle mb-3"
                width="100"
                height="100"
              />
              <h4>{doctor.name}</h4>
              <p className="text-muted">{doctor.specialization}</p>
              <p className="mb-0">
                <strong>Consultation Fee:</strong> ${doctor.fees}
              </p>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>Available Days</Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                {doctor.availability.map((avail, index) => (
                  <li key={index} className="mb-2">
                    <strong>{avail.day}</strong> ({avail.date}): {avail.slots.length} slots available
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card>
            <Card.Body>
              {success && <Alert variant="success">{success}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Select
                    name="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                  >
                    <option value="">Select a date</option>
                    {doctor.availability.map((avail, index) => (
                      <option key={index} value={avail.date}>
                        {avail.day} - {avail.date}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Select Time</Form.Label>
                  <Form.Select
                    name="time"
                    value={time}
                    onChange={handleChange}
                    disabled={!date}
                    required
                  >
                    <option value="">Select a time</option>
                    {availableTimes.map((slot, index) => (
                      <option key={index} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Reason for Visit</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="reason"
                    value={reason}
                    onChange={handleChange}
                    placeholder="Briefly describe your symptoms or reason for consultation"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Additional Notes (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={notes}
                    onChange={handleChange}
                    placeholder="Any additional information you'd like to share with the doctor"
                  />
                </Form.Group>
                
                <div className="d-flex justify-content-between">
                  <Link to={`/patient/doctors/${doctorId}`}>
                    <Button variant="outline-secondary">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Booking...' : 'Book Appointment'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookAppointment; 