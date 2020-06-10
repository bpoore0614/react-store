import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListCart } from './ListCartComponent';
import { Subtotal } from './SubtotalComponent';
import './index.css'

export const CartModal = props => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { cart, putCart, deleteCart } = props;

    return (
        <>
            <Button outline className="" onMouseDown={toggle}>
                {cart.quantity}
                <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            </Button >

            <Modal isOpen={isOpen} toggle={() => toggle()}
                className="position-absolute green top-r h-100 green"
                scrollable

            >
                <ModalHeader className="green" toggle={() => toggle()}>Cart</ModalHeader>
                <ModalBody className="green" >
                    <ListCart
                        toggle={toggle}
                        cart={cart}
                        putCart={putCart}
                        deleteCart={deleteCart}
                    />
                </ModalBody>
                <ModalFooter className="green">
                    <Subtotal cart={cart} />
                    <Button className="pink-background">Another Test</Button>
                </ModalFooter>
            </Modal>

        </>
    )
}