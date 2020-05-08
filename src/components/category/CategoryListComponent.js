import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';


const CategoryList = (props) => (
    <div className="col-12 col-md-5 m-1" key="tags">
        <h4>Categories</h4>
        {props.categories.items.map((category) => {
            return (
                <div>
                    <div key={category._id} style={{ marginLeft: category.level * 20 + 'px' }}>
                        <p>{category.name}</p>
                        <div className="row">
                            <div className="col-6">
                                <Link to={`${props.match.path}/` + category._id}>
                                    <Button outline >
                                        <span className="fa fa-pencil fa-lg"></span>
                                    </Button >
                                </Link>
                                <Button onClick={(() => props.removeCategory(category._id))}
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

export default CategoryList