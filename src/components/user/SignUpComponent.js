import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { validate } from '../Utility/FromValidation';
import { formSubmitErrors } from '../Utility/FromValidation';
import { checkIfFormValid } from '../Utility/FromValidation';
import SignupForm from './SignUpForm';
import { RegisterModal } from './RegisterModal';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                isFormValid: false,
                name: {
                    value: '',
                    placeholder: 'Your Name',
                    valid: false,
                    errMess: [],
                    touched: false,
                    validationRules: {
                        minLength: 4,
                        maxLength: 100,
                        isRequired: true
                    },
                },
                email: {
                    value: '',
                    placeholder: 'Email Address',
                    valid: false,
                    errMess: [],
                    touched: false,
                    validationRules: {
                        isEmail: true,
                        isRequired: true
                    },
                },
                password: {
                    value: '',
                    placeholder: 'Password',
                    valid: false,
                    errMess: [],
                    touched: false,
                    validationRules: {
                        minLength: 8,
                        maxLength: 32,
                        isRequired: true,
                        meetsSpecialChar: true,
                        passwordsMatch: true
                    },
                },
                verifyPassword: {
                    value: '',
                    placeholder: 'Re-enter Password',
                    valid: false,
                    errMess: [],
                    touched: false,
                    validationRules: {
                        passwordsMatch: true,
                        isRequired: true
                    },
                },
                newsletter: {
                    value: false,
                }
            }
        };
        this.user = { ...this.state.user };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event.target.type === "checkbox") {
            const changeCheckbox = this.user;
            changeCheckbox[event.target.name].value = !changeCheckbox[event.target.name].value
            this.setState({
                user: changeCheckbox
            })

        } else {
            var validatedProduct = validate(event, this.user);
            this.setState({
                user: validatedProduct
            })
        }
    }

    async handleSubmit(event) {
        if (!checkIfFormValid(this.user)) {
            const errors = formSubmitErrors(this.user)
            this.setState({ user: errors })
        } else {
            this.props.postUser(this.user)
        }
    }

    render() {
        const { user } = this.state;
        const { handleChange, handleSubmit } = this

        const RegisterPage = () => (
            <div className="row">
                <div className="col-12 col-md-6 mx-auto">
                    <SignupForm
                        user={user}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        )

        const Modal = () => (
            <div>
                <RegisterModal
                    user={user}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        )

        if (this.props.user.userCreated) {
            return (<Redirect to="/login" />)
        }

        return (
            <>
                <Switch location={this.props.location}>
                    <Route exact path='/register' render={RegisterPage} />
                    <Route path="*" render={Modal} />
                </Switch>
            </>
        );
    }
}
export default SignUp