import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
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

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    alert("🎉 Thank you! Get ready to take your training platform to the next level.");
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
            <Col lg={5}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="hero-title-interactive">
                  Smart Platform for <span className="text-gradient-primary">Health & Fitness</span> Trainers
                  <div className="title-icons-pill">
                    <span className="pill-icon">🧘‍♀️</span>
                    <span className="pill-icon">🏋️‍♂️</span>
                    <span className="pill-icon">🏃‍♂️</span>
                    <span className="pill-icon">🛡️</span>
                  </div>
                </h1>
                <p className="hero-subtitle-interactive">
                  Smart tools to help instructors grow and deliver exceptional coaching.
                </p>
                
                <Form onSubmit={handleEmailSubmit} className="hero-email-form">
                  <div className="nested-input-container">
                    <span className="mail-icon">✉️</span>
                    <input 
                      type="email" 
                      placeholder="Enter Your Email" 
                      className="nested-input-field" 
                      required 
                    />
                    <Button type="submit" variant="none" className="btn-cyber nested-submit-btn">
                      Get Started
                    </Button>
                  </div>
                </Form>

                <div className="trusted-coaches-row">
                  <div className="avatar-stack">
                    <div className="avatar-circle av-1">JD</div>
                    <div className="avatar-circle av-2">AM</div>
                    <div className="avatar-circle av-3">KL</div>
                    <div className="avatar-circle av-4">SR</div>
                  </div>
                  <span className="trusted-text">Trusted by 1000+ health coaches</span>
                </div>
              </motion.div>
            </Col>
            <Col lg={7}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hero-interactive-container"
              >
                <div className="interactive-wrapper">
                  <img 
                    src="/yoga_lunge.png" 
                    alt="Premium Health & Fitness Platform" 
                    className="interactive-image"
                  />
                  
                  {/* Callout 1: Hand */}
                  <div className="callout-point callout-hand">
                    <span className="callout-dot"></span>
                    <span className="callout-pulse"></span>
                    <div className="callout-label label-hand">
                      <span className="label-line"></span>
                      <p className="callout-content">Train up to 100 clients during trial.</p>
                    </div>
                  </div>

                  {/* Callout 2: Waist */}
                  <div className="callout-point callout-waist">
                    <span className="callout-dot"></span>
                    <span className="callout-pulse"></span>
                    <div className="callout-label label-waist">
                      <span className="label-line"></span>
                      <p className="callout-content">Wearable Integration</p>
                    </div>
                  </div>

                  {/* Callout 3: Knee */}
                  <div className="callout-point callout-knee">
                    <span className="callout-dot"></span>
                    <span className="callout-pulse"></span>
                    <div className="callout-label label-knee">
                      <span className="label-line"></span>
                      <p className="callout-content">Custom Branded App</p>
                    </div>
                  </div>
                </div>
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
            <h2 className="section-title">Why Choose <span className="text-gradient-primary">FitLife</span>?</h2>
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
                  gradient: "linear-gradient(135deg, var(--primary-glow) 0%, #704728 100%)"
                },
                {
                  title: "Group Classes",
                  description: "Join energizing group classes from yoga to HIIT. Perfect for all fitness levels with expert instruction.",
                  icon: "👥",
                  link: "/Trainers",
                  gradient: "linear-gradient(135deg, var(--secondary-glow) 0%, #204f3b 100%)"
                },
                {
                  title: "Nutrition Guidance",
                  description: "Get expert nutritional advice to complement your workouts and accelerate your fitness results.",
                  icon: "🥗",
                  link: "/NutritionGuidance",
                  gradient: "linear-gradient(135deg, var(--primary-glow) 0%, var(--secondary-glow) 100%)"
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
                            variant="none"
                            className="btn-cyber-outline w-100"
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
            <h2 className="section-title">Choose Your <span className="text-gradient-primary">Membership</span></h2>
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
                  gradient: "linear-gradient(135deg, #ffffff 0%, var(--bg-carbon-light) 100%)",
                  textColor: "var(--text-platinum)",
                  priceColor: "var(--text-platinum)",
                  currencyColor: "var(--text-slate)",
                  periodColor: "var(--text-slate)"
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
                  gradient: "linear-gradient(135deg, var(--primary-glow) 0%, #704728 100%)",
                  textColor: "#ffffff",
                  priceColor: "#ffffff",
                  currencyColor: "rgba(255, 255, 255, 0.8)",
                  periodColor: "rgba(255, 255, 255, 0.7)"
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
                  gradient: "linear-gradient(135deg, var(--secondary-glow) 0%, #204f3b 100%)",
                  textColor: "#ffffff",
                  priceColor: "#ffffff",
                  currencyColor: "rgba(255, 255, 255, 0.8)",
                  periodColor: "rgba(255, 255, 255, 0.7)"
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
                        style={{ background: plan.gradient, color: plan.textColor }}
                      >
                        <h3 className="plan-name" style={{ color: plan.textColor }}>{plan.name}</h3>
                        <div className="plan-price" style={{ color: plan.textColor }}>
                          <span className="currency" style={{ color: plan.currencyColor }}>$</span>
                          <span className="amount" style={{ color: plan.textColor }}>{plan.price}</span>
                          <span className="period" style={{ color: plan.periodColor }}>/year</span>
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
                            variant="none"
                            className={`w-100 ${
                              plan.popular 
                                ? 'btn-cyber' 
                                : 'btn-cyber-outline'
                            }`}
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
