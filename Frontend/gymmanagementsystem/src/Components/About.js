import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AboutPage.css'; // Import custom CSS for additional styling

const AboutPage = () => {
    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h1 className="text-center mb-4">About Us</h1>
                    
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title className="text-center">Welcome to FitLife Gym</Card.Title>
                            <Card.Text>
                                At FitLife Gym, we are dedicated to helping you achieve your fitness goals. Whether you're looking to build strength, improve your endurance, or just maintain a healthy lifestyle, our state-of-the-art facilities and expert trainers are here to support you every step of the way.
                            </Card.Text>
                            <Card.Text>
                                Our gym is equipped with the latest fitness equipment and offers a variety of classes, including yoga, pilates, strength training, and more. We pride ourselves on creating a welcoming and motivating environment where everyone feels at home.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    
                    <Row>
                        <Col md={6}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>Our Mission</Card.Title>
                                    <Card.Text>
                                        Our mission is to inspire and empower individuals to lead healthier lives through personalized fitness solutions, a supportive community, and innovative wellness programs.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title>Our Facilities</Card.Title>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>State-of-the-art gym equipment</ListGroup.Item>
                                        <ListGroup.Item>Spacious workout areas</ListGroup.Item>
                                        <ListGroup.Item>Group fitness classes</ListGroup.Item>
                                        <ListGroup.Item>Personal training services</ListGroup.Item>
                                        <ListGroup.Item>Clean and modern locker rooms</ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Card className="mt-4">
                        <Card.Body>
                            <a href='/Trainers' style={{ textDecoration: "none", color: "black" }}><Card.Title>Meet Our Team</Card.Title></a>
                            <Card.Text>
                                Our team of certified trainers and fitness experts are here to guide and motivate you. With a diverse range of expertise, we offer personalized training programs tailored to your specific needs and goals.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutPage;
