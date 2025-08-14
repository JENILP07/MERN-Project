import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navigation.css";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const linkVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      variants={navVariants}
      initial="initial"
      animate="animate"
      className={`modern-navbar ${isScrolled ? "scrolled" : ""}`}
    >
      <Navbar expand="lg" className="py-3">
        <Container>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Navbar.Brand as={Link} to="/home" className="brand-logo">
              <div className="logo-container">
                <div className="logo-icon">
                  <svg viewBox="0 0 24 24" className="logo-svg">
                    <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14 4.14 5.57 2 7.71 3.43 9.14 2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22 14.86 20.57Z" fill="currentColor"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" opacity="0.3"/>
                  </svg>
                  <div className="logo-pulse"></div>
                </div>
                <div className="brand-content">
                  <span className="brand-text gradient-text">FitLife</span>
                  <span className="brand-subtitle">Gym Management</span>
                </div>
              </div>
            </Navbar.Brand>
          </motion.div>

          <Navbar.Toggle 
            aria-controls="basic-navbar-nav"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="custom-toggler"
          />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {[
                { path: "/home", name: "Home" },
                { path: "/About", name: "About" },
                { path: "/Trainers", name: "Trainers" },
                { path: "/Contact", name: "Contact" },
              ].map((item, index) => (
                <motion.div
                  key={item.path}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <Nav.Link
                    as={Link}
                    to={item.path}
                    className={`nav-link-modern ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                  >
                    {item.name}
                  </Nav.Link>
                </motion.div>
              ))}
            </Nav>

            <Nav className="auth-buttons">
              <motion.div
                variants={linkVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
              >
                <Button 
                  as={Link} 
                  to="/SignIn" 
                  variant="outline-primary" 
                  className="btn-modern btn-signin me-2"
                >
                  Sign In
                </Button>
              </motion.div>
              <motion.div
                variants={linkVariants}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.5 }}
              >
                <Button 
                  as={Link} 
                  to="/SignUp" 
                  className="btn-modern btn-primary-modern"
                >
                  Get Started
                </Button>
              </motion.div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
};

export default Navigation;
