import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Card, ProgressBar, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "./MembershipForm.css"; // Import custom CSS for additional styling

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
    ConfirmPassword: "",
    Plan: "Basic",
    Age: "",
    Gender: "",
    FitnessGoal: "",
    MedicalConditions: "",
    EmergencyContact: "",
    TermsAccepted: false,
  });

  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));

    // Check password strength
    if (name === 'Password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,3}[\s\-\.]?[\(]?[\d]{3}[\)]?[\s\-\.]?[\d]{3}[\s\-\.]?[\d]{4,6}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.Name || !formData.Email || !formData.Phone) {
          setAlertMessage("Please fill in all required fields in Personal Information.");
          setAlertVariant("danger");
          setShowAlert(true);
          return false;
        }
        if (!validateEmail(formData.Email)) {
          setAlertMessage("Please enter a valid email address.");
          setAlertVariant("danger");
          setShowAlert(true);
          return false;
        }
        if (!validatePhone(formData.Phone)) {
          setAlertMessage("Please enter a valid phone number.");
          setAlertVariant("danger");
          setShowAlert(true);
          return false;
        }
        break;
      case 2:
        if (!formData.Password || !formData.ConfirmPassword) {
          setAlertMessage("Please fill in all password fields.");
          setAlertVariant("danger");
          setShowAlert(true);
          return false;
        }
        if (formData.Password !== formData.ConfirmPassword) {
          setAlertMessage("Passwords do not match.");
          setAlertVariant("danger");
          setShowAlert(true);
          return false;
        }
        if (passwordStrength < 75) {
          setAlertMessage("Please choose a stronger password.");
          setAlertVariant("warning");
          setShowAlert(true);
          return false;
        }
        break;
      case 3:
        if (!formData.Age || !formData.Gender || !formData.FitnessGoal) {
          setAlertMessage("Please fill in all required fitness information.");
          setAlertVariant("danger");
          setShowAlert(true);
          return false;
        }
        if (!formData.TermsAccepted) {
          setAlertMessage("Please accept the terms and conditions.");
          setAlertVariant("danger");
          setShowAlert(true);
          return false;
        }
        break;
      default:
        return true;
    }
    setShowAlert(false);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }

    // Remove confirmPassword from submission data
    const { ConfirmPassword, ...submitData } = formData;

    // Send the data to the server
    fetch("http://localhost:3010/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    })
      .then((res) => res.json())
      .then((res) => {
        setAlertMessage(
          "🎉 Welcome to our gym family! Your membership has been created successfully!"
        );
        setAlertVariant("success");
        setShowAlert(true);
        console.log("Form submitted:", submitData);
        
        // Navigate after a short delay to show success message
        setTimeout(() => {
          navigate("/SignIn");
        }, 2000);

        // Clear the form
        setFormData({
          Name: "",
          Email: "",
          Phone: "",
          Password: "",
          ConfirmPassword: "",
          Plan: "Basic",
          Age: "",
          Gender: "",
          FitnessGoal: "",
          MedicalConditions: "",
          EmergencyContact: "",
          TermsAccepted: false,
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        setAlertMessage("❌ An error occurred. Please try again later.");
        setAlertVariant("danger");
        setShowAlert(true);
      });
  };

  const getPlanDetails = (plan) => {
    const plans = {
      Basic: { price: "$299/year", features: ["Access to gym equipment", "Locker room access", "Basic fitness assessment"] },
      Standard: { price: "$499/year", features: ["All Basic features", "Group fitness classes", "Nutrition consultation", "Personal training (2 sessions/month)"] },
      Premium: { price: "$699/year", features: ["All Standard features", "Unlimited personal training", "Meal planning", "Priority booking", "Guest passes (5/month)"] }
    };
    return plans[plan] || plans.Basic;
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return { text: "Very Weak", color: "danger" };
    if (passwordStrength < 50) return { text: "Weak", color: "warning" };
    if (passwordStrength < 75) return { text: "Good", color: "info" };
    return { text: "Strong", color: "success" };
  };

  const renderStep1 = () => (
    <>
      <h4 className="step-title">📝 Personal Information</h4>
      <Form.Group controlId="formName" className="mb-3">
        <Form.Label>Full Name *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your full name"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
          required
          className="form-control-modern"
        />
      </Form.Group>
      
      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email Address *</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email address"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          required
          className="form-control-modern"
        />
      </Form.Group>
      
      <Form.Group controlId="formPhone" className="mb-3">
        <Form.Label>Phone Number *</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter your phone number"
          name="Phone"
          value={formData.Phone}
          onChange={handleChange}
          required
          className="form-control-modern"
        />
      </Form.Group>
      
      <Form.Group controlId="formEmergencyContact" className="mb-3">
        <Form.Label>Emergency Contact</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Emergency contact phone number"
          name="EmergencyContact"
          value={formData.EmergencyContact}
          onChange={handleChange}
          className="form-control-modern"
        />
      </Form.Group>
    </>
  );

  const renderStep2 = () => (
    <>
      <h4 className="step-title">🔐 Account Security</h4>
      <Form.Group controlId="formPassword" className="mb-3">
        <Form.Label>Password *</Form.Label>
        <div className="password-input-container">
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
            className="form-control-modern"
          />
          <Button
            variant="outline-secondary"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </Button>
        </div>
        {formData.Password && (
          <div className="password-strength mt-2">
            <ProgressBar 
              variant={getPasswordStrengthText().color} 
              now={passwordStrength} 
              className="mb-1"
            />
            <small className={`text-${getPasswordStrengthText().color}`}>
              Password Strength: {getPasswordStrengthText().text}
            </small>
          </div>
        )}
      </Form.Group>
      
      <Form.Group controlId="formConfirmPassword" className="mb-3">
        <Form.Label>Confirm Password *</Form.Label>
        <div className="password-input-container">
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            name="ConfirmPassword"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            required
            className={`form-control-modern ${
              formData.ConfirmPassword && formData.Password !== formData.ConfirmPassword 
                ? 'is-invalid' 
                : formData.ConfirmPassword && formData.Password === formData.ConfirmPassword 
                ? 'is-valid' 
                : ''
            }`}
          />
          <Button
            variant="outline-secondary"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
          </Button>
        </div>
        {formData.ConfirmPassword && formData.Password !== formData.ConfirmPassword && (
          <div className="invalid-feedback d-block">
            Passwords do not match
          </div>
        )}
      </Form.Group>
    </>
  );

  const renderStep3 = () => (
    <>
      <h4 className="step-title">💪 Fitness Profile & Membership</h4>
      
      <Row>
        <Col md={6}>
          <Form.Group controlId="formAge" className="mb-3">
            <Form.Label>Age *</Form.Label>
            <Form.Control
              type="number"
              placeholder="Your age"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              min="13"
              max="100"
              required
              className="form-control-modern"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formGender" className="mb-3">
            <Form.Label>Gender *</Form.Label>
            <Form.Select
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              required
              className="form-control-modern"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="PreferNotToSay">Prefer not to say</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      
      <Form.Group controlId="formFitnessGoal" className="mb-3">
        <Form.Label>Primary Fitness Goal *</Form.Label>
        <Form.Select
          name="FitnessGoal"
          value={formData.FitnessGoal}
          onChange={handleChange}
          required
          className="form-control-modern"
        >
          <option value="">Select your primary goal</option>
          <option value="WeightLoss">Weight Loss</option>
          <option value="MuscleBuilding">Muscle Building</option>
          <option value="Cardio">Cardiovascular Health</option>
          <option value="Strength">Strength Training</option>
          <option value="Flexibility">Flexibility & Mobility</option>
          <option value="GeneralFitness">General Fitness</option>
          <option value="SportSpecific">Sport-Specific Training</option>
        </Form.Select>
      </Form.Group>
      
      <Form.Group controlId="formMedicalConditions" className="mb-3">
        <Form.Label>Medical Conditions</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Please list any medical conditions or injuries we should be aware of (optional)"
          name="MedicalConditions"
          value={formData.MedicalConditions}
          onChange={handleChange}
          className="form-control-modern"
        />
      </Form.Group>
      
      <Form.Group controlId="formPlan" className="mb-4">
        <Form.Label>Select Membership Plan *</Form.Label>
        <div className="plan-selection">
          {['Basic', 'Standard', 'Premium'].map(plan => {
            const planDetails = getPlanDetails(plan);
            return (
              <div key={plan} className={`plan-card ${formData.Plan === plan ? 'selected' : ''}`}>
                <Form.Check
                  type="radio"
                  name="Plan"
                  id={`plan-${plan}`}
                  value={plan}
                  checked={formData.Plan === plan}
                  onChange={handleChange}
                  label={
                    <div className="plan-details">
                      <div className="plan-header">
                        <h5>{plan} Plan</h5>
                        <Badge bg={plan === 'Premium' ? 'success' : plan === 'Standard' ? 'primary' : 'secondary'}>
                          {planDetails.price}
                        </Badge>
                      </div>
                      <ul className="plan-features">
                        {planDetails.features.map((feature, index) => (
                          <li key={index}>✓ {feature}</li>
                        ))}
                      </ul>
                    </div>
                  }
                />
              </div>
            );
          })}
        </div>
      </Form.Group>
      
      <Form.Group controlId="formTerms" className="mb-3">
        <Form.Check
          type="checkbox"
          name="TermsAccepted"
          id="termsAccepted"
          checked={formData.TermsAccepted}
          onChange={handleChange}
          required
          label={
            <span>
              I agree to the{' '}
              <a href="#terms" className="text-primary">
                Terms and Conditions
              </a>
              {' '}and{' '}
              <a href="#privacy" className="text-primary">
                Privacy Policy
              </a>
              *
            </span>
          }
        />
      </Form.Group>
    </>
  );

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8} xl={6}>
          <Card className="membership-form-card shadow-lg">
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="main-title">🏋️‍♂️ Join Our Gym Family</h2>
                <p className="subtitle">Start your fitness journey today!</p>
              </div>
              
              {/* Progress Bar */}
              <div className="progress-container mb-4">
                <ProgressBar className="custom-progress">
                  <ProgressBar 
                    variant="success" 
                    now={(currentStep / totalSteps) * 100} 
                    key={1}
                  />
                </ProgressBar>
                <div className="step-indicators">
                  {[1, 2, 3].map(step => (
                    <div key={step} className={`step-indicator ${currentStep >= step ? 'active' : ''}`}>
                      {step}
                    </div>
                  ))}
                </div>
                <small className="text-muted">Step {currentStep} of {totalSteps}</small>
              </div>
              
              {showAlert && (
                <Alert variant={alertVariant} className="custom-alert">
                  {alertMessage}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
                
                <div className="form-navigation mt-4">
                  {currentStep > 1 && (
                    <Button 
                      variant="outline-secondary" 
                      onClick={prevStep}
                      className="me-2"
                    >
                      ← Previous
                    </Button>
                  )}
                  
                  {currentStep < totalSteps ? (
                    <Button 
                      variant="primary" 
                      onClick={nextStep}
                      className="ms-auto d-block"
                    >
                      Next →
                    </Button>
                  ) : (
                    <Button 
                      variant="success" 
                      type="submit" 
                      className="ms-auto d-block submit-btn"
                      size="lg"
                    >
                      🚀 Complete Registration
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MembershipForm;
