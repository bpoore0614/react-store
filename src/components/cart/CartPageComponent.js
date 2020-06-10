import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListCart } from './ListCartComponent';
import { Subtotal } from './SubtotalComponent';
import './index.css'

export const CartPage = props => {
    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);
    const { cart, putCart, deleteCart } = props;

    return (
        <>
            <div className="">
                <div className="mx-auto col-md-6">
                    <ListCart
                        cart={cart}
                        putCart={putCart}
                        deleteCart={deleteCart} />
                    <Subtotal cart={cart} />
                </div>
            </div>
        </>
    )
}