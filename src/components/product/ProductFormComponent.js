import React from 'react';
import { Row, Col, FormGroup, Button, Modal, ModalHeader, ModalBody, Label, Carousel } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import CategoryForm from '../category/CategoryFormComponent';
import NewCategory from '../category/NewCategoryComponent';
import NewTag from '../NewTagComponent'
import ImageListSingle from '../image/ImageListSingleComponent';
import { baseUrl } from '../../shared/baseUrl';
import ImagePicker from 'react-image-picker';
import AddImage from '../image/AddImageComponent';
import BulkAddImage from '../image/BulkAddImageComponent';

const required = (val) => val && val.length;
const minRating = (len) => (val) => val >= len;
const maxRating = (len) => (val) => val <= len;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


const ProductForm = props => (
    <>
    {props.product && props.tagsSet === false && props.tagsInForm === null ? props.setSelectedTags(props.product.tags) : ""}
    <LocalForm onSubmit={(values => props.handleProductSubmit(values))}>
        <FormGroup>
            <Label htmlFor="name">Product Name </Label>
            <Control.text model=".name" name="name"
                defaultValue={props.product ? props.product.name : ""}
                className="form-control w-100"
                validators={{ required, minLength: minLength(5), maxLength: maxLength(1000) }}
            />
            <Errors
                className="text-danger spanBlock"
                model=".name"
                show="touched"
                messages={{
                    required: "Required",
                    minLength: "Min length 5 characters",
                    maxLength: "Max length 1000 characters"
                }}
            />
        </FormGroup>

        <FormGroup className="form-check">
            <Label htmlFor="featured" className="form-check-label">
                <Control.checkbox className="form-check-input" model=".featured" name="featured"
                defaultValue={props.product ? props.product.featured : false} />
            Featured Product</Label>
        </FormGroup>

        <FormGroup>
            <Label htmlFor="description">Description </Label>
            <Control.textarea model=".description" name="description" rows="6"
                defaultValue={props.product ? props.product.description : ""}
                className="form-control w-100"
                validators={{ required, minLength: minLength(5), maxLength: maxLength(1000) }}
            />
            <Errors
                className="text-danger spanBlock"
                model=".description"
                show="touched"
                messages={{
                    required: "Required",
                    minLength: "Min length 5 characters",
                    maxLength: "Max length 1000 characters"
                }}
            />
        </FormGroup>

        <FormGroup>
            <Label htmlFor="price">Price </Label>
            <Control.text type="number" model=".price" name="price"
                defaultValue={props.product ? props.product.price : ""}
                className="form-control w-100"
                validators={{ required }}
            />
            <Errors
                className="text-danger spanBlock"
                model=".price"
                show="touched"
                messages={{
                    required: "Required",
                    minLength: "Min length 5 characters",
                    maxLength: "Max length 1000 characters"
                }}
            />
        </FormGroup>
        <div className="row">
            <div className="col-md-6 ">
                <div className="overflow-auto" style={{ maxHeight: "250" + 'px' }}>
                    <label className="d-block" htmlFor="tags">Tags:</label>
                    {props.tags.map(tag => (
                        <FormGroup key={tag._id + "label"} className="form-check">
                            <Label htmlFor="tags" className="">
                                <input type="checkbox" className="form-check-input" name={"tag"+tag._id} model={".tags[]"} 
                                value={tag._id}
                                defaultChecked={props.product && props.tagsSet ? props.tagsInForm.includes(tag._id) : false }
                                onChange ={() => props.selectedTags(tag._id)} />
                                {tag.name}</Label>
                        </FormGroup>
                    ))}
                </div>
                <FormGroup>
                    <NewTag
                        tags={props.tags}
                        postTag={props.postTag} />
                </FormGroup>
            </div>

            <div className="col-md-6">
                <div className="overflow-auto" style={{ maxHeight: "250" + 'px' }}>
                    <label className="d-block" htmlFor="categories">Categories:</label>
                    {props.categories.map(category => (
                        <FormGroup key={category._id + "label"} className="form-check ">
                            <Label htmlFor="categories" className="form-check-label">
                                <Control.checkbox className="form-check-input" model=".categories[]" value={category._id} />
                                {category.name}</Label>
                        </FormGroup>
                    ))}
                </div>

                <FormGroup>
                    <NewCategory
                        categories={props.categories}
                        postCategory={props.postCategory} />
                </FormGroup>
            </div>
        </div>

        <div>
            <div className="d-inline-block">
                <Button outline onClick={() => props.toggleModal("toggleMainImageModal")}>
                    <span className="fa-lg"> Select Main Image</span>
                </Button >
                <Modal isOpen={props.isModalOpen("isMainModalOpen")} toggle={() => props.toggleModal("toggleMainImageModal")} size="lg">
                    <ModalHeader toggle={() => props.toggleModal("toggleMainImageModal")}>Select Main Image</ModalHeader>
                    <ModalBody>
                        <ImagePicker
                            images={props.images.items.reverse().map((image, i) => ({ src: baseUrl + image.thumbnail, value: image._id }))}
                            onPick={props.onPickSingle}
                        />
                    </ModalBody>
                </Modal>
            </div>
            <div className="d-inline-block">
                <Button outline onClick={() => props.toggleModal("toggleUploadOneModal")}>
                    <span className="fa fa-plus fa-lg"> Add New Image</span>
                </Button >
                <Modal isOpen={props.isModalOpen("isUploadOneModalOpen")} toggle={() => props.toggleModal("toggleUploadOneModal")} size="lg">
                    <ModalHeader toggle={() => props.toggleModal("toggleUploadOneModal")}>Add New Image</ModalHeader>
                    <ModalBody>
                        <AddImage
                            handleUploadFilesSubmit={props.handleUploadFilesSubmit}
                            images={props.images}
                            isMultiple={false}
                            uploadSelectedFiles={props.uploadSelectedFiles}
                        />
                    </ModalBody>
                </Modal>
            </div>
        </div>
        <p>Selected Main Image:</p>
        {props.singleImage ? <img src={props.singleImage.src}></img> : ""}
        <div>
            <div className="d-inline-block">
                <Button outline onClick={() => props.toggleModal("toggleMultiImageModal")}>
                    <span className="fa-lg"> Select Carousel Images</span>
                </Button >
                <Modal isOpen={props.isModalOpen("isMultiImageModalOpen")} toggle={() => props.toggleModal("toggleMultiImageModal")} size="lg">
                    <ModalHeader toggle={() => props.toggleModal("toggleMultiImageModal")}>Select Carousel Images</ModalHeader>
                    <ModalBody>
                        <ImagePicker
                            images={props.images.items.reverse().map((image, i) => ({ src: baseUrl + image.thumbnail, value: image._id }))}
                            onPick={props.onPickMult}
                            multiple={true}
                        />
                    </ModalBody>
                </Modal>
            </div>

            <div className="d-inline-block">
                <Button outline onClick={() => props.toggleModal("isUploadMultiModalOpen")}>
                    <span className="fa fa-plus fa-lg"> Add Bulk Images</span>
                </Button >
                <Modal isOpen={props.isModalOpen("isUploadMultiModalOpen")} toggle={() => props.toggleModal("isUploadMultiModalOpen")} size="lg">
                    <ModalHeader toggle={() => props.toggleModal("isUploadMultiModalOpen")}>Add New Images</ModalHeader>
                    <ModalBody>
                        <BulkAddImage
                            handleUploadFilesSubmit={props.handleUploadFilesSubmit}
                            images={props.images}
                            uploadSelectedFiles={props.uploadSelectedFiles}
                        />
                    </ModalBody>
                </Modal>
            </div>
        </div>
        <p>Selected Carousel Images:</p>
        {props.multiImage.map(img => <img key={"carousel" + img.value} src={img.src}></img>)}

        <FormGroup>
            <Button type="submit" color="primary">Submit</Button>
        </FormGroup>
    </LocalForm >
    </>
)

export default ProductForm;

