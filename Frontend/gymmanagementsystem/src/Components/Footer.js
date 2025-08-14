import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="modern-footer">
      <Container>
        <Row className="gy-4">
          <Col lg={4} md={6}>
            <div className="footer-brand">
              <h3 className="brand-text gradient-text">FitLife</h3>
              <p className="footer-description">
                Transform your fitness journey with our state-of-the-art facilities, 
                expert trainers, and personalized programs designed to help you achieve your goals.
              </p>
            </div>
          </Col>
          
          <Col lg={2} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/About">About Us</Link></li>
                <li><Link to="/Trainers">Trainers</Link></li>
                <li><Link to="/Contact">Contact</Link></li>
              </ul>
            </div>
          </Col>
          
          <Col lg={3} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">Services</h5>
              <ul className="footer-links">
                <li><Link to="/SignUp">Personal Training</Link></li>
                <li><Link to="/SignUp">Group Classes</Link></li>
                <li><Link to="/NutritionGuidance">Nutrition Guidance</Link></li>
                <li><Link to="/SignUp">Membership Plans</Link></li>
              </ul>
            </div>
          </Col>
          
          <Col lg={3} md={6}>
            <div className="footer-section">
              <h5 className="footer-title">Contact Info</h5>
              <div className="contact-info">
                <p>📍 123 Fitness Street, Gym City, GC 12345</p>
                <p>📞 (555) 123-4567</p>
                <p>✉️ info@fitlifegym.com</p>
                <div className="social-links">
                  <a href="#" aria-label="Facebook">📘</a>
                  <a href="#" aria-label="Instagram">📷</a>
                  <a href="#" aria-label="Twitter">🐦</a>
                  <a href="#" aria-label="YouTube">📺</a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        <hr className="footer-divider" />
        
        <Row className="footer-bottom">
          <Col md={6}>
            <p>&copy; 2024 FitLife Gym Management. All rights reserved.</p>
          </Col>
          <Col md={6}>
            <div className="footer-legal">
              <Link to="/privacy">Privacy Policy</Link>
              <span className="separator">•</span>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
