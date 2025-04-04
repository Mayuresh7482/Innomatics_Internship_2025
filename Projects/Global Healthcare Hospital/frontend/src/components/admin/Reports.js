import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';

const Reports = () => {
  const [reportType, setReportType] = useState('appointments');
  const [dateRange, setDateRange] = useState('month');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  const getDateRangeText = () => {
    switch (dateRange) {
      case 'week':
        return 'Last 7 days';
      case 'month':
        return 'Last 30 days';
      case 'quarter':
        return 'Last 3 months';
      case 'year':
        return 'Last 12 months';
      case 'custom':
        return `${customDateRange.startDate} to ${customDateRange.endDate}`;
      default:
        return 'Last 30 days';
    }
  };

  const generateReport = useCallback(() => {
    setLoading(true);
    
    // Mock data - in a real app, this would be an API call
    setTimeout(() => {
      let data;
      
      if (reportType === 'appointments') {
        data = {
          title: 'Appointments Report',
          dateRange: getDateRangeText(),
          summary: {
            total: 450,
            completed: 320,
            cancelled: 50,
            pending: 80
          },
          details: [
            { department: 'Cardiology', count: 120, percentage: 26.7 },
            { department: 'Neurology', count: 85, percentage: 18.9 },
            { department: 'Orthopedics', count: 75, percentage: 16.7 },
            { department: 'Pediatrics', count: 65, percentage: 14.4 },
            { department: 'Dermatology', count: 55, percentage: 12.2 },
            { department: 'Others', count: 50, percentage: 11.1 }
          ]
        };
      } else if (reportType === 'doctors') {
        data = {
          title: 'Doctors Performance Report',
          dateRange: getDateRangeText(),
          summary: {
            totalDoctors: 15,
            totalAppointments: 450,
            avgAppointmentsPerDoctor: 30
          },
          details: [
            { doctor: 'Dr. John Smith', department: 'Cardiology', appointments: 45, rating: 4.8 },
            { doctor: 'Dr. Sarah Johnson', department: 'Dermatology', appointments: 38, rating: 4.7 },
            { doctor: 'Dr. Michael Brown', department: 'Neurology', appointments: 42, rating: 4.9 },
            { doctor: 'Dr. Emily Davis', department: 'Pediatrics', appointments: 35, rating: 4.6 },
            { doctor: 'Dr. Robert Wilson', department: 'Orthopedics', appointments: 40, rating: 4.8 }
          ]
        };
      } else if (reportType === 'patients') {
        data = {
          title: 'Patient Statistics Report',
          dateRange: getDateRangeText(),
          summary: {
            totalPatients: 120,
            newPatients: 25,
            returningPatients: 95,
            avgAppointmentsPerPatient: 3.75
          },
          details: [
            { ageGroup: '0-18', count: 28, percentage: 23.3 },
            { ageGroup: '19-35', count: 35, percentage: 29.2 },
            { ageGroup: '36-50', count: 32, percentage: 26.7 },
            { ageGroup: '51-65', count: 18, percentage: 15.0 },
            { ageGroup: '65+', count: 7, percentage: 5.8 }
          ]
        };
      } else if (reportType === 'revenue') {
        data = {
          title: 'Revenue Report',
          dateRange: getDateRangeText(),
          summary: {
            totalRevenue: 67500,
            avgRevenuePerAppointment: 150,
            avgRevenuePerDay: 2250
          },
          details: [
            { department: 'Cardiology', revenue: 18000, percentage: 26.7 },
            { department: 'Neurology', revenue: 13600, percentage: 20.1 },
            { department: 'Orthopedics', revenue: 12750, percentage: 18.9 },
            { department: 'Pediatrics', revenue: 7800, percentage: 11.6 },
            { department: 'Dermatology', revenue: 7150, percentage: 10.6 },
            { department: 'Others', revenue: 8200, percentage: 12.1 }
          ]
        };
      }
      
      setReportData(data);
      setLoading(false);
    }, 1000);
  }, [reportType, dateRange, customDateRange]);

  useEffect(() => {
    generateReport();
  }, [generateReport]);

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
  };

  const handleCustomDateChange = (e) => {
    setCustomDateRange({
      ...customDateRange,
      [e.target.name]: e.target.value
    });
  };

  const handleCustomDateSubmit = (e) => {
    e.preventDefault();
    generateReport();
  };

  const handleExportReport = () => {
    alert('Report exported successfully!');
  };

  const renderReportContent = () => {
    if (!reportData) return null;

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>{reportData.title}</h3>
          <Button variant="outline-primary" onClick={handleExportReport}>
            <FaDownload className="me-2" /> Export Report
          </Button>
        </div>
        
        <p className="text-muted">Period: {reportData.dateRange}</p>
        
        <Row className="mb-4">
          {reportType === 'appointments' && (
            <>
              <Col md={3}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>Total Appointments</h5>
                    <h2 className="text-primary">{reportData.summary.total}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>Completed</h5>
                    <h2 className="text-success">{reportData.summary.completed}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>Cancelled</h5>
                    <h2 className="text-danger">{reportData.summary.cancelled}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>Pending</h5>
                    <h2 className="text-warning">{reportData.summary.pending}</h2>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
          
          {reportType === 'doctors' && (
            <>
              <Col md={4}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>Total Doctors</h5>
                    <h2 className="text-primary">{reportData.summary.totalDoctors}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>Total Appointments</h5>
                    <h2 className="text-success">{reportData.summary.totalAppointments}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>Avg. Appointments per Doctor</h5>
                    <h2 className="text-info">{reportData.summary.avgAppointmentsPerDoctor}</h2>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
          
          {reportType === 'patients' && (
            <>
              <Col md={3}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>Total Patients</h5>
                    <h2 className="text-primary">{reportData.summary.totalPatients}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>New Patients</h5>
                    <h2 className="text-success">{reportData.summary.newPatients}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>Returning Patients</h5>
                    <h2 className="text-info">{reportData.summary.returningPatients}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>Avg. Appointments per Patient</h5>
                    <h2 className="text-warning">{reportData.summary.avgAppointmentsPerPatient}</h2>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
          
          {reportType === 'revenue' && (
            <>
              <Col md={4}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>Total Revenue</h5>
                    <h2 className="text-primary">${reportData.summary.totalRevenue}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>Avg. Revenue per Appointment</h5>
                    <h2 className="text-success">${reportData.summary.avgRevenuePerAppointment}</h2>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-center h-100 shadow-sm">
                  <Card.Body>
                    <h5>Avg. Revenue per Day</h5>
                    <h2 className="text-info">${reportData.summary.avgRevenuePerDay}</h2>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>
        
        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">Detailed Report</h5>
          </Card.Header>
          <Card.Body>
            <Table responsive striped hover>
              <thead>
                <tr>
                  {reportType === 'appointments' && (
                    <>
                      <th>Department</th>
                      <th>Appointments</th>
                      <th>Percentage</th>
                    </>
                  )}
                  
                  {reportType === 'doctors' && (
                    <>
                      <th>Doctor</th>
                      <th>Department</th>
                      <th>Appointments</th>
                      <th>Rating</th>
                    </>
                  )}
                  
                  {reportType === 'patients' && (
                    <>
                      <th>Age Group</th>
                      <th>Patient Count</th>
                      <th>Percentage</th>
                    </>
                  )}
                  
                  {reportType === 'revenue' && (
                    <>
                      <th>Department</th>
                      <th>Revenue</th>
                      <th>Percentage</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {reportType === 'appointments' && reportData.details.map((item, index) => (
                  <tr key={index}>
                    <td>{item.department}</td>
                    <td>{item.count}</td>
                    <td>{item.percentage}%</td>
                  </tr>
                ))}
                
                {reportType === 'doctors' && reportData.details.map((item, index) => (
                  <tr key={index}>
                    <td>{item.doctor}</td>
                    <td>{item.department}</td>
                    <td>{item.appointments}</td>
                    <td>{item.rating}/5</td>
                  </tr>
                ))}
                
                {reportType === 'patients' && reportData.details.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ageGroup}</td>
                    <td>{item.count}</td>
                    <td>{item.percentage}%</td>
                  </tr>
                ))}
                
                {reportType === 'revenue' && reportData.details.map((item, index) => (
                  <tr key={index}>
                    <td>{item.department}</td>
                    <td>${item.revenue}</td>
                    <td>{item.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        
        <div className="text-center">
          <p className="text-muted">
            This report was generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    );
  };

  return (
    <Container>
      <h2 className="mb-4">Reports & Analytics</h2>
      
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="align-items-end">
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Report Type</Form.Label>
                <Form.Select value={reportType} onChange={handleReportTypeChange}>
                  <option value="appointments">Appointments Report</option>
                  <option value="doctors">Doctors Performance Report</option>
                  <option value="patients">Patient Statistics Report</option>
                  <option value="revenue">Revenue Report</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Date Range</Form.Label>
                <Form.Select value={dateRange} onChange={handleDateRangeChange}>
                  <option value="week">Last 7 days</option>
                  <option value="month">Last 30 days</option>
                  <option value="quarter">Last 3 months</option>
                  <option value="year">Last 12 months</option>
                  <option value="custom">Custom Range</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            {dateRange === 'custom' && (
              <Col md={4}>
                <Form onSubmit={handleCustomDateSubmit}>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="startDate"
                          value={customDateRange.startDate}
                          onChange={handleCustomDateChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="endDate"
                          value={customDateRange.endDate}
                          onChange={handleCustomDateChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button type="submit" variant="primary" className="w-100">
                    Apply
                  </Button>
                </Form>
              </Col>
            )}
            
            {dateRange !== 'custom' && (
              <Col md={4}>
                <Button 
                  variant="primary" 
                  className="w-100"
                  onClick={generateReport}
                  disabled={loading}
                >
                  {loading ? 'Generating...' : 'Generate Report'}
                </Button>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>
      
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Generating report...</p>
        </div>
      ) : (
        reportData && renderReportContent()
      )}
      
      {!loading && !reportData && (
        <div className="text-center py-5">
          <p>Select report type and date range, then click "Generate Report"</p>
        </div>
      )}
    </Container>
  );
};

export default Reports; 