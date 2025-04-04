import React, { useContext, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaHeart, FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const MainNavbar = () => {
  const { currentUser, logout, refreshUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Effect to ensure user data is fresh from localStorage on every render and focus
  useEffect(() => {
    // Refresh on component mount
    refreshUserData();
    
    // Also refresh when window gets focus (user may have updated in another tab)
    const handleFocus = () => {
      console.log("Window focused, refreshing user data");
      refreshUserData();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [refreshUserData]);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Get first letter of user name for profile icon
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <Navbar expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaHeart className="text-danger" size={24} />
          <span className="ms-2">Hunger Help</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/ngos">NGOs</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
            
            {currentUser ? (
              <>
                <div className="notification-icon d-flex align-items-center">
                  <Link to="/notifications" className="text-dark position-relative">
                    <FaBell size={20} />
                    <span className="notification-badge">2</span>
                  </Link>
                </div>
                
                <Dropdown className="user-dropdown">
                  <Dropdown.Toggle as="div" id="user-dropdown">
                    <div className="profile-icon">
                      {getInitial(currentUser.name)}
                    </div>
                    <span className="d-none d-lg-block">{currentUser.name}</span>
                  </Dropdown.Toggle>
                  
                  <Dropdown.Menu align="end">
                    <Dropdown.Item as={Link} to="/dashboard">
                      <FaUser className="me-2" /> Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/profile">
                      <FaUser className="me-2" /> Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <div className="d-flex align-items-center">
                <Nav.Link as={Link} to="/login" className="me-2">Login</Nav.Link>
                <Button as={Link} to="/register" variant="primary">Sign Up</Button>
              </div>
            )}
            
            {currentUser?.role === 'donor' && (
              <Button 
                as={Link} 
                to="/donate" 
                variant="primary" 
                className="ms-lg-3 mt-3 mt-lg-0"
              >
                Donate
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar; 