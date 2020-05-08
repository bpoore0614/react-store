import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
// import { postTag } from '../redux/ActionTypes';
import { Link } from 'react-router-dom';
// import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginForm from '../user/LoginFormComponent';
import FlashMessage from '../Utility/FlashMessage';
import {
    sendFlashMessage,
    loginUser,
    logoutUser
} from '../../redux/ActionTypes';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            success: false,
            message: "null",
            loggedOut: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    async handleSubmit(values) {
        this.toggleModal();
        const result = await this.props.loginUser(values);
        if(result){
            this.setState({ success: result.success, message: result.status })
            this.props.sendFlashMessage(this.state.message, 'alert-success')
        }else{ 
            this.props.sendFlashMessage("Invalid username/password", 'alert-danger')
        }
        if (this.state.success == true) {
            alert(this.state.message)
            this.props.sendFlashMessage(this.state.message, 'alert-success')
        }


    }

    async handleLogout() {
        await this.props.logoutUser()
        this.setState({ loggedOut: true });
        if (this.state.loggedOut == true) {
            this.props.sendFlashMessage("You have successully logged out!", 'alert-success')
        }
    }



    render() {


        // alert(this.props.isAuthenticated)
        // if (this.props.isAuthenticated) {
        return (
            <>
                <Button outline onClick={this.props.auth.isAuthenticated ? this.handleLogout : this.toggleModal}>
                    <span className="fa fa-pencil fa-lg">{this.props.auth.isAuthenticated ? "Logout" : "Login"} </span>
                </Button >


                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LoginForm
                            loginUser={this.props.loginUser}
                            handleSubmit={this.handleSubmit}
                        />

                    </ModalBody>

                </Modal>
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
    logoutUser: () => dispatch(logoutUser()),
    sendFlashMessage: (name, className) => dispatch(sendFlashMessage(name, className))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);


