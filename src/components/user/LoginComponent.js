import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { LoginModal } from '../user/LoginModalComponent';
import LoginForm from '../user/LoginFormComponent';
import { fetchCart, loginUser, postLocalCart } from '../../redux/ActionTypes';


class Login extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(values) {
        await this.props.loginUser(values)
        await this.props.postLocalCart();

    }

    render() {
        const { loginUser } = this.props
        const { handleSubmit } = this
        const Modal = () => (
            <LoginModal
                loginUser={loginUser}
                handleSubmit={handleSubmit}
            />
        )
        const LoginPage = () => (
            <LoginForm
                loginUser={loginUser}
                handleSubmit={handleSubmit}
            />
        )
        return (
            <>
                <Switch location={this.props.location}>
                    <Route exact path='/login' render={LoginPage} />
                    <Route path="*" render={Modal} />
                </Switch>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.Auth
    }
}

const mapDispatchToProps = (dispatch) => ({
    loginUser: (creds) => dispatch(loginUser(creds)),
    postLocalCart: () => dispatch(postLocalCart()),
    fetchCart: () => dispatch(fetchCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);


