import React, { useState, useEffect } from 'react';
import './Home.css';
import Login from '../Login/Login';

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  };

  const handleGetStarted = () => {
    setShowLogin(true);
   
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
    
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="home">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="logo">NariSuraksha</div>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#emergency">Emergency</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <button 
        className="theme-toggle" 
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1 className="animate-text">Safety at Your Fingertips</h1>
          <p className="animate-text-delay">Empowering Women with new innovations</p>
          <div className="hero-buttons">
            <button className="cta-button primary" onClick={handleGetStarted}>Get Started</button>
            <button className="cta-button secondary">Watch Demo</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-elements">
            <div className="float-element">🚨</div>
            <div className="float-element">📍</div>
            <div className="float-element">👥</div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">🚨</div>
            <h3>Instant Alert</h3>
            <p>One-tap emergency alert with location sharing</p>
          </div>
          <div className="feature-card">
            <div className="icon">📍</div>
            <h3>Live Tracking</h3>
            <p>Real-time location tracking with trusted contacts</p>
          </div>
          <div className="feature-card">
            <div className="icon">👥</div>
            <h3>Safety Network</h3>
            <p>Connect with nearby safety volunteers</p>
          </div>
          <div className="feature-card">
            <div className="icon">📱</div>
            <h3>Smart Features</h3>
            <p>AI-powered risk assessment</p>
          </div>
        </div>
      </section>

      <section className="emergency" id="emergency">
        <div className="emergency-content">
          <h2>Emergency? Act Fast!</h2>
          <div className="emergency-buttons">
            <button className="emergency-btn police">
              <span className="btn-icon">🚔</span>
              Call Police
            </button>
            <button className="emergency-btn alert">
              <span className="btn-icon">⚠️</span>
              Send Alert
            </button>
            <button className="emergency-btn location">
              <span className="btn-icon">📍</span>
              Share Location
            </button>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-content">
          <h2>Get in Touch</h2>
          <div className="contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="Your Message"></textarea>
            <button className="submit-btn">Send Message</button>
          </div>
        </div>
      </section>

      {showLogin && <Login onClose={handleCloseLogin} />}
    </div>
  );
};

export default Home;