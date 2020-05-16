import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import {ReviewStars} from '../review/ReviewStarsComponent';
import { baseUrl } from '../../shared/baseUrl';


const ProductList = props => (
    <div className="row" key="tags">
        {props.products.items.map((product, i) => {
            return (
                <div className="col-6 col-md-4 col-lg-2">
                    <div className="row d-flex flex-column align-items-center">
                        <div className="">
                            <img src={product.mainImage !== null ? baseUrl + "/" + product.mainImage.thumbnail : ""}
                                alt={product.alt}
                            />
                        </div>
                        <div>
                            {product.name}
                        </div>
                        <div>
                            {"$" + (product.price / 100).toFixed(2)}
                        </div>
                        <div>
                            <ReviewStars
                                reviews={product.reviews} />
                        </div>
                        <div>
                            <div>
                                <Link to={`${props.match.path}/` + product._id}>
                                    <Button outline >
                                        <span className="fa fa-pencil fa-lg"></span>
                                    </Button >
                                </Link>
                                <Button onClick={(() => props.removeProduct(product._id))}
                                    className="btn text-white bg-danger">
                                    <span className="txt-white">Delete</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>


            )
        }
        )}
    </div >
)

export default ProductList