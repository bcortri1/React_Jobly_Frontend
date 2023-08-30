import React, { useState } from "react";
import { Form, Input, Button, Card, CardBody, CardTitle } from "reactstrap";
import "./ProfileForm.css"

const ProfileForm = ({ editUser, currUser }) => {
    const initialState = {password:"", ...currUser};
    const [formData, setFormData] = useState(initialState);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((data) => ({
            ...data,
            [name]: value,
            username: currUser.username
        }))
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await editUser(formData);
    };

    return (
        <div className="SignUpForm">

            <Card>
                <CardTitle>Edit Info</CardTitle>
                <CardBody>
                    <Form id="edit-form" onSubmit={handleSubmit}>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={formData.username}
                            disabled
                        />
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Input
                            id="firstName"
                            name="firstName"
                            type="text"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <Input
                            id="lastName"
                            name="lastName"
                            type="text"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        <Input
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Button id="signup-btn">Change</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );

}

export default ProfileForm;