import React from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';


import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
import { formReducer } from 'react-redux-form';

const BulkAddImage = props => (
    <LocalForm onSubmit={(values => props.handleUploadFilesSubmit(values))}>
        <FormGroup>
            <Label htmlFor="files">Upload Picture </Label>
            <input type="file" name="myFile" accept="image/*" onChange={props.uploadSelectedFiles} multiple />
        </FormGroup>

        {/* <FormGroup>
            <Control.checkbox model=".addToMultiple" value={"addToMultiple"} /><span className="mr-1 ml-1">{"Make image this product's main image?"}</span>
        </FormGroup> */}

        <FormGroup>
            <Button type="submit" color="primary">Submit</Button>
        </FormGroup>
    </LocalForm>
)
export default BulkAddImage