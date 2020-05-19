import React from 'react';
import { Button, Form, FormGroup, FormFeedback, Label, Input, FormText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Carousel } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
// import ImagePicker from 'react-image-picker';
import ImagePicker from '../image/ImagePickerComponent';
import Paginate from '../Utility/Paginate';

import { validate } from '../Utility/FromValidation';
import { formSubmitErrors } from '../Utility/FromValidation';
import { checkIfFormValid } from '../Utility/FromValidation';
import { formErrMess } from '../Utility/FromValidation';
import ImageComponent from '../image/ImageComponent';
import ImagePickerModal from '../image/ImagePickerModal';


class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagePage: 1,
            product: {
                isFormValid: false,
                name: {
                    value: '',
                    placeholder: 'Product Name',
                    valid: false,
                    validationRules: {
                        minLength: 4,
                        maxLength: 100,
                        isRequired: true
                    },
                    errMess: [],
                    touched: false
                },
                description: {
                    value: '',
                    placeholder: 'Product Description',
                    valid: false,
                    validationRules: {
                        minLength: 4,
                        maxLength: 255,
                        isRequired: true
                    },
                    errMess: [],
                    touched: false
                },
                price: {
                    value: '',
                    placeholder: 'Price',
                    valid: false,
                    validationRules: {
                        isDigit: true,
                        isRequired: true
                    },
                    errMess: [],
                    touched: false
                },
                mainImage: {
                    image: null,
                    valid: false,
                    errMess: ["At least one main image is required"],
                    touched: false
                },
                carouselImages: {
                    images: [],
                    valid: false,
                    errMess: ["At least one carousel image is required"],
                    touched: false,
                },
                featured: {
                    value: false,
                },
                categories: [],
                tags: [],
            },
            isMainImageModalOpen: false,

        };

        this.product = { ...this.state.product };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.onPickSingle = this.onPickSingle.bind(this);
        this.onPickMultiple = this.onPickMultiple.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.isModalOpen = this.isModalOpen.bind(this);
    }


    handleChange(event) {
        const validatedProduct = validate(event, this.product);
        this.setState({
            product: validatedProduct
        });
    }
    handleCheckbox(event) {
        const name = event.target.name;
        const value = event.target.value
        if (name === "tag_group[]") {
            this.product.tags = this.product.tags.includes(value) ? this.product.tags.filter(tag => tag !== value) : [...this.product.tags, value]
        } else if (name === "category_group[]") {
            this.product.categories = this.product.categories.includes(value) ? this.product.categories.filter(category => category !== value) : [...this.product.categories, value]

        }
        this.setState({
            product: this.product
        });

    }

    removeImageHandler(image, multiple = false) {
        if (multiple) {
            this.product.carouselImages.images = this.product.carouselImages.images.filter(img => img._id != image._id)
            if (this.product.carouselImages.images.length === 0) {
                this.product.carouselImages.valid = false;
                this.product.carouselImages.touched = true;
                this.product.carouselImages.errMess = "At least one carousel image is required"

            }
        } else {
            this.product.mainImage.image = null;
            this.product.mainImage.valid = false;
            this.product.mainImage.touched = true;
            this.product.mainImage.errMess = "At least one main image is required"
        }
        this.setState({ product: this.product })
    }

    componentDidMount() {
        if (this.props.product) {
            this.product.name.value = this.props.product.name;
            this.product.name.valid = true;

            this.product.description.value = this.props.product.description;
            this.product.description.valid = true;

            this.product.price.value = (this.props.product.price / 100).toFixed(2);
            this.product.price.valid = true;

            if (this.props.product.mainImage) {
                this.product.mainImage.image = this.props.product.mainImage;
                this.product.mainImage.image !== null ? this.product.mainImage.valid = true :this.product.mainImage.valid = false;
                
            }
            if (this.props.product.carouselImages) {
                this.product.carouselImages.images = this.props.product.carouselImages;
                this.product.carouselImages.images.length > 0 ?  this.product.carouselImages.valid = true : this.product.carouselImages.valid = false
               
            }
            this.product.featured.value = this.props.product.featured;
            this.product.categories = this.props.product.categories;
            this.product.tags = this.props.product.tags;
            this.product.isFormValid = true;
            this.setState({
                product: this.product
            })

        }
    }


    handleSubmit(event) {
        if (!checkIfFormValid(this.product)) {
            const errors = formSubmitErrors(this.product)
            this.setState({ product: errors })
        } else {
            if (this.props.product) {
                alert(this.product.price.value)
                this.props.putProduct(this.state.product, this.props.product._id)
                this.props.redirect()

            } else {
                this.props.postProduct(this.state.product)
                this.props.redirect()
            }
        }
    }


    onPickSingle(image) {
        this.product.mainImage.image = image[0];
        this.product.mainImage.valid = true;
        this.product.mainImage.errMess = [];
        this.setState({ product: this.product })
    }


    onPickMultiple(images) {
        this.product.carouselImages.images = [...this.product.carouselImages.images, ...images]
        this.product.carouselImages.valid = true;
        this.product.carouselImages.errMess = [];
        this.setState({ product: this.product })
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
    render() {
        alert(this.product.carouselImages.valid)
        return (

            <Form>
                <FormGroup>
                    <Label for="productName">Product Name:</Label>
                    <Input
                        type="text"
                        name="name"
                        id="productName"
                        placeholder={this.state.product.name.placeholder}
                        value={this.state.product.name.value}
                        valid={this.state.product.name.valid}
                        invalid={this.state.product.name.touched ? !this.state.product.name.valid : false}
                        onChange={this.handleChange}
                    />
                    {this.state.product.name.errMess.map((err, i) => <FormFeedback key={"nameError" + i}>{err}</FormFeedback>)}
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input type="checkbox"
                            name="featured"
                            value={!this.state.product.featured.value}
                            onChange={this.handleChange}
                        />{' '}
                            Featured item
                        </Label>
                </FormGroup>

                <FormGroup>
                    <Label for="productDescription">Description:</Label>
                    <Input type="textarea"
                        name="description"
                        id="productDescription"
                        placeholder={this.state.product.description.placeholder}
                        value={this.state.product.description.value}
                        valid={this.state.product.description.valid}
                        invalid={this.state.product.description.touched ? !this.state.product.description.valid : false}
                        onChange={this.handleChange}
                    />
                    {this.state.product.description.errMess.map((err, i) => <FormFeedback key={"descriptionError" + i}>{err}</FormFeedback>)}
                </FormGroup>

                <FormGroup>
                    <Label for="productPrice">Price:</Label>
                    <Input type="number"
                        name="price"
                        id="productPrice"
                        placeholder={this.state.product.price.placeholder}
                        value={this.state.product.price.value}
                        valid={this.state.product.price.valid}
                        invalid={this.state.product.price.touched ? !this.state.product.price.valid : false}
                        onChange={this.handleChange}
                    />
                    {this.state.product.price.errMess.map((err, i) => <FormFeedback key={"priceError" + i}>{err}</FormFeedback>)}
                </FormGroup>

                <div>
                    Tags:
                </div>
                {this.props.tags.map((tag) => (
                    <FormGroup check inline key={tag._id + "selectTag"}>
                        <Label check>
                            <Input type="checkbox"
                                name="tag_group[]"
                                checked={this.state.product.tags.includes(tag._id)}
                                value={tag._id}
                                onChange={this.handleCheckbox} />{' '}
                            {tag.name}
                        </Label>
                    </FormGroup>
                ))
                }

                <div>
                    Categories:
                </div>
                {this.props.categories.map((category) => (
                    <FormGroup check inline key={category._id + "selectCategory"}>
                        <Label check>
                            <Input type="checkbox"
                                name="category_group[]"
                                checked={this.state.product.categories.includes(category._id)}
                                value={category._id}
                                onChange={this.handleCheckbox} />{' '}
                            {category.name}
                        </Label>
                    </FormGroup>
                ))
                }

                <FormGroup>
                    <ImagePickerModal
                        imagePicker={true}
                        multiple={false}
                        onPickSingle={this.onPickSingle}
                        toggleModal={this.toggleModal}
                        isModalOpen={this.isModalOpen}
                        invalid = {this.state.product.mainImage.touched && this.state.product.mainImage.errMess.length > 0}
                    />
                    <div className="text-danger" style={{ fontSize: "12.8px" }}>
                        {this.state.product.mainImage.touched ? this.state.product.mainImage.errMess : ''}
                    </div>

                </FormGroup>

                <div className="row">
                    <div className="col-12">Selected Main Image: </div>
                    {this.state.product.mainImage && this.state.product.mainImage.image
                        ?
                        <div className="mr-1 ml-1 position-relative" key={"selectedCarousel"}>
                            <Button onClick={() => this.removeImageHandler(this.state.product.mainImage.image)}
                                className="bottom-r position-absolute text-danger">
                                <i className="fa fa-minus-circle" />
                            </Button>
                            <img className="border border-dark p-1 rounded image-hover" src={baseUrl + "/" + this.state.product.mainImage.image.original} alt={"Product main image"}></img>
                        </div>

                        : ""}
                </div>

                <ImagePickerModal
                    imagePicker={true}
                    multiple={true}
                    onPickMultiple={this.onPickMultiple}
                    toggleModal={this.toggleModal}
                    isModalOpen={this.isModalOpen}
                    invalid = {this.state.product.carouselImages.touched && this.state.product.carouselImages.errMess.length > 0}
                />
                <div className="text-danger" style={{ fontSize: "12.8px" }}>
                    {this.state.product.carouselImages.touched ? this.state.product.carouselImages.errMess : ''}
                </div>
                <div className="row">
                    <div className="col-12">Selected Carousel Images: </div>
                    {this.state.product.carouselImages
                        ?
                        this.state.product.carouselImages.images.map((img, i) => ((
                            <div className="mr-1 ml-1 position-relative" key={"selectedCarousel" + i}>
                                <Button onClick={() => this.removeImageHandler(img, true)}
                                    className="bottom-r position-absolute text-danger">
                                    <i className="fa fa-minus-circle" />
                                </Button>
                                <img className="border border-dark p-1 rounded image-hover" src={baseUrl + "/" + img.original} alt={"Product carousel image" + i + 1}></img>
                            </div>
                        )))
                        : ""
                    }
                </div>
                <Button color="primary" onClick={this.handleSubmit}> Submit </Button>

            </Form>
        );
    }
}
export default ProductForm