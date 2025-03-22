import React, { useState } from 'react';
import './Login.css';

const Login = ({ onClose }) => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!isLoginActive && !formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!isLoginActive && formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!isLoginActive && !formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!isLoginActive && !/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      tempErrors.phoneNumber = "Phone number should be 10 digits";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Here you would typically make an API call to login or register
      // For now, we'll just close the modal after a successful form validation
      alert(isLoginActive ? "Login successful!" : "Account created successfully!");
      onClose();
    }
  };

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
    // Clear errors when switching forms
    setErrors({});
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="login-header">
          <div className="form-toggle">
            <button 
              className={`toggle-btn ${isLoginActive ? 'active' : ''}`}
              onClick={() => setIsLoginActive(true)}
            >
              Login
            </button>
            <button 
              className={`toggle-btn ${!isLoginActive ? 'active' : ''}`}
              onClick={() => setIsLoginActive(false)}
            >
              Sign Up
            </button>
          </div>
        </div>
        
        <div className="login-body">
          <form onSubmit={handleSubmit}>
            {!isLoginActive && (
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
            )}
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            {!isLoginActive && (
              <>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input 
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={errors.phoneNumber ? 'error' : ''}
                  />
                  {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                </div>
              </>
            )}
            
            <button type="submit" className="submit-login-btn">
              {isLoginActive ? 'Login' : 'Create Account'}
            </button>
          </form>
          
          {isLoginActive && (
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
          )}
          
          <div className="social-login">
            <p>Or continue with</p>
            <div className="social-icons">
              <button className="social-btn google">
                <span>Google</span>
              </button>
              <button className="social-btn facebook">
                <span>Facebook</span>
              </button>
            </div>
          </div>
          
          <div className="switch-form">
            <p>
              {isLoginActive ? "Don't have an account?" : "Already have an account?"}
              <button 
                className="switch-btn" 
                onClick={toggleForm}
              >
                {isLoginActive ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;