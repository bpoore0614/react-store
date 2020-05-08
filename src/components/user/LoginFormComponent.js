import React from 'react';
import { Row, Col, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const LoginForm = props => (
    <LocalForm onSubmit={(values => props.handleSubmit(values))}>
        <FormGroup>
            <Label htmlFor="username">Username </Label>
            <Control.text model=".username" name="username"
                placeholder="Username"
                className="form-control w-100"
                validators={{
                    required, minLength: minLength(3), maxLength: maxLength(15)
                }}
            />
            <Errors
                className="text-danger"
                model=".username"
                show="touched"
                messages={{
                    required: 'Required ',
                    minLength: "Name must be at least 3 characters",
                    maxLength: "Name must be less than 15 characters"
                }}
            />
        </FormGroup>

        <FormGroup>
            <Label htmlFor="password">Password </Label>
            <Control.password model=".password" name="password"
                placeholder="Password"
                className="form-control w-100"
                validators={{
                    required, minLength: minLength(3), maxLength: maxLength(15)
                }}
            />
            <Errors
                className="text-danger"
                model=".password"
                show="touched"
                messages={{
                    required: 'Required ',
                    minLength: "Name must be at least 3 characters",
                    maxLength: "Name must be less than 15 characters"
                }}
            />
        </FormGroup>
        <FormGroup>
            <Button type="submit" color="primary">Submit</Button>
        </FormGroup>
    
    </LocalForm >
)

export default LoginForm;

