import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import UserProudctList from './UserProductList';
import {
    postCategory, postTag, addProduct, putProduct, postProduct, removeProduct,
    setProductPage, addSelectedImage, dispatchMultiImage, updateTagsState, postCart
} from '../../redux/ActionTypes';
import NotFoundPage from '../notFoundPage';
import DisplayProduct from './UserDispayProductComponent';


import { baseUrl } from '../../shared/baseUrl'
import { UncontrolledCarousel } from 'reactstrap';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';

import ProductForm from './ProductForm';
import BulkAddImage from '../image/BulkAddImageComponent';
import Paginate from '../Utility/Paginate';
import Image from '../image/ImageComponent';
import Category from '../category/CategoryComponent';
import Tag from '../TagComponent';
// import ImageCarousel from '../../components/image/ImageCarouselComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class UserProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.currentPage = 1;
    }

    toggleModal(id) {
        switch (id) {
            // case "toggleUploadOneModal":
            //     return this.setState({ isUploadOneModalOpen: !this.state.isUploadOneModalOpen })
            // case "isUploadMultiModalOpen":
            //     return this.setState({ isUploadMultiModalOpen: !this.state.isUploadMultiModalOpen })
            // case "toggleMainImageModal":
            //     return this.setState({ isMainImageModalOpen: !this.state.isMainImageModalOpen })
            // case "toggleMultiImageModal":
            //     return this.setState({ isMultiImageModalOpen: !this.state.isMultiImageModalOpen })
        }
    }

    isModalOpen(id) {
        switch (id) {
            // case "isUploadOneModalOpen":
            //     return this.state.isUploadOneModalOpen;
            // case "isUploadMultiModalOpen":
            //     return this.state.isUploadMultiModalOpen;
            // case "isMainModalOpen":
            //     return this.state.isMainImageModalOpen;
            // case "isMultiImageModalOpen":
            //     return this.state.isMultiImageModalOpen;
        }
    }
    componentDidMount() {
    }

    render() {
        const { products, match, postCart } = this.props;
        const SingleProduct = () => {
            const formatedProductName = match.params.productName.replace("-", " ");
            const currentProduct = products.items.find(product => product.name.toLowerCase() === formatedProductName.toLowerCase())
            if (currentProduct) {
                return (
                    <div>
                        <DisplayProduct
                            product={currentProduct}
                            postCart={postCart}
                        />
                    </div>)

            }
        }
        return (
            <div>
                <Switch location={this.props.location}>
                    <Route exact path='/products/all' component={() =>
                        <UserProudctList
                            items={products.items}
                            postCart={postCart}
                            match ={match}
                        />} />
                    <Route exact path='/product/:productName' component={SingleProduct} />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        images: state.Images,
        tags: state.Tags,
        categories: state.Categories,
        products: state.Products
    }
}
const mapDispatchToProps = (dispatch) => ({
    setProductPage: (page) => dispatch(setProductPage(page)),
    postCart: (values) => dispatch(postCart(values))
    // sendFlashMessage: (name, className) => dispatch(sendFlashMessage(name, className))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProduct)