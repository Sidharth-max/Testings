import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const EmployeeComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        salary: ''
    });

    const [employees, setEmployees] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editIndex !== null) {
            // Update existing employee
            const updatedEmployees = employees.map((emp, index) => 
                index === editIndex ? { ...formData } : emp
            );
            setEmployees(updatedEmployees);
            setEditIndex(null);
        } else {
            // Add new employee
            setEmployees([...employees, { ...formData }]);
        }
        
        // Reset form
        setFormData({
            name: '',
            age: '',
            salary: ''
        });
    };

    const handleEdit = (index) => {
        setFormData(employees[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedEmployees = employees.filter((_, i) => i !== index);
        setEmployees(updatedEmployees);
        if (editIndex === index) {
            setFormData({ name: '', age: '', salary: '' });
            setEditIndex(null);
        }
    };

    return (
        <Container className="py-4">
            <h1 className="mb-4">Vite Project</h1>
            <Row>
                <Col md={6} lg={4}>
                    <Form onSubmit={handleSubmit} className="mb-4">
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="age">
                            <Form.Label>Age:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="salary">
                            <Form.Label>Salary:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter salary"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {editIndex !== null ? 'Update Data' : 'Save Data'}
                        </Button>
                    </Form>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Salary</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center">No data available</td>
                                </tr>
                            ) : (
                                employees.map((emp, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.age}</td>
                                        <td>{emp.salary}</td>
                                        <td>
                                            <Button 
                                                variant="warning" 
                                                size="sm" 
                                                className="me-2"
                                                onClick={() => handleEdit(index)}
                                            >
                                                Edit
                                            </Button>
                                            <Button 
                                                variant="danger" 
                                                size="sm"
                                                onClick={() => handleDelete(index)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeeComponent;
