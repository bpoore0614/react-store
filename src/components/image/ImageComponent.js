import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { fetchImages, addSelectedImage, removeSelectedImage } from '../../redux/ActionTypes';
import { baseUrl } from '../../shared/baseUrl'
import { UncontrolledCarousel } from 'reactstrap';
import { findDOMNode } from 'react-dom';
// import ImageListMulti from './ImageListMultiComponentiComponent';
import $ from 'jquery';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class Image extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
        this.removeCategory = this.removeCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    removeCategory(id) {
        // const children = this.props.categories.filter((category) => category.parent == id)
        // 	.map((children) => children.name)
        // 	.join(", ")
        // if (children.length != 0) {
        // 	alert("Cannot delete tag due to having the following children: \n" + children)
        // } else {
        // 	this.props.removeCategory(id)
        // }
    }
    componentDidMount() {
        this.props.fetchImages();
    }
    async handleSubmit(id) {
        const index = this.props.images.selected.indexOf(id);
        if (index == -1) {
            await this.props.addSelectedImage(id)
            $("#" + id).css("height", "175").css("width", "175");
        } else {
            await this.props.removeSelectedImage(id);
            $("#" + id).css("height", "").css("width", "");
        }
    }
    mouseOver(id) {
        $("#" + id).css("height", "200").css("width", "200");
    }

    mouseLeave(id) {
        $("#" + id).css("height", "").css("width", "");
    }

    render() {
        // if (this.props.listStyle == "single") {
        //     return (
        //         <div className="d-inline" >
        //             <ImageListSingle
        //                 mouseLeave={this.mouseLeave}
        //                 mouseOver={this.mouseOver}
        //                 handleSubmit={this.handleSubmit}
        //                 images={this.props.images}
        //             />
        //         </div>
        //     )
        // } else if ((this.props.listStyle == "multi")) {
        //     return (
        //         <div className="d-inline" >
        //             <ImageListMultiple
        //                 mouseLeave={this.mouseLeave}
        //                 mouseOver={this.mouseOver}
        //                 handleSubmit={this.handleSubmit}
        //                 images={this.props.images}
        //             />
        //         </div>
        //     )
        // }
        // else {
            return (
                <div></div>
            )
        // }
    }
}


const mapStateToProps = state => {
    return {
        images: state.Images
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchImages: () => dispatch(fetchImages()),
    addSelectedImage: (image) => dispatch(addSelectedImage(image)),
    removeSelectedImage: (image) => dispatch(removeSelectedImage(image))


    // postReview: (val) => dispatch(postReview(val)),
    // removeReview: (id) => dispatch(removeReview(id)),
    // sendFlashMessage: (name, className) => dispatch(sendFlashMessage(name, className))
})

export default connect(mapStateToProps, mapDispatchToProps)(Image)