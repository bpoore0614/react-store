import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import './index.css';

function reviewPercentage(reviews) {
    const ratings=[];
    reviews.forEach(review =>{
        ratings.push(review.rating)
    })
    
    if (ratings.length > 0) {
        const percentage = ((ratings.reduce((x,y)=> x+y,0)/ratings.length)/5)*100
        return percentage+"%";
    }
    return "0%";
}

const ReviewStars = props => (
    <div className="rating-box">
        <div className="rating" style={{ width: reviewPercentage(props.reviews) }}></div>
    </div>


)

export default ReviewStars;