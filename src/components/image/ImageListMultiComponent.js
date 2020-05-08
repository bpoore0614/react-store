import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
    import { formReducer } from 'react-redux-form';
const ImageListMulti = props => (
    props.images.items.map((image, index) => (
        <ul key={image._id} className={props.images.selected.indexOf(image._id) == -1 ? "list-unstyled d-inline-block" : "border border-primary list-unstyled d-inline-block"}>
            <li><img id={image._id+"multi"} src={baseUrl + image.thumbnail} alt={image.alt} onMouseLeave={(()=>props.mouseLeave(image._id))}  onMouseOver={(()=>props.mouseOver(image._id))} onClick={(() => props.handleMultiSelect(image._id))} /></li>
            <li className="text-center">
                <Link to={"/images/" + image._id}>
                    <Button outline >
                        <span className="fa fa-pencil fa-lg"></span>
                    </Button >
                </Link>
                <Button onClick={(() => props.handleSubmit(image._id))}
                    className="btn text-white bg-danger">
                    <span className="txt-white">Delete</span>
                </Button>
            </li>
        </ul>
    )))

    export default ImageListMulti