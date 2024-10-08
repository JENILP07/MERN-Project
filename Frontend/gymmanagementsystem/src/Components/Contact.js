import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactPage.css'; // Import custom CSS for additional styling

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');

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
        if (!formData.name || !formData.email || !formData.message) {
            setAlertMessage('Please fill in all required fields.');
            setAlertVariant('danger');
            setShowAlert(true);
            return;
        }

        // Simulate a successful submission
        setAlertMessage('Your message has been sent successfully!');
        setAlertVariant('success');
        setShowAlert(true);

        // Clear the form (optional)
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1 className="text-center mb-4">Contact Us</h1>
                    
                    {showAlert && <Alert variant={alertVariant}>{alertMessage}</Alert>}

                    <Form onSubmit={handleSubmit} className="mb-4">
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="my-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formMessage" className="my-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Enter your message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Send Message
                        </Button>
                    </Form>

                    <h3 className="text-center mb-4">Our Location</h3>
                    <Row>
                        <Col md={6}>
                            <h5>FitLife Gym</h5>
                            <address>
                                123 Fitness Lane<br />
                                Fitville, FI 12345<br />
                                Phone: (123) 456-7890<br />
                                Email: contact@fitlifegym.com
                            </address>
                        </Col>
                        <Col md={6}>
                            <iframe
                                title="Google Maps"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.4862717407024!2d-122.41941828468263!3d37.77492927975825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b0e9e63f1%3A0x1b2c92d16d1c9a66!2sFitLife%20Gym!5e0!3m2!1sen!2sus!4v1631199872390!5m2!1sen!2sus"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactPage;
