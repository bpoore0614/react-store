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
import Login from '../user/LoginComponent';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            success: false,
            message: "null",
            loggedOut: false
        }

        this.toggleModal = this.toggleModal.bind(this);

    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render() {
        return (
            <div>
                <Login />
                <FlashMessage/>
            </div>

        )
    }
}


export default (Header);


