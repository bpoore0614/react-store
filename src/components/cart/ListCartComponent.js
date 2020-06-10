import React, { useState } from 'react';
import { baseUrl } from '../../shared/baseUrl'
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Form, FormGroup, FormFeedback, Label, CustomInput, Input, FormText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Carousel, InputGroup } from 'reactstrap';
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UpdateCart } from './UpdateCartComponent';
import { Link } from 'react-router-dom';

import './index.css'


export const ListCart = props => {
    const { toggle, cart, putCart, deleteCart } = props

    if (cart.items.length > 0) {
        return (
            <div className="">
                {cart.items.map(item => (
                    <div key={item.product._id + "cart list"} className="d-flex row border border-muted p-2">
                        <div className="w-100 p-1">
                            {item.product.name ?
                                <Link onClick={toggle} to={"/product/" + item.product.name.replace(" ", "-")}>{item.product.name}</Link>
                                :
                                ""
                            }
                        </div>
                        <div className="w-50 p-1">
                            <span className="font-weight-bold">Price Each: </span>
                            {"$" + (item.product.price / 100).toFixed(2)}
                            <div>
                                <span className="font-weight-bold ">Quantity: </span>
                                <UpdateCart
                                    putCart={putCart}
                                    product={item.product}
                                    quantity={item.quantity}
                                    deleteCart={deleteCart}
                                />
                                <div className="mt-2">
                                    <Button color="danger" onClick={() => deleteCart(item.product)}>
                                        <span>Delete <FontAwesomeIcon icon={faTimesCircle} size="lg" /></span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="w-50 p-1 d-flex justify-content-end">
                            <img className="w-75" src={baseUrl + "/" + item.product.mainImage.thumbnail} alt={item.product.mainImage.alt} />
                        </div>
                    </div>
                ))
                }
            </div>
        )
    } else {
        return (
            <div className="mx-auto col-md-6">
                Shopping cart is empty
            </div >
        )
    }

}