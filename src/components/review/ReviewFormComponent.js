import React from 'react';
import { Row, Col, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const minRating = (len) => (val) => val >= len; 
const maxRating = (len) => (val) => val <= len; 
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const ReviewForm = props => (
    <LocalForm onSubmit={(values => props.handleReviewSubmit(values))}>
        <FormGroup>
            <Label htmlFor="rating">Rating </Label>
            <Control.text model=".rating" name="rating" type="number" min="1" max="5"
                // defaultValue={}
                className="form-control w-100"
                validators={{required, minRating: minRating(1), maxRating: maxRating(5)}}
            />
            <Errors
                className="text-danger spanBlock"
                model=".rating"
                show="touched"
                messages={{
                    required: "Required",
                    minRating: "Min rating 1",
                    maxRating: "Max rating 5"
                }}
            />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="review">Review </Label>
            <Control.textarea model=".review" name="review" rows="6"
                // defaultValue={}
                className="form-control w-100"
                validators={{required, minLength: minLength(5), maxLength: maxLength(1000)}}
            />
            <Errors
                className="text-danger spanBlock"
                model=".review"
                show="touched"
                messages={{
                    required: "Required",
                    minLength: "Min length 5 characters",
                    maxLength: "Max length 1000 characters"
                }}
            />
        </FormGroup>

        <FormGroup>
            <Button type="submit" color="primary">Submit</Button>
        </FormGroup>


    </LocalForm>
)

export default ReviewForm;

