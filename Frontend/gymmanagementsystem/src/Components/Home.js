import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./Home.css"; // Import custom CSS for additional styling

const Home = () => {
  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">FitLife</h2>
        <nav className="sidebar-nav">
          <Link to="/home">Home</Link>
          <Link to="/About">About</Link>
          <Link to="/SignIn">Sign In</Link>
          <Link to="/Contact">Contact</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <header className="hero bg-primary text-light text-center py-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8}>
                <h1>Elevate Your Fitness Journey</h1>
                <p>
                  Join GymPro and achieve your fitness goals with our expert
                  trainers and state-of-the-art facilities.
                </p>
              </Col>
            </Row>
          </Container>
        </header>

        {/* Feature Cards */}
        <section className="features my-5">
          <Container>
            <Row>
              <Col md={4}>
                <Card className="feature-card">
                  <Card.Body>
                    <a
                      href="/Trainers"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Card.Title>Personal Training</Card.Title>
                    </a>
                    <Card.Text>
                      Work with our certified personal trainers to get a
                      customized workout plan tailored to your needs.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="feature-card">
                  <Card.Body>
                    <Card.Title>Group Classes</Card.Title>
                    <Card.Text>
                      Join a variety of group classes from yoga to
                      high-intensity interval training. All levels welcome!
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="feature-card">
                  <Card.Body>
                    <a
                      href="/NutritionGuidance"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Card.Title>Nutrition Guidance</Card.Title>
                    </a>
                    <Card.Text>
                      Get expert advice on nutrition to complement your workouts
                      and enhance your results.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Yearly Plans */}
        <section id="plans" className="yearly-plans py-5">
          <Container>
            <h2 className="text-center mb-4">Yearly Membership Plans</h2>
            <Row>
              <Col md={4}>
                <Card className="plan-card">
                  <Card.Body>
                    <Card.Title>Basic Plan</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      $299/year
                    </Card.Subtitle>
                    <Card.Text>
                      Access to gym facilities during non-peak hours, free group
                      classes, and basic equipment.
                    </Card.Text>
                    <a href="/SignUp">
                      <Button variant="primary">Sign Up</Button>
                    </a>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="plan-card">
                  <Card.Body>
                    <Card.Title>Standard Plan</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      $499/year
                    </Card.Subtitle>
                    <Card.Text>
                      Unlimited access to gym facilities, all group classes, and
                      a free personal training session each month.
                    </Card.Text>
                    <a href="/SignUp">
                      <Button variant="primary">Sign Up</Button>
                    </a>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="plan-card">
                  <Card.Body>
                    <Card.Title>Premium Plan</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      $699/year
                    </Card.Subtitle>
                    <Card.Text>
                      All Standard Plan benefits plus premium classes, priority
                      booking, and a personalized nutrition plan.
                    </Card.Text>
                    <a href="/SignUp">
                      <Button variant="primary">Sign Up</Button>
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default Home;
