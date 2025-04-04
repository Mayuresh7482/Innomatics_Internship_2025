import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt, FaUserMd, FaCalendarCheck, FaHospital, FaHeartbeat, FaBrain, FaBone, FaBaby, FaFemale, FaAllergies } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
  const { currentUser, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar 
      bg={scrolled ? "white" : "primary"} 
      variant={scrolled ? "light" : "dark"} 
      expand="lg" 
      fixed="top"
      className={`py-2 transition-all ${scrolled ? 'shadow-sm navbar-scrolled' : ''}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src="/images/logo.svg" 
            alt="Global Healthcare Logo" 
            className="me-2"
            width="40"
            height="40"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/40x40?text=GH";
            }}
          />
          <span className={scrolled ? "text-primary" : ""}>Global Healthcare</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Nav.Link>
            
            <NavDropdown 
              title="Services" 
              id="services-dropdown"
              className={location.pathname.includes('/services') ? 'active' : ''}
            >
              <NavDropdown.Item as={Link} to="/services">
                All Services
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/services/cardiology">
                <FaHeartbeat className="me-2 text-primary" /> Cardiology
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/neurology">
                <FaBrain className="me-2 text-primary" /> Neurology
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/orthopedics">
                <FaBone className="me-2 text-primary" /> Orthopedics
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/pediatrics">
                <FaBaby className="me-2 text-primary" /> Pediatrics
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/gynecology">
                <FaFemale className="me-2 text-primary" /> Gynecology
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/services/dermatology">
                <FaAllergies className="me-2 text-primary" /> Dermatology
              </NavDropdown.Item>
            </NavDropdown>
            
            {!isAuthenticated ? (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/login"
                  className={location.pathname === '/login' ? 'active' : ''}
                >
                  Login
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/register"
                  className="ms-lg-2"
                >
                  <Button 
                    variant={scrolled ? "primary" : "light"} 
                    size="sm" 
                    className="rounded-pill px-3"
                  >
                    Register
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <>
                {currentUser && currentUser.role === 'patient' && (
                  <>
                    <Nav.Link 
                      as={Link} 
                      to="/patient/dashboard"
                      className={location.pathname.includes('/patient/dashboard') ? 'active' : ''}
                    >
                      Dashboard
                    </Nav.Link>
                    <Nav.Link 
                      as={Link} 
                      to="/patient/doctors"
                      className={location.pathname.includes('/patient/doctors') ? 'active' : ''}
                    >
                      <FaUserMd className="me-1" />
                      Find Doctors
                    </Nav.Link>
                    <Nav.Link 
                      as={Link} 
                      to="/patient/appointments"
                      className={location.pathname.includes('/patient/appointments') ? 'active' : ''}
                    >
                      <FaCalendarCheck className="me-1" />
                      My Appointments
                    </Nav.Link>
                  </>
                )}

                {currentUser && currentUser.role === 'doctor' && (
                  <>
                    <Nav.Link 
                      as={Link} 
                      to="/doctor/dashboard"
                      className={location.pathname.includes('/doctor/dashboard') ? 'active' : ''}
                    >
                      Dashboard
                    </Nav.Link>
                    <Nav.Link 
                      as={Link} 
                      to="/doctor/appointments"
                      className={location.pathname.includes('/doctor/appointments') ? 'active' : ''}
                    >
                      <FaCalendarCheck className="me-1" />
                      Appointments
                    </Nav.Link>
                    <Nav.Link 
                      as={Link} 
                      to="/doctor/availability"
                      className={location.pathname.includes('/doctor/availability') ? 'active' : ''}
                    >
                      Availability
                    </Nav.Link>
                  </>
                )}

                {currentUser && currentUser.role === 'admin' && (
                  <>
                    <Nav.Link 
                      as={Link} 
                      to="/admin/dashboard"
                      className={location.pathname.includes('/admin/dashboard') ? 'active' : ''}
                    >
                      <FaHospital className="me-1" />
                      Dashboard
                    </Nav.Link>
                    <NavDropdown 
                      title={
                        <span>
                          Manage
                        </span>
                      } 
                      id="admin-dropdown"
                      className={location.pathname.includes('/admin/') && !location.pathname.includes('/admin/dashboard') ? 'active' : ''}
                    >
                      <NavDropdown.Item as={Link} to="/admin/doctors">
                        Doctors
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/users">
                        Users
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/admin/appointments">
                        Appointments
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}

                <NavDropdown 
                  title={
                    <span className="d-flex align-items-center">
                      <FaUserCircle className="me-1" size={18} />
                      {currentUser ? currentUser.name : 'Profile'}
                    </span>
                  } 
                  id="profile-dropdown"
                  align="end"
                >
                  {currentUser && (
                    <NavDropdown.Item as={Link} to={`/${currentUser.role}/profile`}>
                      My Profile
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="text-danger">
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 