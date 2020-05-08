import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import FlashMessage from '../Utility/FlashMessage';
import ReviewList from './ReviewList';
import {
    sendFlashMessage,
    fetchReviews,
    removeReview,
    postReview
} from '../../redux/ActionTypes';
import NewReview from './NewReviewComponent';





const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            success: false,
            message: "null",
            loggedOut: false,
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchReviews();
        // if (this.props.reviews.fetchFailed) {
        //     this.props.sendFlashMessage(this.props.reviews.errMess, "alert-danger")
        // }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    async handleSubmit(id) {
        const token = localStorage.getItem('token')
        if (token) {
            this.props.removeReview(id);
        }
        else (
            this.props.sendFlashMessage("Must be review author to delete review", "alert-danger")
        )
    }

    handleReviewSubmit(values) {
        this.toggleModal();
        this.props.postReview(values);
    }

    async handleLogout() {
        await this.props.logoutUser()
        this.setState({ loggedOut: true });
    }



    render() {
        if (this.props.reviews.fetchFailed) {

            this.props.sendFlashMessage(this.props.reviews.errMess, 'alert-danger');
        }

        if (this.props.reviews.isReviewFetching) {
            return (
                <div>loading</div>
            )
        }
        const List = () => {
            if (!this.props.reviews.isReviewFetching) {
                return (
                    <ReviewList
                        reviews={this.props.reviews.items}
                        removeReview={this.props.removeReview}
                        handleSubmit={this.handleSubmit} />
                )
            }
        }
        return (
            <div>
                {/* <FlashMessage /> */}
                <List />
                <NewReview
                    postReview={this.props.postReview}
                    toggleModal={this.toggleModal}
                    handleReviewSubmit ={this.handleReviewSubmit}
                    isModalOpen ={this.state.isModalOpen}
                />
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        reviews: state.Reviews
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchReviews: () => dispatch(fetchReviews()),
    postReview: (val) => dispatch(postReview(val)),
    removeReview: (id) => dispatch(removeReview(id)),
    sendFlashMessage: (name, className) => dispatch(sendFlashMessage(name, className))
})

export default connect(mapStateToProps, mapDispatchToProps)(Review);


