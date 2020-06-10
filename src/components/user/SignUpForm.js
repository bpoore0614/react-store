import React from 'react';
import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';

const SignupForm = props => {    
    const { user, handleChange, handleSubmit } = props;
        return (
            <Form>
                <FormGroup>
                    <Label for="name">Your Name:</Label>
                    <Input
                        type="text"
                        name="name"
                        id="name"
                        placeholder={user.name.placeholder}
                        value={user.name.value}
                        valid={user.name.valid}
                        invalid={user.name.touched ? !user.name.valid : false}
                        onChange={handleChange}
                    />
                    {user.name.errMess.map((err, i) => <FormFeedback key={"nameError" + i}>{err}</FormFeedback>)}
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email:</Label>
                    <Input
                        type="text"
                        name="email"
                        id="email"
                        placeholder={user.email.placeholder}
                        value={user.email.value}
                        valid={user.email.valid}
                        invalid={user.email.touched ? !user.email.valid : false}
                        onChange={handleChange}
                    />
                    {user.email.errMess.map((err, i) => <FormFeedback key={"nameError" + i}>{err}</FormFeedback>)}
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password:</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder={user.password.placeholder}
                        value={user.password.value}
                        valid={user.password.valid}
                        invalid={user.password.touched ? !user.password.valid : false}
                        onChange={handleChange}
                    />
                    {user.password.errMess.map((err, i) => <FormFeedback key={"nameError" + i}>{err}</FormFeedback>)}
                </FormGroup>

                <FormGroup>
                    <Label for="verifyPassword">Re-enter Password:</Label>
                    <Input
                        type="password"
                        name="verifyPassword"
                        id="verifyPassword"
                        placeholder={user.verifyPassword.placeholder}
                        value={user.verifyPassword.value}
                        valid={user.verifyPassword.valid}
                        invalid={user.verifyPassword.touched ? !user.verifyPassword.valid : false}
                        onChange={handleChange}
                    />
                    {user.verifyPassword.errMess.map((err, i) => <FormFeedback key={"nameError" + i}>{err}</FormFeedback>)}
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input type="checkbox"
                            name="newsletter"
                            value={user.newsletter.value}
                            // value={!this.state.product.featured.value}
                            onChange={handleChange}
                        />{' '}
                            Sign up for newsletter
                        </Label>
                </FormGroup>


                <Button color="primary" onClick={handleSubmit}> Submit </Button>

            </Form >
        );
}

export default SignupForm;