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
import { baseUrl } from '../../shared/baseUrl'
import { UncontrolledCarousel } from 'reactstrap';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
// import ProductForm from './ProductFormComponpent';
import ProductForm from './ProductForm';
import ProductList from './ProductListComponent';
// import ImagePicker from 'react-image-picker'
// import 'react-image-picker/dist/index.css'
import BulkAddImage from '../image/BulkAddImageComponent';
import Paginate from '../Utility/Paginate';
import Image from '../image/ImageComponent';
import Category from '../category/CategoryComponent';
import Tag from '../TagComponent';
import ImageCarousel from '../../components/image/ImageCarouselComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class Product extends Component {
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

    redirect() {
        this.props.history.push('/admin/products');
    }

    showProductForm() {
        this.setState(
            { showProductForm: true })
    }

    componentDidMount() {
    }

    render() {
        const ProductWithId = ({ match }) => {
            return (
                <ProductForm
                    images={this.props.images}
                    tags={this.props.tags.items}
                    categories={this.props.categories.items}
                    postProduct={this.props.postProduct}
                    product={this.props.products.items.filter(product => product._id == match.params.productId)[0]}
                    putProduct={this.props.putProduct}
                    redirect={this.redirect.bind(this)}
                />
            )
        };
        // if (this.props.tags.isFetching || this.props.products.isFetching || this.props.categories.isFetching) {
        //     return (
        //         <div>Loading</div>
        //     )
        // }

        if (this.props.tags.errMess || this.props.products.errMess || this.props.categories.errMess) {
            // todo list all err
            return (<div>{this.props.tags.errMess}, {this.props.products.errMess}, {this.props.categories.errMess}</div>)
        }

        if (this.props.tags.items && this.props.products.items && this.props.categories.items
            && this.props.images.items && this.props.match.isExact) {
            return (
                <div className="container">
                    <ProductList {...(this.props)}
                        removeProduct={this.removeProduct.bind(this)}
                    />
                    <Link to={`${this.props.match.path}/add`}></Link>
                    <Link className="Button" to={"/add"} >Add New Product</Link>


                    {/* <div>
                        <Paginate
                            totalRecords={350}
                            pageLimit={25}
                            currentPage={this.props.products.page}
                        />
                    </div> */}
                </div >
            )
        }
        if (this.props.location.pathname === this.props.match.path + '/add') {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-lg-8">
                            <ProductForm
                                tags={this.props.tags.items}
                                categories={this.props.categories.items}
                                postProduct={this.props.postProduct}
                                redirect={this.redirect.bind(this)}
                            />
                        </div>
                        <div className="col-xs-12 col-lg-4">
                            <Image addImage={true} />
                            <Category addCategory={true} />
                            <Tag addTag={true} />
                        </div>
                    </div>
                </div >
            )
        }

        if (!this.props.products.isFetching && window.location.pathname === "/product/carousel") {
            return (
                <ImageCarousel
                    items={this.props.products.items[0].carouselImages.map(img => (
                        {
                            src: baseUrl + "/" + img.original,
                            altText: img.alt,
                            caption: img.caption
                        }
                    ))}
                />
            )
        }
        else {
            return (
                <div className="container">
                    <Route path={`${this.props.match.path}/:productId`} component={ProductWithId} />
                </div>
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
    updateTagsState: () => dispatch(updateTagsState()),
    postCategory: (name, parent) => dispatch(postCategory(name, parent)),
    postTag: (name, parent) => dispatch(postTag(name, parent)),
    postProduct: (values) => dispatch(postProduct(values)),
    putProduct: (values, id) => dispatch(putProduct(values, id)),
    removeProduct: (id) => dispatch(removeProduct(id)),
    setProductPage: (page) => dispatch(setProductPage(page))
    // sendFlashMessage: (name, className) => dispatch(sendFlashMessage(name, className))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)