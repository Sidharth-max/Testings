import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Table, Card, Badge } from 'react-bootstrap';

const EmployeeComponent = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        salary: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        age: '',
        salary: ''
    });

    const [employees, setEmployees] = useState(() => {
        const saved = localStorage.getItem('employees');
        return saved ? JSON.parse(saved) : [];
    });
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem('employees', JSON.stringify(employees));
    }, [employees]);

    // Convert a string to Title Case (e.g. "john doe" → "John Doe")
    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .filter(word => word.length > 0)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    // Validate individual fields and return error message (empty string = valid)
    const validateField = (name, value) => {
        switch (name) {
            case 'name': {
                if (!value.trim()) return 'Name is required';
                if (/[^a-zA-Z\s]/.test(value)) return 'Name must contain only letters and spaces (no special characters or numbers)';
                if (value.trim().length < 3) return 'Name must be at least 3 characters long';
                return '';
            }
            case 'age': {
                if (value === '') return 'Age is required';
                const age = Number(value);
                if (!Number.isInteger(age)) return 'Age must be a whole number';
                if (age < 18) return 'Minimum age is 18 years (must be a working adult)';
                if (age > 65) return 'Maximum age is 65 years (retirement age limit)';
                return '';
            }
            case 'salary': {
                if (value === '') return 'Salary is required';
                const salary = Number(value);
                if (isNaN(salary)) return 'Salary must be a valid number';
                if (salary < 1000) return 'Minimum salary is ₹1,000';
                if (salary > 10000000) return 'Maximum salary is ₹1,00,00,000';
                return '';
            }
            default:
                return '';
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // For name field: block special characters / numbers as user types
        if (name === 'name' && value !== '' && /[^a-zA-Z\s]/.test(value)) {
            setErrors(prev => ({ ...prev, name: 'Only letters and spaces are allowed' }));
            return; // don't update value
        }

        // Force Title Case in real-time for the name field
        const finalValue = name === 'name' ? toTitleCase(value) : value;

        setFormData(prev => ({ ...prev, [name]: finalValue }));

        // Live-validate on change (clear error as soon as it's fixed)
        setErrors(prev => ({ ...prev, [name]: validateField(name, finalValue) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate all fields before submitting
        const newErrors = {
            name: validateField('name', formData.name),
            age: validateField('age', formData.age),
            salary: validateField('salary', formData.salary)
        };
        setErrors(newErrors);

        // If any error exists, stop submission
        if (Object.values(newErrors).some(err => err !== '')) return;

        // Auto-convert name to Title Case before saving
        const cleanedData = {
            ...formData,
            name: toTitleCase(formData.name.trim())
        };
        
        if (editIndex !== null) {
            const updatedEmployees = employees.map((emp, index) => 
                index === editIndex ? { ...cleanedData } : emp
            );
            setEmployees(updatedEmployees);
            setEditIndex(null);
        } else {
            setEmployees([...employees, { ...cleanedData }]);
        }
        
        // Reset form & errors
        setFormData({ name: '', age: '', salary: '' });
        setErrors({ name: '', age: '', salary: '' });
    };

    const handleEdit = (index) => {
        setFormData(employees[index]);
        setErrors({ name: '', age: '', salary: '' });
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedEmployees = employees.filter((_, i) => i !== index);
        setEmployees(updatedEmployees);
        if (editIndex === index) {
            setFormData({ name: '', age: '', salary: '' });
            setErrors({ name: '', age: '', salary: '' });
            setEditIndex(null);
        }
    };

    const handleCancel = () => {
        setFormData({ name: '', age: '', salary: '' });
        setErrors({ name: '', age: '', salary: '' });
        setEditIndex(null);
    };

    return (
        <Container className="py-5" style={{ maxWidth: '1200px' }}>
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-primary mb-2">Employee Management System</h1>
                <p className="text-muted">Manage your employee records efficiently</p>
            </div>
            
            <Row className="g-4">
                <Col lg={4} md={6}>
                    <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
                        <Card.Body className="p-4">
                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-primary bg-gradient rounded-circle p-2 me-3" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                    </svg>
                                </div>
                                <h4 className="mb-0 fw-bold">{editIndex !== null ? 'Edit Employee' : 'Add Employee'}</h4>
                            </div>
                            
                            <Form onSubmit={handleSubmit} noValidate>
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold text-secondary small">Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter full name (min 3 letters, Title Case)"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        isInvalid={!!errors.name}
                                        className="border-0 bg-light"
                                        style={{ borderRadius: '10px', padding: '12px 15px' }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted" style={{ fontSize: '0.75rem' }}>
                                        Letters & spaces only · Min 3 chars · Auto Title Case
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-semibold text-secondary small">Age</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="18 – 65"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        isInvalid={!!errors.age}
                                        min={18}
                                        max={65}
                                        className="border-0 bg-light"
                                        style={{ borderRadius: '10px', padding: '12px 15px' }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.age}
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted" style={{ fontSize: '0.75rem' }}>
                                        Must be between 18 and 65 years
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold text-secondary small">Salary (₹)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="₹1,000 – ₹1,00,00,000"
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                        isInvalid={!!errors.salary}
                                        min={1000}
                                        max={10000000}
                                        className="border-0 bg-light"
                                        style={{ borderRadius: '10px', padding: '12px 15px' }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.salary}
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted" style={{ fontSize: '0.75rem' }}>
                                        Min ₹1,000 · Max ₹1,00,00,000
                                    </Form.Text>
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button 
                                        variant={editIndex !== null ? "warning" : "primary"} 
                                        type="submit"
                                        className="fw-semibold"
                                        style={{ borderRadius: '10px', padding: '12px' }}
                                    >
                                        {editIndex !== null ? '✓ Update Employee' : '+ Add Employee'}
                                    </Button>
                                    {editIndex !== null && (
                                        <Button 
                                            variant="outline-secondary" 
                                            onClick={handleCancel}
                                            className="fw-semibold"
                                            style={{ borderRadius: '10px', padding: '12px' }}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={8} md={6}>
                    <Card className="shadow-sm border-0" style={{ borderRadius: '15px' }}>
                        <Card.Body className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="mb-0 fw-bold">Employee List</h4>
                                <Badge bg="primary" pill className="px-3 py-2">
                                    {employees.length} {employees.length === 1 ? 'Employee' : 'Employees'}
                                </Badge>
                            </div>
                            
                            <div style={{ overflowX: 'auto' }}>
                                <Table hover responsive className="mb-0">
                                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                                        <tr>
                                            <th className="fw-semibold text-secondary border-0" style={{ padding: '15px' }}>ID</th>
                                            <th className="fw-semibold text-secondary border-0" style={{ padding: '15px' }}>Name</th>
                                            <th className="fw-semibold text-secondary border-0" style={{ padding: '15px' }}>Age</th>
                                            <th className="fw-semibold text-secondary border-0" style={{ padding: '15px' }}>Salary</th>
                                            <th className="fw-semibold text-secondary border-0" style={{ padding: '15px' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employees.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center py-5">
                                                    <div className="text-muted">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16" className="mb-3 opacity-50">
                                                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                                            <path fillRule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                                            <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                                        </svg>
                                                        <p className="mb-0 fw-semibold">No employees found</p>
                                                        <small>Add your first employee to get started</small>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            employees.map((emp, index) => (
                                                <tr key={index} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                                    <td style={{ padding: '15px', verticalAlign: 'middle' }}>
                                                        <Badge bg="secondary" pill>{index + 1}</Badge>
                                                    </td>
                                                    <td style={{ padding: '15px', verticalAlign: 'middle' }}>
                                                        <span className="fw-semibold">{emp.name}</span>
                                                    </td>
                                                    <td style={{ padding: '15px', verticalAlign: 'middle' }}>{emp.age}</td>
                                                    <td style={{ padding: '15px', verticalAlign: 'middle' }}>
                                                        <span className="text-success fw-semibold">₹{Number(emp.salary).toLocaleString('en-IN')}</span>
                                                    </td>
                                                    <td style={{ padding: '15px', verticalAlign: 'middle' }}>
                                                        <Button 
                                                            variant="outline-warning" 
                                                            size="sm" 
                                                            className="me-2"
                                                            onClick={() => handleEdit(index)}
                                                            style={{ borderRadius: '8px', padding: '5px 15px' }}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button 
                                                            variant="outline-danger" 
                                                            size="sm"
                                                            onClick={() => handleDelete(index)}
                                                            style={{ borderRadius: '8px', padding: '5px 15px' }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EmployeeComponent;
