import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ReviewStars } from '../review/ReviewStarsComponent';
import { AddToCart } from '../cart/AddToCartComponent';
import { baseUrl } from '../../shared/baseUrl';

const ProductList = props => {
    const formattedLink = (link) => (
        (link).replace(" ", "-")
    )
    return (
        <div className="row">
            {props.items.map((product, i) => {
                return (
                    <div key={product._id + "userList"} className="col-6 col-md-4 col-lg-2 pt-4 border border-muted">
                        <div className="row d-flex flex-column align-items-center">
                            <div className="">
                                <Link to={"/product/" + formattedLink(product.name)}>
                                    <img src={product.mainImage !== null ? baseUrl + "/" + product.mainImage.original : ""}
                                        alt={product.alt}
                                    />
                                </Link>
                            </div>
                            <div>
                                <Link to={"/product/" + formattedLink(product.name)}>{product.name}</Link>
                            </div>
                            <div>
                                {"$" + (product.price / 100).toFixed(2)}
                            </div>
                            <div>
                                <ReviewStars
                                    reviews={product.reviews} />
                            </div>
                            <div>
                                <AddToCart />
                            </div>
                        </div>
                    </div>


                )
            }
            )}
        </div >
    )
}

export default ProductList