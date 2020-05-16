import React from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Form, FormGroup, FormFeedback, Label, CustomInput, Input, FormText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Carousel } from 'reactstrap';

import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import { formReducer } from 'react-redux-form';

const AddImage = props => (

    <LocalForm onSubmit={() => props.handleUploadFilesSubmit()}>
        <FormGroup>
            <Label for="imageTitle">Title:</Label>
            <Input
                type="text"
                name="title"
                id="imageTitle"
                placeholder={props.image.title.placeholder}
                value={props.image.title.value}
                valid={props.image.title.valid}
                invalid={props.image.title.touched ? !props.image.title.valid : false}
                onChange={props.handleChange}
            />
            {props.image.title.errMess.map((err, i) => <FormFeedback key={"titleError" + i}>{err}</FormFeedback>)}
        </FormGroup>
        <FormGroup>
            <Label for="imageCaption">Caption:</Label>
            <Input
                type="text"
                name="caption"
                id="imageCaption"
                placeholder={props.image.caption.placeholder}
                value={props.image.caption.value}
                valid={props.image.caption.valid}
                invalid={props.image.caption.touched ? !props.image.caption.valid : false}
                onChange={props.handleChange}
            />
            {props.image.caption.errMess.map((err, i) => <FormFeedback key={"captionError" + i}>{err}</FormFeedback>)}
        </FormGroup>
        <FormGroup>
            <Label for="imageAlt">Alt:</Label>
            <Input
                type="text"
                name="alt"
                id="imageAlt"
                placeholder={props.image.alt.placeholder}
                value={props.image.alt.value}
                valid={props.image.alt.valid}
                invalid={props.image.alt.touched ? !props.image.alt.valid : false}
                onChange={props.handleChange}
            />
            {props.image.alt.errMess.map((err, i) => <FormFeedback key={"altError" + i}>{err}</FormFeedback>)}
        </FormGroup>
        <FormGroup>
            <Label for="imageDescription">Description:</Label>
            <Input
                type="text"
                name="description"
                id="imageDescription"
                placeholder={props.image.description.placeholder}
                value={props.image.description.value}
                valid={props.image.description.valid}
                invalid={props.image.description.touched ? !props.image.description.valid : false}
                onChange={props.handleChange}
            />
            {props.image.description.errMess.map((err, i) => <FormFeedback key={"descriptionError" + i}>{err}</FormFeedback>)}
        </FormGroup>

        <FormGroup className={props.isEdit ? "d-none" : ""}>
            <Label htmlFor="files">Upload Picture: </Label>
            <CustomInput type="file"
                name="myFile"
                id="myFiles"
                accept="image/*"
                onChange={props.handleOnChangeUploadFiles}
                valid={props.image.selectedImages.valid}
                invalid={props.image.selectedImages.touched ? !props.image.selectedImages.valid : false}
            />
            {props.image.selectedImages.errMess.map((err, i) => <FormFeedback key={"fileError" + i}>{err}</FormFeedback>)}

        </FormGroup>

        <FormGroup>
            <Button type="submit" color="primary">Submit</Button>
        </FormGroup>

    </LocalForm>
    // <LocalForm onSubmit={(values => props.handleUploadFilesSubmit(values))}>
    //     <FormGroup>
    //         <Label htmlFor="title">Title </Label>
    //         <Control.text model=".title" name="title"
    //             placeholder="Title"
    //             defaultValue={props.images ? props.images.title : ''}
    //             className="form-control w-100"
    //         />
    //         <Errors
    //             className="text-danger"
    //             model=".title"
    //             show="touched"
    //             messages={{
    //                 required: 'Required ',
    //                 minLength: "Name must be at least 3 characters",
    //                 maxLength: "Name must be less than 15 characters"
    //             }}
    //         />
    //     </FormGroup>
    //     <FormGroup>
    //         <Label htmlFor="caption">Caption </Label>
    //         <Control.text model=".caption" name="caption"
    //             placeholder="Caption"
    //             defaultValue={props.images ? props.images.captions : ''}
    //             className="form-control w-100"
    //         />
    //     </FormGroup>
    //     <FormGroup>
    //         <Label htmlFor="alt">Alt </Label>
    //         <Control.text model=".alt" name="alt"
    //             placeholder="alt"
    //             defaultValue={props.images ? props.images.alt : ''}
    //             className="form-control w-100"
    //         />
    //     </FormGroup>
    //     <FormGroup>
    //         <Label htmlFor="description">Description </Label>
    //         <Control.textarea model=".description" name="description"
    //             placeholder="Description"
    //             defaultValue={props.images ? props.images.description : ''}
    //             className="form-control w-100"
    //         />
    //     </FormGroup>
    // <FormGroup>
    //     <Label htmlFor="files">Upload Picture </Label>
    //     <input type="file" name="myFile" accept="image/*" onChange={props.handleOnChangeUploadFiles} multiple={props.isMultiple} />
    //     {/* <input type="file" name="file" multiple onChange={props.uploadSelectedFiles}></input> */}
    //     {/* <input type="file" id="files" className="" onChange={(e) => props.handleAddImage(e.target.files)} /> */}
    // </FormGroup>

    //     {/* {props.isMultiple ?
    //         <FormGroup>
    //             <Control.checkbox model=".addToMultiple" value={"addToMultiple"} /><span className="mr-1 ml-1">{"Include images in this product's carousel?"}</span>
    //         </FormGroup>
    //         :
    //         <FormGroup>
    //             <Control.checkbox model=".addToSingle" value={"addToSingle"} /><span className="mr-1 ml-1">{"Make image this product's main image?"}</span>
    //         </FormGroup>
    //     } */}
    //     <FormGroup>
    //         <Button type="submit" color="primary">Submit</Button>
    //     </FormGroup>
    // </LocalForm>

)

export default AddImage