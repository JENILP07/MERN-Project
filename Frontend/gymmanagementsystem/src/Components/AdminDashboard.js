import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Table, Modal, Alert, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "./AdminDashboard.css";
import "../styles/globals.css";

const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('all');
  
  // Form state for new member
  const [newMember, setNewMember] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Plan: 'Basic',
    Password: ''
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3010/members")
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setAlert({ show: true, message: 'Error loading members', variant: 'danger' });
        setIsLoading(false);
      });
  }, []);

  const handleDeleteConfirm = (member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    fetch(`http://localhost:3010/members/${memberToDelete._id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setMembers(members.filter(m => m._id !== memberToDelete._id));
        setShowDeleteModal(false);
        setMemberToDelete(null);
        setAlert({ show: true, message: 'Member deleted successfully', variant: 'success' });
      })
      .catch((error) => {
        setAlert({ show: true, message: 'Error deleting member', variant: 'danger' });
      });
  };

  const handleEdit = (id) => {
    navigate('/Updatepage/' + id);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch("http://localhost:3010/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers([...members, data]);
        setNewMember({ Name: '', Email: '', Phone: '', Plan: 'Basic', Password: '' });
        setShowAddModal(false);
        setAlert({ show: true, message: 'Member added successfully', variant: 'success' });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error adding member:", error);
        setAlert({ show: true, message: 'Error adding member', variant: 'danger' });
        setIsLoading(false);
      });
  };

  const handleInputChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.Email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = selectedPlan === 'all' || member.Plan === selectedPlan;
    return matchesSearch && matchesPlan;
  });

  const getPlanBadgeColor = (plan) => {
    switch (plan?.toLowerCase()) {
      case 'basic': return 'secondary';
      case 'standard': return 'primary';
      case 'premium': return 'success';
      default: return 'secondary';
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="admin-dashboard">
      <Navigation />
      
      <div className="dashboard-background">
        <Container className="py-5">
          {alert.show && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
                {alert.message}
              </Alert>
            </motion.div>
          )}

          {/* Header Section */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="dashboard-header mb-5"
          >
            <Row className="align-items-center">
              <Col md={8}>
                <h1 className="dashboard-title">
                  Admin <span className="gradient-text">Dashboard</span>
                </h1>
                <p className="dashboard-subtitle">
                  Manage gym members, track subscriptions, and oversee operations
                </p>
              </Col>
              <Col md={4} className="text-md-end">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="btn-modern btn-primary-modern"
                    size="lg"
                    onClick={() => setShowAddModal(true)}
                  >
                    + Add New Member
                  </Button>
                </motion.div>
              </Col>
            </Row>
          </motion.div>

          {/* Stats Cards */}
          <Row className="mb-5">
            {[
              { title: 'Total Members', value: members.length, icon: '👥', color: 'primary' },
              { title: 'Basic Plans', value: members.filter(m => m.Plan?.toLowerCase() === 'basic').length, icon: '📊', color: 'secondary' },
              { title: 'Standard Plans', value: members.filter(m => m.Plan?.toLowerCase() === 'standard').length, icon: '⭐', color: 'primary' },
              { title: 'Premium Plans', value: members.filter(m => m.Plan?.toLowerCase() === 'premium').length, icon: '💎', color: 'success' }
            ].map((stat, index) => (
              <Col lg={3} md={6} key={index} className="mb-4">
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="stat-card h-100">
                    <Card.Body className="d-flex align-items-center">
                      <div className={`stat-icon stat-icon-${stat.color}`}>
                        {stat.icon}
                      </div>
                      <div>
                        <h3 className="stat-value mb-0">{stat.value}</h3>
                        <p className="stat-title mb-0">{stat.title}</p>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Filters and Search */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="mb-4"
          >
            <Card className="filter-card">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Search members by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="modern-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Select
                        value={selectedPlan}
                        onChange={(e) => setSelectedPlan(e.target.value)}
                        className="modern-input"
                      >
                        <option value="all">All Plans</option>
                        <option value="Basic">Basic</option>
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={3} className="text-end">
                    <Button variant="outline-secondary" onClick={() => {
                      setSearchTerm('');
                      setSelectedPlan('all');
                    }}>
                      Clear Filters
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>

          {/* Members Table */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="members-table-container"
          >
            <Card className="table-card">
              <Card.Header className="table-header">
                <h3 className="mb-0">Members ({filteredMembers.length})</h3>
              </Card.Header>
              <Card.Body className="p-0">
                {isLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : filteredMembers.length > 0 ? (
                  <Table responsive hover className="members-table">
                    <thead>
                      <tr>
                        <th>Member</th>
                        <th>Contact</th>
                        <th>Plan</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMembers.map((member, index) => (
                        <motion.tr
                          key={member._id}
                          variants={tableRowVariants}
                          initial="hidden"
                          animate="visible"
                          transition={{ delay: index * 0.05 }}
                        >
                          <td>
                            <div className="member-info">
                              <div className="member-avatar">
                                {member.Name?.charAt(0)?.toUpperCase()}
                              </div>
                              <div>
                                <div className="member-name">{member.Name}</div>
                                <div className="member-email">{member.Email}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="contact-info">
                              <div>{member.Phone}</div>
                            </div>
                          </td>
                          <td>
                            <Badge bg={getPlanBadgeColor(member.Plan)} className="plan-badge">
                              {member.Plan || 'No Plan'}
                            </Badge>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleEdit(member._id)}
                                  className="me-2"
                                >
                                  Edit
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  variant="outline-danger"
                                  size="sm"
                                  onClick={() => handleDeleteConfirm(member)}
                                >
                                  Delete
                                </Button>
                              </motion.div>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <h4>No Members Found</h4>
                    <p>No members match your current filters. Try adjusting your search criteria.</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </motion.div>
        </Container>
      </div>

      {/* Add Member Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton className="modal-header-modern">
          <Modal.Title>Add New Member</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-modern">
          <Form onSubmit={handleAddMember}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="modern-label">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="Name"
                    value={newMember.Name}
                    onChange={handleInputChange}
                    className="modern-input"
                    placeholder="Enter member's full name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="modern-label">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={newMember.Email}
                    onChange={handleInputChange}
                    className="modern-input"
                    placeholder="Enter email address"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="modern-label">Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="Phone"
                    value={newMember.Phone}
                    onChange={handleInputChange}
                    className="modern-input"
                    placeholder="Enter phone number"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="modern-label">Membership Plan</Form.Label>
                  <Form.Select
                    name="Plan"
                    value={newMember.Plan}
                    onChange={handleInputChange}
                    className="modern-input"
                    required
                  >
                    <option value="Basic">Basic - $299/year</option>
                    <option value="Standard">Standard - $499/year</option>
                    <option value="Premium">Premium - $699/year</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-4">
              <Form.Label className="modern-label">Password</Form.Label>
              <Form.Control
                type="password"
                name="Password"
                value={newMember.Password}
                onChange={handleInputChange}
                className="modern-input"
                placeholder="Create a password for the member"
                required
              />
            </Form.Group>
            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button type="submit" className="btn-modern btn-primary-modern" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Member'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton className="modal-header-modern border-0">
          <Modal.Title className="text-danger">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-modern text-center">
          <div className="delete-icon mb-3">🗑️</div>
          <h5>Are you sure you want to delete this member?</h5>
          <p className="text-muted">
            This action will permanently remove <strong>{memberToDelete?.Name}</strong> from the system.
          </p>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Member
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
