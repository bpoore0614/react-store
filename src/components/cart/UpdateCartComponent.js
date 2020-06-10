import React, { useState } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Form, FormGroup, FormFeedback, Label, CustomInput, Input, FormText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Carousel, InputGroup } from 'reactstrap';

export const UpdateCart = props => {
    const { putCart, product, quantity, deleteCart } = props
    const handleChange = (event) => {
        const newQuantity = event.target.value;
        var re = /^[0-9]+$/;
        if (re.test(newQuantity) && newQuantity !== "0") {
            putCart({ product: product, quantity: parseInt(newQuantity) })
        } else if (newQuantity === "0") {
            if (window.confirm('Are you sure you want to delete ' + product.name + "?")) {
                deleteCart(product)
            }
            else { alert("cancel") }
        }
    }

    return (
        <>
            <Input type="number"
                className="d-inline-block"
                style={{ width: "75px" }}
                name="quantity"
                id="addQuantity"
                placeholder={quantity}
                defaultValue={quantity}
                onChange={handleChange}
            />
        </>
    )
}