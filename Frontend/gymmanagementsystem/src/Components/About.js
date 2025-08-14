import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.css';
import '../styles/globals.css';

const AboutPage = () => {
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

    const facilities = [
        {
            icon: "🏋️",
            title: "Modern Equipment",
            description: "State-of-the-art cardio and strength training equipment from leading manufacturers"
        },
        {
            icon: "🥗",
            title: "Nutrition Center",
            description: "Expert nutritional guidance and meal planning services for optimal results"
        },
        {
            icon: "🧘",
            title: "Wellness Programs",
            description: "Comprehensive wellness programs including yoga, meditation, and recovery sessions"
        },
        {
            icon: "👥",
            title: "Group Classes",
            description: "Dynamic group fitness classes for all levels, from HIIT to dance and pilates"
        },
        {
            icon: "🏊",
            title: "Aquatic Center",
            description: "Olympic-sized pool for swimming, water aerobics, and aquatic therapy"
        },
        {
            icon: "🔬",
            title: "Body Analysis",
            description: "Advanced body composition analysis and fitness assessments"
        }
    ];

    const stats = [
        { number: "10+", label: "Years of Excellence" },
        { number: "500+", label: "Happy Members" },
        { number: "50+", label: "Expert Trainers" },
        { number: "100+", label: "Classes per Week" }
    ];

    return (
        <div className="about-page">
            <Navigation />
            
            <div className="about-background">
                {/* Hero Section */}
                <section className="about-hero">
                    <Container>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <h1 className="about-title">
                                About <span className="gradient-text">FitLife</span>
                            </h1>
                            <p className="about-subtitle">
                                Transforming lives through fitness, wellness, and community
                            </p>
                        </motion.div>
                    </Container>
                </section>

                {/* Story Section */}
                <section className="about-story py-5">
                    <Container>
                        <Row className="align-items-center">
                            <Col lg={6}>
                                <motion.div
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    <h2 className="section-title">
                                        Our <span className="gradient-text">Story</span>
                                    </h2>
                                    <p className="story-text">
                                        Founded in 2014, FitLife Gym began with a simple mission: to create a space where 
                                        everyone feels welcome to pursue their fitness goals. What started as a small community 
                                        gym has evolved into a comprehensive fitness destination.
                                    </p>
                                    <p className="story-text">
                                        We believe fitness is not just about physical transformation—it's about building 
                                        confidence, creating healthy habits, and fostering a supportive community. Our 
                                        state-of-the-art facilities and expert team are designed to support you every step 
                                        of your journey.
                                    </p>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            as={Link}
                                            to="/Trainers"
                                            className="btn-modern btn-primary-modern mt-3"
                                            size="lg"
                                        >
                                            Meet Our Team
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </Col>
                            <Col lg={6}>
                                <motion.div
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="stats-container"
                                >
                                    <Row>
                                        {stats.map((stat, index) => (
                                            <Col sm={6} key={index} className="mb-4">
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    className="stat-card"
                                                >
                                                    <div className="stat-number">{stat.number}</div>
                                                    <div className="stat-label">{stat.label}</div>
                                                </motion.div>
                                            </Col>
                                        ))}
                                    </Row>
                                </motion.div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Mission & Vision */}
                <section className="mission-vision py-5">
                    <Container>
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            <Row>
                                <Col lg={6} className="mb-4">
                                    <motion.div variants={fadeInUp}>
                                        <Card className="mission-card h-100">
                                            <Card.Body className="text-center p-5">
                                                <div className="mission-icon mb-4">🎯</div>
                                                <h3 className="mission-title">Our Mission</h3>
                                                <p className="mission-text">
                                                    To inspire and empower individuals to lead healthier lives through 
                                                    personalized fitness solutions, expert guidance, and a supportive 
                                                    community that celebrates every victory.
                                                </p>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                </Col>
                                <Col lg={6} className="mb-4">
                                    <motion.div variants={fadeInUp}>
                                        <Card className="mission-card h-100">
                                            <Card.Body className="text-center p-5">
                                                <div className="mission-icon mb-4">🌟</div>
                                                <h3 className="mission-title">Our Vision</h3>
                                                <p className="mission-text">
                                                    To be the leading fitness destination that transforms not just bodies, 
                                                    but lives—creating a world where wellness is accessible, enjoyable, 
                                                    and sustainable for everyone.
                                                </p>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                </Col>
                            </Row>
                        </motion.div>
                    </Container>
                </section>

                {/* Facilities Section */}
                <section className="facilities-section py-5">
                    <Container>
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-center mb-5"
                        >
                            <h2 className="section-title">
                                World-Class <span className="gradient-text">Facilities</span>
                            </h2>
                            <p className="section-subtitle">
                                Everything you need for your fitness journey under one roof
                            </p>
                        </motion.div>

                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            <Row>
                                {facilities.map((facility, index) => (
                                    <Col lg={4} md={6} key={index} className="mb-4">
                                        <motion.div
                                            variants={fadeInUp}
                                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                        >
                                            <Card className="facility-card h-100">
                                                <Card.Body className="text-center p-4">
                                                    <div className="facility-icon mb-3">{facility.icon}</div>
                                                    <h4 className="facility-title">{facility.title}</h4>
                                                    <p className="facility-description">{facility.description}</p>
                                                </Card.Body>
                                            </Card>
                                        </motion.div>
                                    </Col>
                                ))}
                            </Row>
                        </motion.div>
                    </Container>
                </section>

                {/* Values Section */}
                <section className="values-section py-5">
                    <Container>
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-center mb-5"
                        >
                            <h2 className="section-title">
                                Our <span className="gradient-text">Core Values</span>
                            </h2>
                        </motion.div>

                        <Row>
                            {[
                                {
                                    title: "Excellence",
                                    description: "We strive for excellence in everything we do, from equipment maintenance to customer service.",
                                    color: "#667eea"
                                },
                                {
                                    title: "Community",
                                    description: "We foster a welcoming, inclusive community where everyone supports each other's goals.",
                                    color: "#f093fb"
                                },
                                {
                                    title: "Innovation",
                                    description: "We continuously evolve our programs and facilities to incorporate the latest fitness trends and science.",
                                    color: "#4facfe"
                                }
                            ].map((value, index) => (
                                <Col lg={4} key={index} className="mb-4">
                                    <motion.div
                                        variants={fadeInUp}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.2 }}
                                        whileHover={{ scale: 1.03 }}
                                    >
                                        <Card className="value-card h-100">
                                            <Card.Body className="text-center p-4">
                                                <div 
                                                    className="value-header"
                                                    style={{ background: `linear-gradient(135deg, ${value.color}, ${value.color}AA)` }}
                                                >
                                                    <h4 className="value-title">{value.title}</h4>
                                                </div>
                                                <p className="value-description">{value.description}</p>
                                            </Card.Body>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>

                {/* CTA Section */}
                <section className="about-cta py-5">
                    <Container>
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <Card className="cta-card">
                                <Card.Body className="p-5">
                                    <h2 className="cta-title">
                                        Ready to Join the <span className="gradient-text">FitLife Family</span>?
                                    </h2>
                                    <p className="cta-subtitle">
                                        Take the first step towards a healthier, stronger you. Our team is here to support your journey.
                                    </p>
                                    <div className="cta-buttons">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                as={Link}
                                                to="/SignUp"
                                                className="btn-modern btn-primary-modern me-3"
                                                size="lg"
                                            >
                                                Start Your Journey
                                            </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                as={Link}
                                                to="/Contact"
                                                variant="outline-primary"
                                                size="lg"
                                            >
                                                Contact Us
                                            </Button>
                                        </motion.div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Container>
                </section>
            </div>
            
            <Footer />
        </div>
    );
};

export default AboutPage;
