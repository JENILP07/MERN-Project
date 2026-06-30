import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "./Updatepage.css";

const UpdateMemberForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Plan: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch("http://localhost:3010/members/" + id)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load member data.");
        }
        return response.json();
      })
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching member information.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3010/members/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update member.");
      }

      setSuccess("Member updated successfully!");
      setError("");

      setTimeout(() => {
        navigate("/AdminDashboard");
      }, 1500);
    } catch (err) {
      console.error("Error updating member:", err);
      setError("Error updating member details.");
      setSuccess("");
    }
  };

  return (
    <div style={{ backgroundColor: "var(--bg-obsidian)", minHeight: "100vh" }}>
      <Navigation />
      
      <div className="update-page-container">
        <Card className="update-card border-0">
          <h2 className="update-title">Update Member</h2>

          {error && <Alert className="modern-alert alert-danger">{error}</Alert>}
          {success && <Alert className="modern-alert alert-success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="update-label">Name</Form.Label>
              <Form.Control
                type="text"
                name="Name"
                value={formData.Name || ""}
                onChange={handleChange}
                required
                placeholder="Enter full name"
                className="update-input"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="update-label">Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                value={formData.Email || ""}
                onChange={handleChange}
                required
                placeholder="Enter email address"
                className="update-input"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="update-label">Phone</Form.Label>
              <Form.Control
                type="tel"
                name="Phone"
                value={formData.Phone || ""}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
                className="update-input"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="update-label">Membership Plan</Form.Label>
              <Form.Select
                name="Plan"
                value={formData.Plan || ""}
                onChange={handleChange}
                required
                className="update-input"
              >
                <option value="basic">Basic Plan - $299/year</option>
                <option value="standard">Standard Plan - $499/year</option>
                <option value="premium">Premium Plan - $699/year</option>
              </Form.Select>
            </Form.Group>

            <div className="update-actions">
              <Button
                variant="none"
                type="button"
                className="btn-cyber-outline"
                onClick={() => navigate("/AdminDashboard")}
              >
                Cancel
              </Button>
              <Button
                variant="none"
                type="submit"
                className="btn-cyber"
              >
                Save
              </Button>
            </div>
          </Form>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default UpdateMemberForm;
