import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {
    fetchTags, fetchCategories, fetchProducts, fetchImages, postCategory, postTag, addProduct, putProduct, postImage, postProduct,
    setProductPage, addSelectedImage, dispatchMultiImage, updateTagsState
} from '../../redux/ActionTypes';
import { baseUrl } from '../../shared/baseUrl'
import { UncontrolledCarousel } from 'reactstrap';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
// import ProductForm from './ProductFormComponent';
import ProductForm from './ProductForm';
import ProductList from './ProductListComponent';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import AddImage from '../image/AddImageComponent';
import Paginate from '../Utility/Paginate';

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
            selectedImages: [],
            tagsInForm: null,
            categoriesInForm: [],
            tagsSet: false
            // currentPage: 1
            // category: null

        }
        this.currentPage = 1;
    }

    removeProduct(product_id) {
        alert("remove " + product_id);
    }

    async onPickSingle(image) {
        this.setState({ singleImage: image });
        await this.props.addSelectedImage(image);
        // alert(this.props.images.selected)
    }
    async onPickMult(image) {
        this.setState({ multiImage: image })
        await this.props.dispatchMultiImage(image);
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
    
    redirect(){
        this.props.history.push('/admin/products');
    }

    handleProductSubmit(values) {
        let tags;
        if (this.state.tagsInForm != null) {
            tags = this.state.tagsInForm.map(tag => tag);
        }
        this.props.postProduct(values, this.state.singleImage, this.state.multiImage, tags);

    }

    async handleUploadFilesSubmit(values) {
        await this.props.postImage(this.state.selectedImages, values)
        this.setState({ isUploadOneModalOpen: false })
        this.setState({ isUploadMultiModalOpen: false })

    }

    setSelectedTags(val) {
        this.setState({
            tagsInForm: val,
            tagsSet: true
        })

    }

    selectedTags(id, product = null) {
        let newTagArray;
        if (this.state.tagsInForm !== null) {
            if (this.state.tagsInForm.includes(id)) {
                newTagArray = this.state.tagsInForm.filter(tag => tag != id)
            } else {
                newTagArray = [...this.state.tagsInForm, id];
            }
            this.setState(
                { tagsInForm: newTagArray }
            )
        } else {
            this.setState(
                {
                    tagsInForm: [id],
                    tagsSet: true
                }
            )
        }
    }

    uploadSelectedFiles(event) {
        if (event.target.files) {
            this.setState({
                selectedImages: event.target.files
            });
            // } else {
            //     this.setState({
            //         selectedImages: []
            //     });
        }
    };

    selectPage(page) {
        this.props.setProductPage(page)
    }

    showProductForm() {
        // alert("show")
        this.setState(
            { showProductForm: true })
    }

    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchTags();
        this.props.fetchCategories();
        this.props.fetchImages();

    }

    render() {
        // todo image need isfetching and err
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
                // <ProductForm
                //     tagsSet={this.state.tagsSet}
                //     tagsInForm={this.state.tagsInForm}
                //     setSelectedTags={this.setSelectedTags.bind(this)}
                    // product={this.props.products.items.filter(product => product._id == match.params.productId)[0]}
                //     selectedTags={this.selectedTags.bind(this)}
                // tags={this.props.tags.items}
                //     postCategory={this.props.postCategory}
                //     postTag={this.props.postTag}
                // categories={this.props.categories.items}
                //     handleProductSubmit={this.handleProductSubmit.bind(this)}
                //     images={this.props.images}
                //     onPickSingle={this.onPickSingle.bind(this)}
                //     onPickMult={this.onPickMult.bind(this)}
                //     singleImage={this.props.images.singleImage}
                //     multiImage={this.props.images.multiImage}
                //     handleUploadFilesSubmit={this.handleUploadFilesSubmit.bind(this)}
                //     uploadSelectedFiles={this.uploadSelectedFiles.bind(this)}
                //     toggleModal={this.toggleModal.bind(this)}
                //     isModalOpen={this.isModalOpen.bind(this)}
                // />
            )
        };
        if (this.props.tags.isFetching || this.props.products.isFetching || this.props.categories.isFetching) {
            return (
                <div>Loading</div>
            )
        }

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

                    <Button onClick={this.showProductForm.bind(this)}>Add New Product</Button>
                    <div style={{ display: (this.state.showProductForm || this.props.addProduct) ? 'block' : 'none' }}>
                        <ProductForm
                            images={this.props.images}
                            tags={this.props.tags.items}
                            categories={this.props.categories.items}
                            postProduct={this.props.postProduct}
                            redirect = {this.redirect.bind(this)}
                        />
                        {/* <ProductForm
                            // category={this.state.category}
                            selectedTags={this.selectedTags.bind(this)}
                            tags={this.props.tags.items}
                            postCategory={this.props.postCategory}
                            postTag={this.props.postTag}
                            categories={this.props.categories.items}
                            handleProductSubmit={this.handleProductSubmit.bind(this)}
                            images={this.props.images}
                            onPickSingle={this.onPickSingle.bind(this)}
                            onPickMult={this.onPickMult.bind(this)}
                            singleImage={this.props.images.singleImage}
                            multiImage={this.props.images.multiImage}
                            handleUploadFilesSubmit={this.handleUploadFilesSubmit.bind(this)}
                            uploadSelectedFiles={this.uploadSelectedFiles.bind(this)}
                            toggleModal={this.toggleModal.bind(this)}
                            isModalOpen={this.isModalOpen.bind(this)}
                        /> */}
                    </div>
                    <div>
                        <Paginate
                            totalRecords={350}
                            pageLimit={25}
                            // currentPage = {3}
                            currentPage={this.props.products.page}
                            selectPage={this.selectPage.bind(this)} />
                    </div>
                </div >
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
    // alert(JSON.stringify(state.Products.page))
    return {
        images: state.Images,
        tags: state.Tags,
        categories: state.Categories,
        products: state.Products
    }
}
const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () => dispatch(fetchProducts()),
    updateTagsState: () => dispatch(updateTagsState()),
    fetchTags: () => dispatch(fetchTags()),
    fetchCategories: () => dispatch(fetchCategories()),
    postCategory: (name, parent) => dispatch(postCategory(name, parent)),
    postTag: (name, parent) => dispatch(postTag(name, parent)),
    // postProduct: () => dispatch(postProduct())
    fetchImages: () => dispatch(fetchImages()),
    addSelectedImage: (img) => dispatch(addSelectedImage(img)),
    dispatchMultiImage: (img) => dispatch(dispatchMultiImage(img)),
    postImage: (img, values) => dispatch(postImage(img, values)),
    postProduct: (values) => dispatch(postProduct(values)),
    putProduct: (values, id) => dispatch(putProduct(values, id)),
    setProductPage: (page) => dispatch(setProductPage(page))
    // sendFlashMessage: (name, className) => dispatch(sendFlashMessage(name, className))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product)