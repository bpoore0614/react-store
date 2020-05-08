import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { fetchReviews, putReview } from '../../redux/ActionTypes';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Link, StaticRouter } from 'react-router-dom';
import ReviewForm from '../review/ReviewFormComponent';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



class UpdateReview extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: true }
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
    }


    handleReviewSubmit(values) {
        this.props.putReview(this.props.reviewId, values);
        this.setState({ redirect: true });
    }

    async componentDidMount() {
        await this.props.fetchReviews()

        if (this.props.reviews && this.state.loading) {
            this.setState({
                loading: false
            })
        }
    }

    render() {
        const { error, loading, parents } = this.props
        var content;
        if (this.state.redirect) {
            return <Redirect to={{ pathname: '/reviews' }} />
        }
        if (!this.state.loading) {
            content =
                <ReviewForm
                    review={this.props.reviews.items.filter((review) => review._id == this.props.reviewId)}
                    // parents={this.props.parents}
                    // category={this.props.category}
                    // putCategory={this.props.putCategory}
                    handleReviewSubmit={this.handleReviewSubmit}
                />
        } else if (this.state.loading) {
            content = (
                <div>Loading</div>
            )
        } else {
            content = <div>Error</div>
        }
        return (
            <div>
                {content}
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => ({
    // putReview: (val, id) => dispatch(putReview(val, id)),
    fetchReviews: () => dispatch(fetchReviews()),
    putReview: (id,val) => dispatch(putReview(id,val))
})
const mapStateToProps = state => {

    return {
        reviews: state.Reviews
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateReview)
