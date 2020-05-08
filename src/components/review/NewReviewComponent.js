import React from 'react';
import ReviewForm from './ReviewFormComponent';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CategoryForm from '../category/CategoryFormComponent';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const NewReview = props => (
    <>
        <Button outline onClick={props.toggleModal}>
            <span className="fa fa-pencil fa-lg"> Submit New Comment</span>
        </Button >

        <Modal isOpen={props.isModalOpen} toggle={props.toggleModal}>
            <ModalHeader toggle={props.toggleModal}>Submit New Review</ModalHeader>
            <ModalBody>
                <ReviewForm
                    // categories={this.props.categories}
                    handleReviewSubmit={props.handleReviewSubmit} />
            </ModalBody>

        </Modal>
    </>
)

export default NewReview;

