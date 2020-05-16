import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {
    postCategory, postTag, addProduct, putProduct, postProduct, removeProduct,
    setProductPage, addSelectedImage, dispatchMultiImage, updateTagsState
} from '../../redux/ActionTypes';
import NotFoundPage from '../notFoundPage';


import { baseUrl } from '../../shared/baseUrl'
import { UncontrolledCarousel } from 'reactstrap';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
// import ProductForm from './ProductFormComponpent';
import ProductForm from './ProductForm';
import ImageCarousel from '../image/ImageCarouselComponent';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
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
            selected: [],
            isUploadOneModalOpen: false,
            isUploadMultiModalopen: false,
            isMultiImageModalOpen: false,
            isMainImageModalOpen: false,
            singleImage: null,
            multiImage: null,
            selectedImages: null,
            tagsInForm: null,
            categoriesInForm: [],
            tagsSet: false
        }
        this.currentPage = 1;
    }

    removeProduct(id) {
        this.props.removeProduct(id);
    }

    toggleModal(id) {
        switch (id) {
            case "toggleUploadOneModal":
                return this.setState({ isUploadOneModalOpen: !this.state.isUploadOneModalOpen })
            case "isUploadMultiModalOpen":
                return this.setState({ isUploadMultiModalOpen: !this.state.isUploadMultiModalOpen })
            case "toggleMainImageModal":
                return this.setState({ isMainImageModalOpen: !this.state.isMainImageModalOpen })
            case "toggleMultiImageModal":
                return this.setState({ isMultiImageModalOpen: !this.state.isMultiImageModalOpen })
        }
    }

    isModalOpen(id) {
        switch (id) {
            case "isUploadOneModalOpen":
                return this.state.isUploadOneModalOpen;
            case "isUploadMultiModalOpen":
                return this.state.isUploadMultiModalOpen;
            case "isMainModalOpen":
                return this.state.isMainImageModalOpen;
            case "isMultiImageModalOpen":
                return this.state.isMultiImageModalOpen;
        }
    }
    componentDidMount() {
    }

    render() {
        const { products, match } = this.props;

        if (!this.props.products.isFetching && !this.props.tags.isFetching && !this.props.categories.isFetching
            && !this.props.images.isFetching) {
            const formatedProductName = match.params.productName.replace("-", " ");
            const currentProduct = products.items.find(product => product.name === formatedProductName)
            if (currentProduct) {
                return (
                    <div>
                        {currentProduct.name}
                    </div>
                )
            } else {
                return (
                    <div className="col-12 col-md-6">
                        <ImageCarousel
                            product={products.items.find(product => product.name === "review item")}
                        />
                    </div>
                    // <Route path="*" component={NotFoundPage} />
                )
            }


        } else {
            return (
                <div>LOADING</div>
            )
        }
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
    setProductPage: (page) => dispatch(setProductPage(page))
    // sendFlashMessage: (name, className) => dispatch(sendFlashMessage(name, className))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProduct)