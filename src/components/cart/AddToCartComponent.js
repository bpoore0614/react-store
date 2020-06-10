import React, { useState } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Form, FormGroup, FormFeedback, Label, CustomInput, Input, FormText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Carousel, InputGroup } from 'reactstrap';

import { Link } from 'react-router-dom';


export const AddToCart = props => {
    const { postCart, product } = props
    const [cart, setCart] = useState({ product: product, quantity: 1 });
    const handleChange = (event) => {
        setCart({ product: product, quantity: parseInt(event.target.value) })
    }
    const handleSubmit = () => {
        postCart(cart);
    }

    return (
        <LocalForm onSubmit={() => handleSubmit()}>
            <InputGroup >
                <Input
                    type="number"
                    className="d-inline-block"
                    style={{ width: "75px" }}
                    name="quantity"
                    id="addQuantity"
                    placeholder={1}
                    defaultValue={1}
                    onChange={handleChange}
                />
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
}