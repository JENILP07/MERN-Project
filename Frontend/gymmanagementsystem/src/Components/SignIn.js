import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import Navigation from "./Navigation";
import "./SignIn.css";
import "../styles/globals.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      if (role === "admin") {
        const adminCredentials = {
          email: "admin@gmail.com",
          password: "admin123",
        };

        if (email === adminCredentials.email && password === adminCredentials.password) {
          navigate("/AdminDashboard");
        } else {
          setErrorMessage("Invalid admin credentials");
        }
      } else {
        try {
          const response = await fetch("http://localhost:3010/api/signin", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const data = await response.json();

          if (response.ok && data.data?._id) {
            localStorage.setItem("id", data.data._id);
            navigate("/UserDashboard");
          } else {
            setErrorMessage(data.message || "Invalid login credentials");
          }
        } catch (error) {
          setErrorMessage("Server error. Please try again later.");
        }
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="signin-container">
      <Navigation />
      
      <motion.div
        className="signin-background"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Container className="signin-content">
          <Row className="justify-content-center align-items-center min-vh-100">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              <motion.div variants={itemVariants}>
                <Card className="signin-card">
                  <Card.Body className="p-5">
                    <motion.div 
                      variants={itemVariants}
                      className="text-center mb-4"
                    >
                      <h2 className="signin-title">
                        Welcome <span className="gradient-text">Back</span>
                      </h2>
                      <p className="signin-subtitle">
                        Sign in to your account to continue
                      </p>
                    </motion.div>

                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-3"
                      >
                        <Alert variant="danger" className="modern-alert">
                          {errorMessage}
                        </Alert>
                      </motion.div>
                    )}

                    <motion.div variants={itemVariants}>
                      <Form onSubmit={handleSubmit}>
                        <Row className="mb-4">
                          <Col>
                            <Form.Label className="role-label">I am a:</Form.Label>
                            <div className="role-selector">
                              <Form.Check
                                type="radio"
                                id="member-role"
                                name="role"
                                value="member"
                                checked={role === "member"}
                                onChange={() => setRole("member")}
                                label="Member"
                                className="role-option"
                              />
                              <Form.Check
                                type="radio"
                                id="admin-role"
                                name="role"
                                value="admin"
                                checked={role === "admin"}
                                onChange={() => setRole("admin")}
                                label="Admin"
                                className="role-option"
                              />
                            </div>
                          </Col>
                        </Row>

                        <motion.div variants={itemVariants} className="mb-3">
                          <Form.Group>
                            <Form.Label className="modern-label">Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="modern-input"
                              disabled={isLoading}
                            />
                          </Form.Group>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-4">
                          <Form.Group>
                            <Form.Label className="modern-label">Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Enter your password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              className="modern-input"
                              disabled={isLoading}
                            />
                          </Form.Group>
                        </motion.div>

                        <motion.div
                          variants={itemVariants}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="mb-4"
                        >
                          <Button
                            type="submit"
                            className="btn-modern btn-primary-modern w-100"
                            size="lg"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                Signing In...
                              </>
                            ) : (
                              "Sign In"
                            )}
                          </Button>
                        </motion.div>

                        <motion.div variants={itemVariants} className="text-center">
                          <p className="signin-footer">
                            Don't have an account?{" "}
                            <Link to="/SignUp" className="signin-link">
                              Sign up here
                            </Link>
                          </p>
                        </motion.div>
                      </Form>
                    </motion.div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </div>
  );
};

export default SignIn;
