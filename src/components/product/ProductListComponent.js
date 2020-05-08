import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';


const ProductList = props => (
    <div className="col-12 col-md-5 m-1" key="tags">
        
        <h4>Products</h4>
        {props.products.items.map((product) => {
            if (product.name == 'root') {
                return
            }
            return (
                <div>
                    <div key={product._id + 'admin-list'} style={{ marginLeft: product.level * 20 + 'px' }}>
                        <p>{product.name}</p>
                        <div className="row">
                            <div className="col-6">
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
            )}
        )}
                </div>
)

export default ProductList