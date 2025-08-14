import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactPage.css';
import '../styles/globals.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const contactInfo = [
        {
            icon: "📍",
            title: "Visit Us",
            details: ["123 Fitness Lane", "Fitville, FI 12345", "United States"]
        },
        {
            icon: "📞",
            title: "Call Us",
            details: ["(123) 456-7890", "Mon-Fri: 6AM-10PM", "Sat-Sun: 7AM-9PM"]
        },
        {
            icon: "✉️",
            title: "Email Us",
            details: ["contact@fitlifegym.com", "support@fitlifegym.com", "info@fitlifegym.com"]
        },
        {
            icon: "⏰",
            title: "Operating Hours",
            details: ["Monday - Friday: 6AM - 10PM", "Saturday: 7AM - 9PM", "Sunday: 7AM - 8PM"]
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setAlertMessage('Please fill in all required fields.');
            setAlertVariant('danger');
            setShowAlert(true);
            setIsSubmitting(false);
            setTimeout(() => setShowAlert(false), 5000);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setAlertMessage('Please enter a valid email address.');
            setAlertVariant('danger');
            setShowAlert(true);
            setIsSubmitting(false);
            setTimeout(() => setShowAlert(false), 5000);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setAlertMessage('Thank you for contacting us! We will get back to you within 24 hours.');
            setAlertVariant('success');
            setShowAlert(true);
            setIsSubmitting(false);

            // Clear the form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });

            setTimeout(() => setShowAlert(false), 8000);
        }, 2000);
    };

    return (
        <div className="contact-page">
            <Navigation />
            
            <div className="contact-background">
                {/* Hero Section */}
                <section className="contact-hero">
                    <Container>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <h1 className="contact-title">
                                Get In <span className="gradient-text">Touch</span>
                            </h1>
                            <p className="contact-subtitle">
                                Have questions about our services or want to start your fitness journey? 
                                We're here to help you achieve your goals.
                            </p>
                        </motion.div>
                    </Container>
                </section>

                {/* Contact Info Cards */}
                <section className="contact-info-section py-5">
                    <Container>
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            <Row>
                                {contactInfo.map((info, index) => (
                                    <Col lg={3} md={6} key={index} className="mb-4">
                                        <motion.div
                                            variants={fadeInUp}
                                            whileHover={{ y: -5, transition: { duration: 0.3 } }}
                                        >
                                            <Card className="contact-info-card h-100">
                                                <Card.Body className="text-center p-4">
                                                    <div className="contact-icon mb-3">{info.icon}</div>
                                                    <h4 className="contact-info-title">{info.title}</h4>
                                                    <div className="contact-details">
                                                        {info.details.map((detail, idx) => (
                                                            <p key={idx} className="contact-detail">{detail}</p>
                                                        ))}
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </motion.div>
                                    </Col>
                                ))}
                            </Row>
                        </motion.div>
                    </Container>
                </section>

                {/* Contact Form & Map Section */}
                <section className="contact-form-section py-5">
                    <Container>
                        <Row>
                            {/* Contact Form */}
                            <Col lg={7} className="mb-5">
                                <motion.div
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    <Card className="contact-form-card">
                                        <Card.Body className="p-5">
                                            <h2 className="form-title mb-4">
                                                Send Us a <span className="gradient-text">Message</span>
                                            </h2>
                                            <p className="form-subtitle mb-4">
                                                Fill out the form below and we'll get back to you as soon as possible.
                                            </p>

                                            {showAlert && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="mb-4"
                                                >
                                                    <Alert 
                                                        variant={alertVariant} 
                                                        className="modern-alert"
                                                        dismissible
                                                        onClose={() => setShowAlert(false)}
                                                    >
                                                        {alertMessage}
                                                    </Alert>
                                                </motion.div>
                                            )}

                                            <Form onSubmit={handleSubmit}>
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label className="form-label">Full Name *</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Enter your full name"
                                                                name="name"
                                                                value={formData.name}
                                                                onChange={handleChange}
                                                                className="modern-input"
                                                                required
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label className="form-label">Email Address *</Form.Label>
                                                            <Form.Control
                                                                type="email"
                                                                placeholder="Enter your email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleChange}
                                                                className="modern-input"
                                                                required
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label className="form-label">Phone Number</Form.Label>
                                                            <Form.Control
                                                                type="tel"
                                                                placeholder="Enter your phone number"
                                                                name="phone"
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                className="modern-input"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-4">
                                                            <Form.Label className="form-label">Subject</Form.Label>
                                                            <Form.Select
                                                                name="subject"
                                                                value={formData.subject}
                                                                onChange={handleChange}
                                                                className="modern-input"
                                                            >
                                                                <option value="">Select a subject</option>
                                                                <option value="membership">Membership Inquiry</option>
                                                                <option value="classes">Class Information</option>
                                                                <option value="personal-training">Personal Training</option>
                                                                <option value="facilities">Facilities Tour</option>
                                                                <option value="support">Customer Support</option>
                                                                <option value="other">Other</option>
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Form.Group className="mb-4">
                                                    <Form.Label className="form-label">Message *</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={5}
                                                        placeholder="Tell us how we can help you..."
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        className="modern-input modern-textarea"
                                                        required
                                                    />
                                                </Form.Group>
                                                
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Button
                                                        type="submit"
                                                        className="btn-modern btn-primary-modern w-100"
                                                        size="lg"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                                Sending Message...
                                                            </>
                                                        ) : (
                                                            'Send Message'
                                                        )}
                                                    </Button>
                                                </motion.div>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>

                            {/* Location & Map */}
                            <Col lg={5}>
                                <motion.div
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="h-100"
                                >
                                    <Card className="location-card h-100">
                                        <Card.Body className="p-0">
                                            <div className="map-container">
                                                <iframe
                                                    title="FitLife Gym Location"
                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.4862717407024!2d-122.41941828468263!3d37.77492927975825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b0e9e63f1%3A0x1b2c92d16d1c9a66!2sFitLife%20Gym!5e0!3m2!1sen!2sus!4v1631199872390!5m2!1sen!2sus"
                                                    width="100%"
                                                    height="300"
                                                    style={{ border: 0 }}
                                                    allowFullScreen=""
                                                    loading="lazy"
                                                    className="contact-map"
                                                ></iframe>
                                            </div>
                                            <div className="location-info p-4">
                                                <h3 className="location-title">
                                                    Visit Our <span className="gradient-text">Gym</span>
                                                </h3>
                                                <p className="location-description">
                                                    Come and experience our state-of-the-art facilities, meet our expert trainers, 
                                                    and start your fitness transformation today.
                                                </p>
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Button
                                                        as={Link}
                                                        to="/About"
                                                        className="btn-modern btn-secondary-modern"
                                                    >
                                                        Learn More About Us
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </motion.div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* FAQ Section */}
                <section className="faq-section py-5">
                    <Container>
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-center mb-5"
                        >
                            <h2 className="section-title">
                                Frequently Asked <span className="gradient-text">Questions</span>
                            </h2>
                            <p className="section-subtitle">
                                Quick answers to common questions about our gym and services
                            </p>
                        </motion.div>

                        <Row>
                            {[
                                {
                                    question: "What are your membership options?",
                                    answer: "We offer flexible membership plans including monthly, quarterly, and annual options. Each plan includes full access to our equipment, group classes, and amenities."
                                },
                                {
                                    question: "Do you offer personal training?",
                                    answer: "Yes! Our certified personal trainers provide customized workout plans, form correction, and motivation to help you reach your specific fitness goals."
                                },
                                {
                                    question: "Can I try the gym before joining?",
                                    answer: "Absolutely! We offer complimentary day passes for prospective members. Contact us to schedule your visit and tour our facilities."
                                },
                                {
                                    question: "What safety measures do you have?",
                                    answer: "We maintain strict cleanliness protocols, provide sanitizing stations throughout the facility, and ensure all equipment is regularly maintained and inspected."
                                }
                            ].map((faq, index) => (
                                <Col lg={6} key={index} className="mb-4">
                                    <motion.div
                                        variants={fadeInUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <Card className="faq-card h-100">
                                            <Card.Body className="p-4">
                                                <h5 className="faq-question">{faq.question}</h5>
                                                <p className="faq-answer">{faq.answer}</p>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
            </div>

            <Footer />
        </div>
    );
};

export default ContactPage;
