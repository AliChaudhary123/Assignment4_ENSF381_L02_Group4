import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './RegForm.css'; 

function RegForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });
  const [errors, setErrors] = useState([]);

  const validate = () => {
    const newErrors = [];
    const usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/`~])[A-Za-z\d!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/`~]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|io)$/;

    if (!usernameRegex.test(formData.username)) {
      newErrors.push('Invalid username. It should be 3-20 characters long and start with a letter.');
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.push('Invalid password. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match.');
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.push('Invalid email address. It should be a valid email with .com, .net, or .io domain.');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    if (!validate()) {
      return; // Don't submit if validation fails
    }

    const backendEndpoint = 'http://127.0.0.1:5000';

    try {
      const response = await fetch(backendEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email
        }), // Converts JavaScript object into JSON
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
        navigate('/login'); // Redirect to Login page on success
      } else {
        console.error('Form submission failed.');
        const errorData = await response.json(); // Get error message from backend if needed
        setErrors([errorData.message || 'Signup failed. Please try again later.']);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      setErrors(['An error occurred while submitting the form. Please try again later.']);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="formContainer">
      <h1 className="title">Sign Up</h1> 
      <form onSubmit={handleSubmit} className="form">
        <div className="inputContainer">
          <label className="label">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="inputContainer">
          <label className="label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="inputContainer">
          <label className="label">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="inputContainer">
          <label className="label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
        </div>

        <button type="submit" className="submitButton">
          Sign Up
        </button>
      </form>

      {errors.length > 0 && (
        <div className="errorContainer">
          {errors.map((error, index) => (
            <p key={index} className="errorText">{error}</p>
          ))}
        </div>
      )}
      <div className="LoginLinkContainer">
        <Link to="/login" className="loginLink">
          Already have an account? Login here
        </Link>
      </div>
    </div>
  );
}

export default RegForm;