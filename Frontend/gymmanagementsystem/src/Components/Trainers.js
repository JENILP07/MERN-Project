import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Trainers.css';
import '../styles/globals.css';
import { useNavigate } from 'react-router-dom';

const trainers = [
    {
        id: 1,
        name: 'Dr. Nilesh Gambhava',
        photo: 'https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/3---28-04-2023-02-02-42.jpg',
        specialty: 'Strength Training',
        experience: 11,
        bio: 'Certified strength and conditioning specialist with over 11 years of experience helping clients achieve their fitness goals.',
        certifications: ['NASM-CPT', 'CSCS', 'FMS Level 2'],
        specialties: ['Strength Training', 'Olympic Lifting', 'Athletic Performance'],
        rating: 4.9,
        sessionsCompleted: 2400
    },
    {
        id: 2,
        name: 'Dr. Pradyumansinh Jadeja',
        photo: 'https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/6---28-04-2023-02-06-07.jpg',
        specialty: 'Yoga & Pilates',
        experience: 19,
        bio: 'Experienced yoga instructor and wellness coach specializing in mind-body connection and holistic fitness approaches.',
        certifications: ['RYT-500', 'PMA-CPT', 'Wellness Coach'],
        specialties: ['Hatha Yoga', 'Vinyasa Flow', 'Pilates', 'Meditation'],
        rating: 4.8,
        sessionsCompleted: 3200
    },
    {
        id: 3,
        name: 'Prof. Arjun Bala',
        photo: 'https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/15---28-04-2023-02-07-35.jpg',
        specialty: 'Cardio & Endurance',
        experience: 10,
        bio: 'Marathon runner and endurance specialist focused on helping clients build cardiovascular fitness and stamina.',
        certifications: ['ACSM-CPT', 'Running Coach', 'Triathlon Coach'],
        specialties: ['Running', 'Cycling', 'Swimming', 'HIIT'],
        rating: 4.7,
        sessionsCompleted: 1800
    },
    {
        id: 4,
        name: 'Prof. Dixita Kagathara',
        photo: 'https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/9---28-04-2023-02-06-37.jpg',
        specialty: 'Powerlifting',
        experience: 15,
        bio: 'Competitive powerlifter with extensive experience in strength training and form correction for maximum results.',
        certifications: ['USPA Judge', 'NSCA-CSCS', 'Powerlifting Coach'],
        specialties: ['Powerlifting', 'Deadlifts', 'Squats', 'Bench Press'],
        rating: 4.9,
        sessionsCompleted: 2100
    },
    {
        id: 5,
        name: 'Prof. Vijay Shekhat',
        photo: 'https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/16---28-04-2023-02-08-00.jpg',
        specialty: 'CrossFit',
        experience: 7,
        bio: 'CrossFit Level 2 trainer passionate about functional fitness and helping clients push their limits safely.',
        certifications: ['CF-L2', 'Olympic Lifting', 'Gymnastics'],
        specialties: ['CrossFit', 'Functional Movement', 'Olympic Lifts', 'Gymnastics'],
        rating: 4.8,
        sessionsCompleted: 1500
    },
    {
        id: 6,
        name: 'Prof. Shruti Maniar',
        photo: 'https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/336---28-04-2023-01-34-37.jpg',
        specialty: 'Nutrition & Wellness',
        experience: 8,
        bio: 'Registered dietitian and wellness expert specializing in sports nutrition and lifestyle coaching.',
        certifications: ['RD', 'Sports Nutritionist', 'Wellness Coach'],
        specialties: ['Sports Nutrition', 'Weight Management', 'Meal Planning', 'Lifestyle Coaching'],
        rating: 4.9,
        sessionsCompleted: 1900
    },
];


