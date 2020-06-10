import React, { useState } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Form, FormGroup, FormFeedback, Label, CustomInput, Input, FormText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Carousel, InputGroup } from 'reactstrap';

export const Subtotal = props => {
    const { cart } = props
    const Subtotal = "$" + (cart.items.reduce((x, y) => x + (y.product.price * y.quantity), 0)/100).toFixed(2);
    const cartLength = cart.items.length;
    
    return (
        <div>
            <span className="">Subtotal ({cartLength} {cartLength === 1 ? "item" : "items"}) </span>
            <span className="font-weight-bold">{Subtotal}</span>
        </div>
    )
}