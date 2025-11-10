import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Usercomponent = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card>
                        <Card.Header className="bg-primary text-white">
                            <h3 className="mb-0">User Registration Form</h3>
                        </Card.Header>
                        <Card.Body>
                            {submitted && (
                                <div className="alert alert-success" role="alert">
                                    Form submitted successfully!
                                </div>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="firstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter first name"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3" controlId="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter last name"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter phone number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button variant="primary" type="submit" size="lg">
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Usercomponent;