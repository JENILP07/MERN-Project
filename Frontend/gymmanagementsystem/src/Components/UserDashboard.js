import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Alert, Badge, Modal, ProgressBar, Nav } from 'react-bootstrap';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserDashboard.css';

const UserDashboard = () => {
  const [user, setUser] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Plan: '',
    Age: '',
    Gender: '',
    FitnessGoal: '',
    MedicalConditions: '',
    EmergencyContact: '',
    Status: 'Active',
    CreatedAt: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (!id) {
      navigate('/SignIn');
      return;
    }

    // Fetch user details from backend
    fetch(`http://localhost:3010/members/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setError('Failed to load user details.');
        setLoading(false);
      });
  }, [id, navigate]);
  
  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to original values
    fetch(`http://localhost:3010/members/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch(`http://localhost:3010/members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      
      setTimeout(() => setSuccess(''), 5000);
    } catch (error) {
      console.error('Error saving user data:', error);
      setError('Failed to save changes. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    navigate('/');
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Premium': return 'success';
      case 'Standard': return 'primary';
      case 'Basic': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'warning';
      case 'Suspended': return 'danger';
      default: return 'secondary';
    }
  };

  const getMembershipProgress = () => {
    const joinDate = new Date(user.CreatedAt);
    const now = new Date();
    const diffTime = Math.abs(now - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const yearlyProgress = Math.min((diffDays / 365) * 100, 100);
    return Math.round(yearlyProgress);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-dashboard">
      <Container fluid className="py-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-header mb-4"
        >
          <Row className="align-items-center">
            <Col>
              <div className="d-flex align-items-center">
                <div className="user-avatar">
                  <span className="avatar-text">
                    {user.Name ? user.Name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div className="ms-3">
                  <h2 className="mb-0 text-gradient">Welcome back, {user.Name}!</h2>
                  <p className="text-muted mb-0">Member since {formatDate(user.CreatedAt)}</p>
                </div>
              </div>
            </Col>
            <Col xs="auto">
              <Button 
                variant="outline-danger" 
                onClick={() => setShowLogoutModal(true)}
                className="btn-modern"
              >
                <i className="fas fa-sign-out-alt me-2"></i>
                Logout
              </Button>
            </Col>
          </Row>
        </motion.div>

        {/* Alerts */}
        {error && (
          <Alert variant="danger" className="modern-alert" dismissible onClose={() => setError('')}>
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="modern-alert" dismissible onClose={() => setSuccess('')}>
            <i className="fas fa-check-circle me-2"></i>
            {success}
          </Alert>
        )}

        {/* Navigation Tabs */}
        <Nav variant="pills" className="dashboard-nav mb-4">
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')}
              className="nav-tab"
            >
              <i className="fas fa-user me-2"></i>
              Profile
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'membership'} 
              onClick={() => setActiveTab('membership')}
              className="nav-tab"
            >
              <i className="fas fa-dumbbell me-2"></i>
              Membership
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'fitness'} 
              onClick={() => setActiveTab('fitness')}
              className="nav-tab"
            >
              <i className="fas fa-heart me-2"></i>
              Fitness Profile
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Row>
              <Col lg={8}>
                <Card className="dashboard-card">
                  <Card.Header className="card-header-modern">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">
                        <i className="fas fa-user-circle me-2 text-primary"></i>
                        Personal Information
                      </h5>
                      {!isEditing && (
                        <Button variant="outline-primary" size="sm" onClick={handleEdit}>
                          <i className="fas fa-edit me-1"></i>
                          Edit Profile
                        </Button>
                      )}
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={handleSave}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="form-label-modern">Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              value={user.Name || ''}
                              onChange={(e) => setUser({ ...user, Name: e.target.value })}
                              disabled={!isEditing}
                              className="form-control-modern"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="form-label-modern">Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              value={user.Email || ''}
                              onChange={(e) => setUser({ ...user, Email: e.target.value })}
                              disabled={!isEditing}
                              className="form-control-modern"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="form-label-modern">Phone Number</Form.Label>
                            <Form.Control
                              type="tel"
                              value={user.Phone || ''}
                              onChange={(e) => setUser({ ...user, Phone: e.target.value })}
                              disabled={!isEditing}
                              className="form-control-modern"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="form-label-modern">Emergency Contact</Form.Label>
                            <Form.Control
                              type="tel"
                              value={user.EmergencyContact || ''}
                              onChange={(e) => setUser({ ...user, EmergencyContact: e.target.value })}
                              disabled={!isEditing}
                              className="form-control-modern"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      {isEditing && (
                        <div className="d-flex gap-2 mt-3">
                          <Button type="submit" variant="success" className="btn-modern">
                            <i className="fas fa-save me-1"></i>
                            Save Changes
                          </Button>
                          <Button type="button" variant="outline-secondary" onClick={handleCancel}>
                            <i className="fas fa-times me-1"></i>
                            Cancel
                          </Button>
                        </div>
                      )}
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col lg={4}>
                <Card className="dashboard-card status-card">
                  <Card.Body className="text-center">
                    <div className="status-icon mb-3">
                      <i className="fas fa-user-check"></i>
                    </div>
                    <h6 className="text-muted mb-2">Account Status</h6>
                    <Badge bg={getStatusColor(user.Status)} className="status-badge">
                      {user.Status}
                    </Badge>
                    <hr className="my-3" />
                    <div className="stat-item">
                      <span className="stat-label">Member ID</span>
                      <span className="stat-value">#{id?.slice(-6) || 'N/A'}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </motion.div>
        )}

        {/* Membership Tab */}
        {activeTab === 'membership' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Row>
              <Col lg={8}>
                <Card className="dashboard-card">
                  <Card.Header className="card-header-modern">
                    <h5 className="mb-0">
                      <i className="fas fa-dumbbell me-2 text-primary"></i>
                      Membership Details
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <div className="membership-info">
                          <h6 className="text-muted mb-2">Current Plan</h6>
                          <div className="d-flex align-items-center mb-3">
                            <Badge bg={getPlanColor(user.Plan)} className="plan-badge me-2">
                              {user.Plan} Plan
                            </Badge>
                            <small className="text-success">
                              <i className="fas fa-check-circle me-1"></i>
                              Active
                            </small>
                          </div>
                          
                          <h6 className="text-muted mb-2">Membership Progress</h6>
                          <div className="mb-3">
                            <ProgressBar 
                              now={getMembershipProgress()} 
                              variant="success" 
                              className="custom-progress"
                            />
                            <small className="text-muted">
                              {getMembershipProgress()}% through your membership year
                            </small>
                          </div>
                        </div>
                      </Col>
                      
                      <Col md={6}>
                        <div className="membership-stats">
                          <div className="stat-card">
                            <div className="stat-icon">
                              <i className="fas fa-calendar-check"></i>
                            </div>
                            <div>
                              <h6 className="mb-0">Join Date</h6>
                              <small className="text-muted">{formatDate(user.CreatedAt)}</small>
                            </div>
                          </div>
                          
                          <div className="stat-card">
                            <div className="stat-icon">
                              <i className="fas fa-star"></i>
                            </div>
                            <div>
                              <h6 className="mb-0">Plan Benefits</h6>
                              <small className="text-success">All features included</small>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col lg={4}>
                <Card className="dashboard-card quick-actions">
                  <Card.Header className="card-header-modern">
                    <h6 className="mb-0">
                      <i className="fas fa-bolt me-2"></i>
                      Quick Actions
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-grid gap-2">
                      <Button variant="outline-primary" size="sm" className="action-btn">
                        <i className="fas fa-credit-card me-2"></i>
                        Payment History
                      </Button>
                      <Button variant="outline-success" size="sm" className="action-btn">
                        <i className="fas fa-arrow-up me-2"></i>
                        Upgrade Plan
                      </Button>
                      <Button variant="outline-info" size="sm" className="action-btn">
                        <i className="fas fa-pause me-2"></i>
                        Freeze Membership
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </motion.div>
        )}

        {/* Fitness Tab */}
        {activeTab === 'fitness' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Row>
              <Col lg={8}>
                <Card className="dashboard-card">
                  <Card.Header className="card-header-modern">
                    <h5 className="mb-0">
                      <i className="fas fa-heart me-2 text-primary"></i>
                      Fitness Profile
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <div className="fitness-info">
                          <div className="info-item">
                            <span className="info-label">Age</span>
                            <span className="info-value">{user.Age || 'Not specified'}</span>
                          </div>
                          
                          <div className="info-item">
                            <span className="info-label">Gender</span>
                            <span className="info-value">{user.Gender || 'Not specified'}</span>
                          </div>
                          
                          <div className="info-item">
                            <span className="info-label">Primary Goal</span>
                            <span className="info-value">
                              {user.FitnessGoal ? user.FitnessGoal.replace(/([A-Z])/g, ' $1').trim() : 'Not specified'}
                            </span>
                          </div>
                        </div>
                      </Col>
                      
                      <Col md={6}>
                        <div className="medical-info">
                          <h6 className="text-muted mb-2">Medical Information</h6>
                          <div className="medical-card">
                            {user.MedicalConditions ? (
                              <p className="mb-0 text-warning">
                                <i className="fas fa-exclamation-triangle me-2"></i>
                                {user.MedicalConditions}
                              </p>
                            ) : (
                              <p className="mb-0 text-success">
                                <i className="fas fa-check-circle me-2"></i>
                                No medical conditions reported
                              </p>
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col lg={4}>
                <Card className="dashboard-card fitness-goals">
                  <Card.Header className="card-header-modern">
                    <h6 className="mb-0">
                      <i className="fas fa-target me-2"></i>
                      Fitness Journey
                    </h6>
                  </Card.Header>
                  <Card.Body className="text-center">
                    <div className="goal-icon mb-3">
                      <i className="fas fa-trophy"></i>
                    </div>
                    <h6 className="text-muted mb-2">Current Focus</h6>
                    <Badge bg="primary" className="goal-badge">
                      {user.FitnessGoal ? user.FitnessGoal.replace(/([A-Z])/g, ' $1').trim() : 'General Fitness'}
                    </Badge>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </motion.div>
        )}
      </Container>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered>
        <Modal.Header closeButton className="modal-header-modern">
          <Modal.Title>
            <i className="fas fa-sign-out-alt me-2 text-warning"></i>
            Confirm Logout
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div className="logout-icon mb-3">
            <i className="fas fa-question-circle text-warning"></i>
          </div>
          <p className="mb-0">Are you sure you want to log out of your account?</p>
        </Modal.Body>
        <Modal.Footer className="modal-footer-modern">
          <Button variant="outline-secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt me-1"></i>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserDashboard;