const Trainer = () => {
    const navigate = useNavigate();
    
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    
    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const getSpecialtyColor = (specialty) => {
        const colors = {
            'Strength Training': '#667eea',
            'Yoga & Pilates': '#f093fb',
            'Cardio & Endurance': '#4facfe',
            'Powerlifting': '#764ba2',
            'CrossFit': '#f5576c',
            'Nutrition & Wellness': '#10b981'
        };
        return colors[specialty] || '#667eea';
    };
    
    return (
        <div className="trainers-page">
            <Navigation />
            
            <div className="trainers-background">
                {/* Hero Section */}
                <section className="trainers-hero">
                    <Container>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <h1 className="trainers-title">
                                Meet Our Expert <span className="gradient-text">Trainers</span>
                            </h1>
                            <p className="trainers-subtitle">
                                Our certified fitness professionals are here to guide you on your fitness journey
                            </p>
                        </motion.div>
                    </Container>
                </section>

                {/* Trainers Grid */}
                <section className="trainers-grid py-5">
                    <Container>
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            <Row className="g-4">
                                {trainers.map((trainer, index) => (
                                    <Col lg={6} xl={4} key={trainer.id} className="mb-4">
                                        <motion.div
                                            variants={cardVariants}
                                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                            className="trainer-card-wrapper"
                                        >
                                            <Card className="trainer-card h-100">
                                                <div className="trainer-image-container">
                                                    <img
                                                        src={trainer.photo}
                                                        alt={trainer.name}
                                                        className="trainer-image"
                                                    />
                                                    <div className="trainer-overlay">
                                                        <div className="trainer-rating">
                                                            <span className="rating-stars">⭐</span>
                                                            <span className="rating-value">{trainer.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <Card.Body className="trainer-info">
                                                    <div className="trainer-header">
                                                        <h3 className="trainer-name">{trainer.name}</h3>
                                                        <Badge 
                                                            className="specialty-badge"
                                                            style={{ 
                                                                background: `linear-gradient(135deg, ${getSpecialtyColor(trainer.specialty)}, ${getSpecialtyColor(trainer.specialty)}AA)`,
                                                                color: 'white'
                                                            }}
                                                        >
                                                            {trainer.specialty}
                                                        </Badge>
                                                    </div>
                                                    
                                                    <div className="experience-stats">
                                                        <div className="stat-item">
                                                            <span className="stat-value">{trainer.experience}</span>
                                                            <span className="stat-label">Years Experience</span>
                                                        </div>
                                                        <div className="stat-item">
                                                            <span className="stat-value">{trainer.sessionsCompleted.toLocaleString()}</span>
                                                            <span className="stat-label">Sessions</span>
                                                        </div>
                                                    </div>
                                                    
                                                    <p className="trainer-bio">{trainer.bio}</p>
                                                    
                                                    <div className="specialties-list">
                                                        {trainer.specialties.slice(0, 3).map((spec, idx) => (
                                                            <span key={idx} className="specialty-tag">
                                                                {spec}
                                                            </span>
                                                        ))}
                                                    </div>
                                                    
                                                    <div className="certifications">
                                                        <h6 className="cert-title">Certifications:</h6>
                                                        <div className="cert-list">
                                                            {trainer.certifications.map((cert, idx) => (
                                                                <Badge key={idx} bg="secondary" className="cert-badge me-1 mb-1">
                                                                    {cert}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="trainer-actions">
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                        >
                                                            <Button
                                                                className="btn-modern btn-primary-modern w-100"
                                                                onClick={() => navigate('/Classes')}
                                                            >
                                                                View Classes
                                                            </Button>
                                                        </motion.div>
                                                        <motion.div
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            className="mt-2"
                                                        >
                                                            <Button
                                                                variant="outline-primary"
                                                                className="w-100"
                                                                onClick={() => navigate('/Contact')}
                                                            >
                                                                Book Session
                                                            </Button>
                                                        </motion.div>
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

                {/* CTA Section */}
                <section className="trainers-cta py-5">
                    <Container>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <Card className="cta-card">
                                <Card.Body className="p-5">
                                    <h2 className="cta-title">
                                        Ready to Start Your <span className="gradient-text">Fitness Journey</span>?
                                    </h2>
                                    <p className="cta-subtitle">
                                        Book a consultation with one of our expert trainers and get a personalized fitness plan
                                    </p>
                                    <div className="cta-buttons">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                as={() => <button onClick={() => navigate('/SignUp')}>Get Started</button>}
                                                className="btn-modern btn-primary-modern me-3"
                                                size="lg"
                                            >
                                                Get Started
                                            </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                variant="outline-primary"
                                                size="lg"
                                                onClick={() => navigate('/Contact')}
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

export default Trainer;