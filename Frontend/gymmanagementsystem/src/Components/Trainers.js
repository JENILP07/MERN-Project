import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Trainer.css'; // Import custom CSS for additional styling

const trainers = [
    {
        name: 'Dr. Nilesh Gambhava',
        photo: 'https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/3---28-04-2023-02-02-42.jpg',
        specialty: 'Strength Training',
        experience: 11, // years
    },
    {
        name: 'Dr. Pradyumansinh Jadeja',
        photo: 'https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/6---28-04-2023-02-06-07.jpg',
        specialty: 'Yoga & Pilates',
        experience: 19, // years
    },
    {
        name: 'Prof. Arjun Bala',
        photo: 'https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/15---28-04-2023-02-07-35.jpg',
        specialty: 'Cardio & Endurance',
        experience: 10, // years
    },
    {
        name: 'Prof. Dixita Kagathara',
        photo: 'https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/9---28-04-2023-02-06-37.jpg',
        specialty: 'Powerlifting',
        experience: 15, // years
    },
    {
        name: 'Prof. Vijay Shekhat',
        photo: 'https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/16---28-04-2023-02-08-00.jpg',
        specialty: 'Crossfit',
        experience: 7, // years
    },
    {
        name: 'Prof. Shruti Maniar',
        photo: 'https://du-website.s3.ap-south-1.amazonaws.com/U01/Faculty-Photo/336---28-04-2023-01-34-37.jpg',
        specialty: 'Nutrition & Wellness',
        experience: 8, // years
    },
];


const Trainer = () => {
    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Meet Our Trainers</h1>
            <Row>
                {trainers.map((trainer, index) => (
                    <Col md={6} lg={4} key={index} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={trainer.photo} alt={trainer.name} />
                            <Card.Body>
                                <Card.Title>{trainer.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Specialty: {trainer.specialty}
                                </Card.Subtitle>
                                <Card.Text>
                                    Experience: {trainer.experience} years
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Trainer;