import React, { Component } from 'react';
import _ from "lodash"
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { addSelectedImage, removeImage, postImages, putImage } from '../../redux/ActionTypes';
import AddBulkImages from "./BulkAddImageComponent";
import AddImageModal from "./AddImageModal";
import AddImage from "./AddImageComponent";
import ImagePicker from "./ImagePickerComponent";
import Paginate from "../Utility/Paginate";
import { baseUrl } from '../../shared/baseUrl'
import { UncontrolledCarousel } from 'reactstrap';
import { findDOMNode } from 'react-dom';
import { validate } from '../Utility/FromValidation';
import { formSubmitErrors } from '../Utility/FromValidation';
import { checkIfFormValid } from '../Utility/FromValidation';
import $ from 'jquery';
import ImageList from './ImageListComponent';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {
                isFormValid: false,
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
                selectedImages: {
                    value: null,
                    valid: false,
                    errMess: [],
                    touched: false,
                    validationRules: {
                        isObject: true
                    },
                },
            },
            imageId: null,
            editFlag: false,
            isAddImageModalOpen: false,
            imagePickerOpen: false,
            currentPage: 3,
            pageLimit: 25
        };
        this.image = { ...this.state.image };
        this.initialState = _.cloneDeep({ ...this.state })
        this.isModalOpen = this.isModalOpen.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.removeImageHandler = this.removeImageHandler.bind(this);
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

    removeImageHandler(id) {
        this.props.removeImage(id);
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
        const image = { ...this.state.image }
        if (checkIfFormValid(this.image) == true) {
            if (this.state.imageId) {
                await this.props.putImage({ ...this.state.image }, this.state.imageId);
                this.setState(this.initialState);
                this.props.history.push('/admin/images/all');
            } else {
                this.toggleModal("toggleAddImageModal");
                await this.props.postImages({ ...this.state.image }, this.image.selectedImages.value)
                this.setState(this.initialState);
            }
        } else {
            const errors = formSubmitErrors(image);
            this.setState({ image: errors });
        }
    }


    handleOnChangeUploadFiles(event) {
        let formData = new FormData();
        for (let x of event.target.files) {
            formData.append('myFile', x);
        }
        this.image.selectedImages.value = formData;

        const handleEvent = {
            target: {
                name: "selectedImages",
                value: formData
            }
        }
        this.handleChange(handleEvent);
    }

    render() {
        const AddImageRoute = () => {
            return (
                <AddImageModal
                    image={{ ...this.state.image }}
                    handleChange={this.handleChange.bind(this)}
                    handleUploadFilesSubmit={this.handleUploadFilesSubmit.bind(this)}
                    handleOnChangeUploadFiles={this.handleOnChangeUploadFiles.bind(this)}
                    isModalOpen={this.isModalOpen}
                    toggleModal={this.toggleModal}
                />
            )
        }


        // if (this.props.images.items && !this.props.images.isFetching) {
        //     this.sliceImagesForPagination()
        // })

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
                    isModalOpen={this.isModalOpen}
                    toggleModal={this.toggleModal}
                />

            )
        }

        if (window.location.pathname === "/admin/images/add-image") {
            return (
                <AddImage
                    image={{ ...this.state.image }}
                    handleChange={this.handleChange.bind(this)}
                    handleUploadFilesSubmit={this.handleUploadFilesSubmit.bind(this)}
                    handleOnChangeUploadFiles={this.handleOnChangeUploadFiles.bind(this)}
                />
            )
        }

        if (window.location.pathname === "/admin/images/all") {
            return (
                <div className="">
                    <ImageList
                        images={this.props.images.items}
                        removeImageHandler={this.removeImageHandler}
                        handleChange={this.handleChange.bind(this)}
                        handleUploadFilesSubmit={this.handleUploadFilesSubmit.bind(this)}
                        handleOnChangeUploadFiles={this.handleOnChangeUploadFiles.bind(this)}
                    />

                    <AddImageModal
                        image={{ ...this.state.image }}
                        handleChange={this.handleChange.bind(this)}
                        handleUploadFilesSubmit={this.handleUploadFilesSubmit.bind(this)}
                        handleOnChangeUploadFiles={this.handleOnChangeUploadFiles.bind(this)}
                        isModalOpen={this.isModalOpen}
                        toggleModal={this.toggleModal}
                    />
                </div>
            )
        }


        if (window.location.pathname === "/admin/images" || window.location.pathname === "/admin/images/") {
            return <div>Image comp</div>
        }

        if (!this.props.images.isFetching && this.props.match.params && this.props.match.params.imageId) {

            const selectedImage = this.props.images.items.find(img => img._id === this.props.match.params.imageId)
            const image = { ...this.state.image }
            if (selectedImage) {
                if (!this.state.editFlag) {
                    image.title.value = selectedImage.title;
                    image.title.valid = true;
                    image.selectedImages.valid = true;
                    image.alt.value = selectedImage.alt;
                    image.description.value = selectedImage.description;
                    image.description.valid = true;
                    image.caption.value = selectedImage.caption;
                    this.setState({
                        image: image,
                        imageId: selectedImage._id,
                        editFlag: true
                    })
                }
                return (
                    <AddImage
                        image={{ ...this.state.image }}
                        isEdit={true}
                        handleChange={this.handleChange.bind(this)}
                        handleUploadFilesSubmit={this.handleUploadFilesSubmit.bind(this)}
                        handleOnChangeUploadFiles={this.handleOnChangeUploadFiles.bind(this)}
                    />)
            } else {
                return ("Image ID not found")
            }
        }
        return (
            <div></div >
        )
    }
}


const mapStateToProps = state => {
    return {
        images: state.Images
    }
}

const mapDispatchToProps = (dispatch) => ({
    putImage: (values, id) => dispatch(putImage(values, id)),
    postImages: (values, formData) => dispatch(postImages(values, formData)),
    addSelectedImage: (image) => dispatch(addSelectedImage(image)),
    removeImage: (id) => dispatch(removeImage(id))
    // sendFlashMessage: (name, className) => dispatch(sendFlashMessage(name, className))
})

export default connect(mapStateToProps, mapDispatchToProps)(Image)