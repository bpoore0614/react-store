import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import { formReducer } from 'react-redux-form';
const ImageList = props => (
    <>
        {alert("made it")}
        {props.images.map((image, index) => (
            <ul key={image._id} >
                <li><img id={image._id + "single"} src={baseUrl + "/" + image.thumbnail} /></li>
                <li className="text-center">
                    <Link to={"/images/" + image._id}>
                        <Button outline >
                            <span className="fa fa-pencil fa-lg"></span>
                        </Button >
                    </Link>
                    <Button
                        className="btn text-white bg-danger">
                        <span className="txt-white">Delete</span>
                    </Button>
                </li>
            </ul>
        ))}
    </>
)

export default ImageList