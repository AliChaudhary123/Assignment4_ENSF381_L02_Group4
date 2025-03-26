import React from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.jpg'; 


function Header() {
    // Define styles
    const headerStyle = {
      backgroundColor: '#004080', 
      color: 'white',
      padding: '20px',
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    };
  
    const imgStyle = {
      width: '80px',
      height: '80px',
    };
  
    const navLinksStyle = {
      display: 'flex',
      gap: '20px',
    };
  
    const linkStyle = {
      color: 'white',
      textDecoration: 'none',
      fontSize: '18px',
    };


    return (
        <header style={headerStyle}>
          <div className="logo">
          <img src={logo} alt="LMS Logo" style={imgStyle} />
          </div>
          <nav className="nav-links" style={navLinksStyle}>
            <Link to="/" style={linkStyle}>Home</Link>
            <Link to="/courses" style={linkStyle}>Courses</Link>
            <Link to="/login" style={linkStyle}>Login</Link>
          </nav>
        </header>
    );
  
 
  }
  
  export default Header;