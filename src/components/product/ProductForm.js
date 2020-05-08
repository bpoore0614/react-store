import React from 'react';
import { Button, Form, FormGroup, FormFeedback, Label, Input, FormText, Row, Col, Modal, ModalHeader, ModalBody, Carousel } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import ImagePicker from 'react-image-picker';
import { validate } from '../Utility/FromValidation';
import { formErrMess } from '../Utility/FromValidation';

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormValid: false,
            product: {
                name: {
                    value: '',
                    placeholder: 'Produt Name',
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
                    value: null,
                    src: null
                },
                carouselImages: {
                    values: [],
                    sources: []
                },
                featured: {
                    value: false,
                },
                categories: [],
                tags: [],
            },
            isMainImageModalOpen: false,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const product = { ...this.state.product }
        product[name].value = value;
        product[name].touched = true;

        const validatedProduct = validate(value, product[name].validationRules, name);

        product[name].valid = validatedProduct.valid

        if (!product[name].valid) {
            product[name].errMess = validatedProduct.errMess
        } else {
            product[name].errMess = []
        }

        this.setState({
            product: product
        });

        let formValid = true;
        for (let productItem in product) {
            if (product[productItem].valid === false) {
                formValid = false;
                break;
            }
        }
        this.setState({ isFormValid: formValid })
    }
    handleCheckbox(event) {
        const name = event.target.name;
        const value = event.target.value
        const product = { ...this.state.product }
        if (name === "tag_group[]") {
            product.tags = product.tags.includes(value) ? product.tags.filter(tag => tag !== value) : [...product.tags, value]
        } else if (name === "category_group[]") {
            product.categories = product.categories.includes(value) ? product.categories.filter(category => category !== value) : [...product.categories, value]

        }
        this.setState({
            product: product
        });

    }

    removeImageHandler(id) {
        const product = { ...this.state.product };
        const index = product.carouselImages.values.findIndex(value => value === id);
        alert(JSON.stringify(product.carouselImages.values))
        product.carouselImages.values = product.carouselImages.values = product.carouselImages.values.filter((val, i) => i !== index)
        product.carouselImages.sources = product.carouselImages.sources.filter((src, i) => i !== index)
        this.setState({
            product: product
        })
    }

    componentDidMount() {
        if (this.props.product) {
            const product = { ...this.state.product }
            product.name.value = this.props.product.name;
            product.name.valid = true;

            product.description.value = this.props.product.description;
            product.description.valid = true;

            product.price.value = this.props.product.price;
            product.price.valid = true;

            if (this.props.product.mainImage) {
                product.mainImage.value = this.props.product.mainImage._id;
                product.mainImage.src = baseUrl + "/" + this.props.product.mainImage.thumbnail
            }
            if (this.props.product.carouselImages) {
                product.carouselImages.sources = this.props.product.carouselImages.map(img => baseUrl + "/" + img.thumbnail)
                product.carouselImages.values = this.props.product.carouselImages.map(img => img._id)
            }
            product.featured.value = this.props.product.featured;
            product.categories = this.props.product.categories;
            product.tags = this.props.product.tags;
            this.setState({
                isFormValid: true,
                product: product
            })
            // alert(JSON.stringify(this.props.product.carouselImages))
        }
    }


    handleSubmit(event) {
        // this.props.history.push("/admin/products")
        if (!this.state.isFormValid) {
            const product = { ...this.state.product }
            for (let productItem in product) {
                if (product[productItem].errMess && product[productItem].errMess.length < 1) {
                    product[productItem].touched = true;
                    product[productItem].errMess = ["Required"]
                }
            }
            this.setState({ product: product })
        } else {
            if (this.props.product) {
                this.props.putProduct(this.state.product, this.props.product._id)
                this.props.redirect()

            } else {
                this.props.postProduct(this.state.product)
            }
        }
    }


    onPickSingle(image) {
        var product = { ...this.state.product }
        product.mainImage.value = image.value;
        product.mainImage.src = image.src;
        this.setState({ product: product })
    }

    onPickMultiple(images) {
        alert(JSON.stringify(images))
        var product = { ...this.state.product };
        product.carouselImages.values = [{...product.carouselImages.values}, {...images.values}] 

        this.setState({ product: product })
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
                        invalid={this.state.product.name.touched ? !this.state.product.name.valid : ""}
                        onChange={this.handleChange}
                    />
                    {this.state.product.name.errMess.map(err => <FormFeedback>{err}</FormFeedback>)}
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
                        invalid={this.state.product.description.touched ? !this.state.product.description.valid : ""}
                        onChange={this.handleChange}
                    />
                    {this.state.product.description.errMess.map(err => <FormFeedback>{err}</FormFeedback>)}
                </FormGroup>

                <FormGroup>
                    <Label for="productPrice">Price:</Label>
                    <Input type="number"
                        name="price"
                        id="productPrice"
                        placeholder={this.state.product.price.placeholder}
                        value={this.state.product.price.value}
                        valid={this.state.product.price.valid}
                        invalid={this.state.product.price.touched ? !this.state.product.price.valid : ""}
                        onChange={this.handleChange}
                    />
                    {this.state.product.price.errMess.map(err => <FormFeedback>{err}</FormFeedback>)}
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
                    <div className="d-inline-block">
                        <Button outline onClick={() => this.toggleModal("toggleMainImageModal")}>
                            <span className="fa-lg"> Select Main Image</span>
                        </Button >
                        <Modal isOpen={this.isModalOpen("isMainModalOpen")} toggle={() => this.toggleModal("toggleMainImageModal")} size="lg">
                            <ModalHeader toggle={() => this.toggleModal("toggleMainImageModal")}>Select Main Image</ModalHeader>
                            <ModalBody>
                                <ImagePicker
                                    images={this.props.images.items.reverse().map((image, i) => ({ src: baseUrl + "/" + image.thumbnail, value: image._id }))}
                                    onPick={this.onPickSingle.bind(this)}
                                />
                            </ModalBody>
                        </Modal>
                    </div>
                </FormGroup>

                <div className="row">
                    <div className="col-12">Selected Main Image: </div>
                    {this.state.product.mainImage && this.state.product.mainImage.src
                        ?
                        <div className="col-xs-4 col-sm-4 col-md-3 col-lg-2 position-relative ">
                            <Button onClick={() => this.removeImageHandler(this.state.product.mainImage.value)} className="bottom-r mr-3 position-absolute text-danger fa fa-minus-circle fa-3x"></Button>
                            <img className="w-100" src={this.state.product.mainImage.src} alt="Product main image"></img>
                        </div>

                        : ""}
                </div>

                <div className="d-inline-block">
                    <Button outline onClick={() => this.toggleModal("toggleMultiImageModal")}>
                        <span className="fa-lg"> Select Carousel Images</span>
                    </Button >
                    <Modal isOpen={this.isModalOpen("isMultiImageModalOpen")} toggle={() => this.toggleModal("toggleMultiImageModal")} size="lg">
                        <ModalHeader toggle={() => this.toggleModal("toggleMultiImageModal")}>Select Carousel Images</ModalHeader>
                        <ModalBody>
                            <ImagePicker
                                images={this.props.images.items.reverse().map((image, i) => ({ src: baseUrl + "/" + image.thumbnail, value: image._id }))}
                                onPick={this.onPickMultiple.bind(this)}
                                multiple={true}
                            />
                        </ModalBody>
                    </Modal>
                </div>


                <div className="row">
                    <div className="col-12">Selected Carousel Images: </div>
                    {this.state.product.carouselImages
                        ?
                        this.state.product.carouselImages.sources.map((src, i) => (
                            <div className="col-xs-4 col-md-3 col-lg-2 position-relative w-100 ">
                                <Button onClick={() => this.removeImageHandler(this.state.product.carouselImages.values[i])}
                                    className="bottom-r mr-3 position-absolute text-danger">
                                    <i className="fa fa-minus-circle fa-2x" />
                                </Button>
                                <img className="w-100" src={src} alt={"Product carousel image" + i + 1}></img>
                            </div>
                        ))
                        : ""
                    }
                </div>
                <Button color="primary" onClick={this.handleSubmit}> Submit </Button>

            </Form>
        );
    }
}
export default ProductForm