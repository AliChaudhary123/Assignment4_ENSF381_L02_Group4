import React from 'react';

function Footer() {
    
    const footerStyle = {
      backgroundColor: '#004080', 
      color: 'white',
      textAlign: 'center',
      padding: '10px',
      marginTop: '20px',
    };
  
    return (
      <footer style={footerStyle}>
        <p>&copy; 2025 LMS Platform. All rights reserved.</p>
      </footer>
    );
  }
  
  export default Footer;
