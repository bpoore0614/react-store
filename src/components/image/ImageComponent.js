import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { addSelectedImage, removeSelectedImage, postImages } from '../../redux/ActionTypes';
import ListItem from "./ImageListSingleComponent";
import AddBulkImages from "./BulkAddImageComponent";
import AddImageModal from "./AddImageModal";
import AddImage from "./AddImageComponent";
import ImagePicker from "./ImagePickerComponent";
import Paginate from "../Utility/Paginate";
import { baseUrl } from '../../shared/baseUrl'
import { UncontrolledCarousel } from 'reactstrap';
import { findDOMNode } from 'react-dom';
import { validate } from '../Utility/FromValidation';
// import ImageListMulti from './ImageListMultiComponentiComponent';
import $ from 'jquery';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {
                title: {
                    value: '',
                    placeholder: 'Image Title',
                    valid: false,
                    validationRules: {
                        minLength: 4,
                        maxLength: 100,
                        isRequired: true
                    },
                    errMess: [],
                    touched: false
                },
                caption: {
                    value: '',
                    placeholder: 'Image Caption',
                    valid: true,
                    touched: false,
                    errMess: []
                },
                alt: {
                    value: '',
                    placeholder: 'Image Caption',
                    valid: true,
                    touched: false,
                    errMess: []
                },
                description: {
                    value: '',
                    placeholder: 'Image Description',
                    valid: false,
                    validationRules: {
                        minLength: 4,
                        maxLength: 255,
                        isRequired: true
                    },
                    errMess: [],
                    touched: false
                },
            },
            selectedImages: null,
            isAddImageModalOpen: false,
            imagePickerOpen: false,
            currentPage: 3,
            pageLimit: 25
        };
        this.isModalOpen = this.isModalOpen.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        // this.removeCategory = this.removeCategory.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
    }

    toggleModal(modal) {
        switch (modal) {
            case "toggleAddImageModal":
                return this.setState({ isAddImageModalOpen: !this.state.isAddImageModalOpen });
        }
    }

    isModalOpen(modal) {
        switch (modal) {
            case "isAddImageModalOpen":
                return this.state.isAddImageModalOpen;
        }
    }
    handleChange(event) {
        const image = { ...this.state.image }
        const validatedImage = validate(event, image);
        this.setState({
            image: validatedImage
        });
    }

    selectPage(page) {
        this.setState({ currentPage: page })
    }

    sliceImagesForPagination() {
        const currentPage = this.state.currentPage;
        const pageLimit = this.state.pageLimit;
        const end = ((currentPage - 1) * pageLimit) + pageLimit;
        const start = ((currentPage - 1) * pageLimit) > 0 ? ((currentPage - 1) * pageLimit) : 0;
        return (this.props.images.items.slice(start, end).map((image, i) => ({ src: baseUrl + "/" + image.thumbnail, value: image._id })))
    }

    async handleUploadFilesSubmit(values) {
        // alert(JSON.stringify({...this.state.image}) + "value")
        await this.props.postImages({ ...this.state.image }, this.state.selectedImages)
        // this.setState({ isUploadOneModalOpen: false })
        // this.setState({ isUploadMultiModalOpen: false })
    }

    handleOnChangeUploadFiles(event) {
        let formData = new FormData();
        for (let x of event.target.files) {
            formData.append('myFile', x);
        }
        this.setState({
            selectedImages: formData
        })
    }

    render() {
        const AddImageRoute = () => {
            return (
                <AddImageModal
                    image={{ ...this.state.image }}
                    handleChange={this.handleChange.bind(this)}
                    handleUploadFilesSubmit={this.handleUploadFilesSubmit.bind(this)}
                    handleOnChangeUploadFiles={this.handleOnChangeUploadFiles.bind(this)}
                    isModalOpen = {this.isModalOpen}
                    toggleModal = {this.toggleModal}
                />
            )
        }

        // if (this.props.images.items && !this.props.images.isFetching) {
        //     this.sliceImagesForPagination()
        // })
        if (this.props.images.items && this.props.listImages) {
            return (
                <ListItem
                    images={this.props.images.items} />
            )
        }

        if (this.props.images.items && this.props.addBulkImages) {
            return (
                <AddBulkImages
                    handleUploadFilesSubmit={() => this.handleUploadFilesSubmit()}
                    images={this.props.images.items}
                    handleOnChangeUploadFiles={this.handleOnChangeUploadFiles.bind(this)} />
            )
        }

        if (this.props.images.items && !this.props.images.isFetching && this.props.imagePicker) {
            return (
                <>
                    <ImagePicker
                        images={this.props.images.items}
                        multiple={this.props.multiple}
                        toggleModal={this.props.toggleModal}
                        onPick={this.props.multiple ? this.props.onPickMultiple : this.props.onPickSingle}
                    />
                    {/* <Paginate
                        totalRecords={this.props.images.items.length}
                        pageLimit={this.state.pageLimit}
                        currentPage={this.state.currentPage}
                        selectPage={this.selectPage.bind(this)} />
                    /> */}
                </>
            )
        }

        if (this.props.addImage) {
            return (
                <AddImageModal
                    image={{ ...this.state.image }}
                    handleChange={this.handleChange.bind(this)}
                    handleUploadFilesSubmit={this.handleUploadFilesSubmit.bind(this)}
                    handleOnChangeUploadFiles={this.handleOnChangeUploadFiles.bind(this)}
                    isModalOpen = {this.isModalOpen}
                    toggleModal = {this.toggleModal}
                />

            )
        }

        if (window.location.pathname == "/admin/images/add-image"){
            return (
                <AddImage
                    image={{ ...this.state.image }}
                    handleChange={this.handleChange.bind(this)}
                    handleUploadFilesSubmit={this.handleUploadFilesSubmit.bind(this)}
                    handleOnChangeUploadFiles={this.handleOnChangeUploadFiles.bind(this)}
                />
            )
        }

        return (
            <div></div>
        )
    }
}


const mapStateToProps = state => {
    return {
        images: state.Images
    }
}

const mapDispatchToProps = (dispatch) => ({
    postImages: (values, formData) => dispatch(postImages(values, formData)),
    addSelectedImage: (image) => dispatch(addSelectedImage(image)),
    removeSelectedImage: (image) => dispatch(removeSelectedImage(image))
    // sendFlashMessage: (name, className) => dispatch(sendFlashMessage(name, className))
})

export default connect(mapStateToProps, mapDispatchToProps)(Image)