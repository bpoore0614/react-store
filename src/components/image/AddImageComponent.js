import React from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';


import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import { formReducer } from 'react-redux-form';

const AddImage = props => (
    <LocalForm onSubmit={(values => props.handleUploadFilesSubmit(values))}>
        <FormGroup>
            <Label htmlFor="title">Title </Label>
            <Control.text model=".title" name="title"
                placeholder="Title"
                defaultValue={props.images ? props.images.title : ''}
                className="form-control w-100"
            />
            <Errors
                className="text-danger"
                model=".title"
                show="touched"
                messages={{
                    required: 'Required ',
                    minLength: "Name must be at least 3 characters",
                    maxLength: "Name must be less than 15 characters"
                }}
            />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="caption">Caption </Label>
            <Control.text model=".caption" name="caption"
                placeholder="Caption"
                defaultValue={props.images ? props.images.captions : ''}
                className="form-control w-100"
            />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="alt">Alt </Label>
            <Control.text model=".alt" name="alt"
                placeholder="alt"
                defaultValue={props.images ? props.images.alt : ''}
                className="form-control w-100"
            />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="description">Description </Label>
            <Control.textarea model=".description" name="description"
                placeholder="Description"
                defaultValue={props.images ? props.images.description : ''}
                className="form-control w-100"
            />
        </FormGroup>
        <FormGroup>
            <Label htmlFor="files">Upload Picture </Label>
            <input type="file" name="myFile" accept="image/*" onChange={props.uploadSelectedFiles} multiple={props.isMultiple}/>
            {/* <input type="file" name="file" multiple onChange={props.uploadSelectedFiles}></input> */}
            {/* <input type="file" id="files" className="" onChange={(e) => props.handleAddImage(e.target.files)} /> */}
        </FormGroup>

        {/* {props.isMultiple ?
            <FormGroup>
                <Control.checkbox model=".addToMultiple" value={"addToMultiple"} /><span className="mr-1 ml-1">{"Include images in this product's carousel?"}</span>
            </FormGroup>
            :
            <FormGroup>
                <Control.checkbox model=".addToSingle" value={"addToSingle"} /><span className="mr-1 ml-1">{"Make image this product's main image?"}</span>
            </FormGroup>
        } */}
        <FormGroup>
            <Button type="submit" color="primary">Submit</Button>
        </FormGroup>
    </LocalForm>

)

export default AddImage