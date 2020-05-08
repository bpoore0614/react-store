import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { postTag } from '../redux/ActionTypes';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TagForm from './TagFormComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class NewTag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postTag(values.name, values.parent);
    }

    render() {
        return (
            <>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-plus-square fa-lg"> Add New Tag</span>
                </Button >

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit New Tag</ModalHeader>
                    <ModalBody>
                       <TagForm
                       tags={this.props.tags}
                       handleSubmit ={this.handleSubmit.bind(this)}/>

                    </ModalBody>

                </Modal>
            </>
        )
    }
}


export default NewTag;

