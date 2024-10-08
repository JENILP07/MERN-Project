import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./MembershipForm.css"; // Import custom CSS for additional styling

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "", // Added Password field
    Plan: "",
  });

  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.Name ||
      !formData.Email ||
      !formData.Phone ||
      !formData.Password
    ) {
      setAlertMessage("Please fill in all required fields.");
      setAlertVariant("danger");
      setShowAlert(true);
      return;
    }

    // Send the data to the server
    fetch("http://localhost:3010/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        // Simulate a successful submission after the request is completed
        setAlertMessage(
          "Your membership form has been submitted successfully!"
        );
        setAlertVariant("success");
        setShowAlert(true);
        console.log("Form submitted:", formData);
        navigate("/SignIn");

        // Clear the form (optional)
        setFormData({
          Name: "",
          Email: "",
          Phone: "",
          Plan: "",
          Password: "", // Clear Password field
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setAlertMessage("An error occurred. Please try again.");
        setAlertVariant("danger");
        setShowAlert(true);
      });
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Membership Form</h2>
          {showAlert && <Alert variant={alertVariant}>{alertMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone" className="my-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                name="Phone"
                value={formData.Phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="my-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPlan" className="my-3">
              <Form.Label>Select Membership Plan</Form.Label>
              <Form.Control
                as="select"
                name="Plan"
                value={formData.Plan}
                onChange={handleChange}
              >
                <option value="Basic">Basic Plan - $299/year</option>
                <option value="Standard">Standard Plan - $499/year</option>
                <option value="Premium">Premium Plan - $699/year</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MembershipForm;
