import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import { formReducer } from 'react-redux-form';
import './index.scss';

const ImageList = props => (
    <div className="container image-picker">
        <div className="row">
            {props.images.map((img, i) => (
                <div className="mr-1 ml-1 position-relative" key={img + "selectedCarousel" + i}>
                    <div className="bottom-r position-absolute">
                        <Link to={'/admin/images/' + img._id}>
                            <Button
                                className="image-hover bg-white text-dark mr-1">
                                <i className="fa fa-pencil" />
                            </Button>
                        </Link>
                        <Button onClick={() => props.removeImageHandler(img._id)}
                            className="image-hover bg-white text-danger">
                            <i className="fa fa-minus-circle" />
                        </Button>
                    </div>
                    <img className="border border-dark p-1 rounded" src={baseUrl + "/" + img.original} alt={"Product carousel image" + i + 1}></img>

                </div>
            ))
            }
        </div>
    </div>
)

export default ImageList