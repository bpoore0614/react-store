import React from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Form, FormGroup, FormFeedback, Label, CustomInput, Input, FormText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Carousel, InputGroup } from 'reactstrap';

import { Link } from 'react-router-dom';


export const AddToCart = props => (

    <LocalForm onSubmit={() => props.handleUploadFilesSubmit()}>
        <InputGroup >
            {/* <Label className="mr-1" for="addQuantity">Qty:</Label> */}
            <Input
                type="number"
                className="d-inline-block"
                style={{ width: "75px" }}
                name="quantity"
                id="addQuantity"
                placeholder={1}
            // value={props.image.title.value}
            // valid={props.image.title.valid}
            // invalid={props.image.title.touched ? !props.image.title.valid : false}
            // onChange={props.handleChange}
            />
            {/* {props.image.title.errMess.map((err, i) => <FormFeedback key={"titleError" + i}>{err}</FormFeedback>)} */}
            <div className="d-block d-md-none w-100"></div>
            <Button
                className="w-100"
                type="submit"
                color="warning">
                Add To Cart
                </Button>

        </InputGroup>
    </LocalForm>
)
