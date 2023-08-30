import React, { useState } from "react";
import { Form, Input, Button, Card, CardBody, CardTitle } from "reactstrap";
import "./SignUpForm.css"

const SignUpForm = ({ signup }) => {
    const initialState = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    };
    const [formData, setFormData] = useState(initialState);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }))
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await signup(formData);
    };

    return (
        <div className="SignUpForm">
            
            <Card>
                <CardTitle>Sign Up</CardTitle>
                <CardBody>
                    <Form id="signup-form" onSubmit={handleSubmit}>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Button color="primary" id="signup-btn">Register</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );

}

export default SignUpForm;