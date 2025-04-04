import React, { useState, useEffect, useContext } from 'react';
import { Navbar, Nav, Container, Badge, Button, Dropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle, FaSignOutAlt, FaSignInAlt, FaHeart, FaHandsHelping } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { NotificationContext } from '../../context/NotificationContext';
import { placeholders } from '../../utils/generatePlaceholderImages';
import '../../styles/Header.css';

const Header = () => {
  const { currentUser, isAuthenticated, logout } = useContext(AuthContext);
  const { unreadCount } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Handle scrolling effect for the navbar
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
    navigate('/');
  };

  return (
    <Navbar 
      variant="dark" 
      fixed="top" 
      expand="lg" 
      className={`py-2 transition-all ${scrolled ? 'navbar-scrolled' : 'bg-transparent'}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          {scrolled ? (
            <img 
              src={placeholders.logo} 
              alt="Hunger Help" 
              height="40" 
              className="d-inline-block align-top me-2"
            />
          ) : (
            <FaHeart className="text-warning me-2" size={24} />
          )}
          <span className="fw-bold">Hunger Help</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" className="nav-link-hover mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/ngos" className="nav-link-hover mx-2">
              NGOs
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="nav-link-hover mx-2">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="nav-link-hover mx-2">
              Contact
            </Nav.Link>
            
            {isAuthenticated ? (
              <>
                <Nav.Link 
                  as={NavLink} 
                  to="/donate"
                  className="btn btn-sm btn-primary text-white mx-2 px-3"
                >
                  <FaHandsHelping className="me-1" /> Donate
                </Nav.Link>
                
                <Nav.Link 
                  as={NavLink} 
                  to="/notifications" 
                  className="position-relative mx-2 notification-indicator"
                >
                  <FaBell size={20} />
                  {unreadCount > 0 && (
                    <Badge 
                      bg="danger" 
                      pill 
                      className="notification-badge"
                    >
                      {unreadCount}
                    </Badge>
                  )}
                </Nav.Link>
                
                <Dropdown align="end" className="mx-2 user-dropdown">
                  <Dropdown.Toggle 
                    variant="link" 
                    id="dropdown-user" 
                    className="nav-link p-0 d-flex align-items-center"
                  >
                    <FaUserCircle size={28} className="me-1" />
                    <span className="d-none d-lg-inline ms-1 fw-medium">
                      {currentUser?.name ? currentUser.name.split(' ')[0] : 'User'}
                    </span>
                  </Dropdown.Toggle>
                  
                  <Dropdown.Menu className="shadow border-0">
                    <Dropdown.Item as={Link} to="/dashboard">Dashboard</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/my-donations">My Donations</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <div className="d-flex ms-lg-2 mt-3 mt-lg-0">
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline-primary" 
                  className="me-2"
                >
                  <FaSignInAlt className="me-1 d-none d-sm-inline" /> Login
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="primary"
                >
                  Register
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 