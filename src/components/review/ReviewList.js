import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function EditReviews(userId, review_id) {
    var edit;
    // const token = localStorage.getItem('token')
    // if (token && jwtDecode(token)._id == userId) {
    //     edit =
    //         <Link to={"/reviews/" + review_id}>
    //             <Button outline >
    //                 <span className="fa fa-pencil fa-lg"></span>
    //             </Button >
    //         </Link>

    // }
    return (
        <div>
            {"test"}
        </div>
    )






}




const ReviewList = props => (
    <div className="col-12 col-md-5 m-1" key="reviewList">
        <h4>Reviews</h4>
        {props.reviews.map((review) => {
            return (
                <div key={review._id}>
                    <div className="border">
                        <p>{review.review}</p>
                        <p>Username: {review.user.username}</p>
                        <div className="row">
                            <div className="col-6">
                                {EditReviews(review.user._id, review._id)}
                                <Button onClick={(() => props.handleSubmit(review._id))}
                                    className="btn text-white bg-danger">
                                    <span className="txt-white">Delete</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        )}
    </div>
)

export default ReviewList