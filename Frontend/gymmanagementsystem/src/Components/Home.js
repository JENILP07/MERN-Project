import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "./Home.css";
import "../styles/globals.css";

const Home = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardHover = {
    hover: {
      scale: 1.03,
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  const statsAnimation = {
    initial: { opacity: 0, y: 30, scale: 0.8 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const statsHover = {
    hover: {
      scale: 1.08,
      y: -10,
      rotateY: 5,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 300
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="home-container-modern">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-modern">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <Container className="hero-content">
          <Row className="align-items-center min-vh-100">
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="hero-title">
                  Elevate Your Fitness Journey
                </h1>
                <p className="hero-subtitle">
                  Transform your body and mind with our world-class facilities, expert trainers, and personalized fitness programs designed specifically for your goals and lifestyle.
                </p>
                <div className="hero-buttons">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      as={Link} 
                      to="/SignUp" 
                      size="lg"
                      className="btn-modern btn-primary-modern me-3"
                    >
                      Start Your Journey
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      as={Link} 
                      to="#plans" 
                      variant="outline-light" 
                      size="lg"
                      className="btn-modern btn-outline-modern"
                    >
                      View Plans
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hero-image-container"
              >
                <motion.div 
                  className="hero-stats"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {[
                    {
                      number: "500+",
                      label: "Happy Members",
                      icon: "👥",
                      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      delay: 0.6
                    },
                    {
                      number: "50+",
                      label: "Expert Trainers",
                      icon: "💪",
                      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      delay: 0.8
                    },
                    {
                      number: "24/7",
                      label: "Gym Access",
                      icon: "🔓",
                      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      delay: 1.0
                    },
                    {
                      number: "5★",
                      label: "Rating",
                      icon: "⭐",
                      gradient: "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)",
                      delay: 1.2
                    }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      className="stat-card-enhanced"
                      variants={statsAnimation}
                      whileHover={statsHover.hover}
                      whileTap={statsHover.tap}
                      initial={{
                        opacity: 0,
                        y: 50,
                        scale: 0.8,
                        rotateX: -15
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        rotateX: 0,
                        transition: {
                          duration: 0.8,
                          delay: stat.delay,
                          type: "spring",
                          stiffness: 100,
                          damping: 15
                        }
                      }}
                      style={{
                        background: stat.gradient,
                        perspective: "1000px"
                      }}
                    >
                      <motion.div 
                        className="stat-icon"
                        variants={pulseAnimation}
                        animate="animate"
                      >
                        {stat.icon}
                      </motion.div>
                      <motion.div className="stat-content">
                        <motion.h3 
                          className="stat-number"
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: 1,
                            transition: {
                              delay: stat.delay + 0.3,
                              type: "spring",
                              stiffness: 200
                            }
                          }}
                        >
                          {stat.number}
                        </motion.h3>
                        <motion.p 
                          className="stat-label"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: 1,
                            transition: {
                              delay: stat.delay + 0.5
                            }
                          }}
                        >
                          {stat.label}
                        </motion.p>
                      </motion.div>
                      <div className="stat-shine"></div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-modern py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Why Choose <span className="gradient-text">FitLife</span>?</h2>
            <p className="section-subtitle">
              Discover what makes us the premier choice for fitness enthusiasts
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Row className="g-4">
              {[
                {
                  title: "Personal Training",
                  description: "Work with certified personal trainers for customized workout plans tailored to your specific goals and fitness level.",
                  icon: "🏋️‍♂️",
                  link: "/Trainers",
                  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                },
                {
                  title: "Group Classes",
                  description: "Join energizing group classes from yoga to HIIT. Perfect for all fitness levels with expert instruction.",
                  icon: "👥",
                  link: "/Classes",
                  gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                },
                {
                  title: "Nutrition Guidance",
                  description: "Get expert nutritional advice to complement your workouts and accelerate your fitness results.",
                  icon: "🥗",
                  link: "/NutritionGuidance",
                  gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                }
              ].map((feature, index) => (
                <Col md={4} key={index}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={cardHover.hover}
                    className="h-100"
                  >
                    <Card className="feature-card-modern h-100">
                      <div 
                        className="feature-icon" 
                        style={{ background: feature.gradient }}
                      >
                        <span>{feature.icon}</span>
                      </div>
                      <Card.Body className="text-center p-4">
                        <Card.Title className="feature-title mb-3">
                          {feature.title}
                        </Card.Title>
                        <Card.Text className="feature-description mb-4">
                          {feature.description}
                        </Card.Text>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button 
                            as={Link} 
                            to={feature.link}
                            variant="outline-primary"
                            className="btn-modern feature-btn"
                          >
                            Learn More
                          </Button>
                        </motion.div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Pricing Plans */}
      <section id="plans" className="pricing-modern py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="section-title">Choose Your <span className="gradient-text">Membership</span></h2>
            <p className="section-subtitle">
              Flexible plans designed to fit your lifestyle and budget
            </p>
          </motion.div>
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Row className="g-4 justify-content-center">
              {[
                {
                  name: "Basic",
                  price: "299",
                  popular: false,
                  features: [
                    "Access during non-peak hours",
                    "Basic gym equipment",
                    "Locker room access",
                    "Group classes (limited)",
                    "Mobile app access"
                  ],
                  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                },
                {
                  name: "Standard",
                  price: "499",
                  popular: true,
                  features: [
                    "24/7 gym access",
                    "All equipment & facilities",
                    "Unlimited group classes",
                    "1 personal training session/month",
                    "Nutrition consultation",
                    "Guest passes (2/month)"
                  ],
                  gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                },
                {
                  name: "Premium",
                  price: "699",
                  popular: false,
                  features: [
                    "Everything in Standard",
                    "4 personal training sessions/month",
                    "Personalized meal plans",
                    "Priority class booking",
                    "Spa & recovery services",
                    "Unlimited guest passes"
                  ],
                  gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                }
              ].map((plan, index) => (
                <Col lg={4} md={6} key={index}>
                  <motion.div
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, y: -8 }}
                    className="h-100 position-relative"
                  >
                    {plan.popular && (
                      <div className="popular-badge">
                        <span>Most Popular</span>
                      </div>
                    )}
                    <Card className={`pricing-card h-100 ${plan.popular ? 'popular-plan' : ''}`}>
                      <div 
                        className="pricing-header" 
                        style={{ background: plan.gradient }}
                      >
                        <h3 className="plan-name">{plan.name}</h3>
                        <div className="plan-price">
                          <span className="currency">$</span>
                          <span className="amount">{plan.price}</span>
                          <span className="period">/year</span>
                        </div>
                      </div>
                      <Card.Body className="p-4">
                        <ul className="features-list">
                          {plan.features.map((feature, idx) => (
                            <li key={idx}>
                              <span className="feature-check">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <motion.div 
                          whileHover={{ scale: 1.05 }} 
                          whileTap={{ scale: 0.95 }}
                          className="mt-4"
                        >
                          <Button 
                            as={Link} 
                            to="/SignUp" 
                            className={`btn-modern w-100 ${
                              plan.popular 
                                ? 'btn-primary-modern' 
                                : 'btn-outline-primary'
                            }`}
                            size="lg"
                          >
                            Get Started
                          </Button>
                        </motion.div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Container>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
