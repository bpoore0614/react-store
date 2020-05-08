import React from 'react';
import { Row, Col, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import NewTag from './NewTagComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const withParent = props => (
    <FormGroup>)
        <Label htmlFor="parent">Parent:</Label>
        <Control.select model=".parent" name="parent"
            className="form-control w-100">
                
            <option hidden>{props.tag.parent ?  props.parents.find(parent => parent._id == props.tag.parent).name : "Select Parent..."}</option>
            <option value="remove">None</option>
            {props.parents.map((tag, i) => {
                if (tag.name == props.tag.name  || tag.parent == props.tag._id || tag.name == 'root') 
                return                
                return (
                    <option key={tag._id+"tagform"} value={tag._id}>{tag.name}</option>
                )

            })}
        </Control.select>
    </FormGroup>
)

const newTag = props => (
    <FormGroup>
        <Label htmlFor="parent">Parent:</Label>
        <Control.select model=".parent" name="parent"
            className="form-control w-100">
            <option value="select" hidden>-Select Parent Category-</option>
            {props.tags.map((tag) => {
                return (
                    <option key={tag._id} value={tag._id}>{tag.name}</option>
                )
            })}
        </Control.select>
    </FormGroup>
)

const TagForm = props => (
    <LocalForm onSubmit={(values => props.handleSubmit(values))}>
        <FormGroup>
            <Label htmlFor="name">Name </Label>
            <Control.text model=".name" name="name"
                placeholder="Tag name"
                defaultValue={props.tag ? props.tag.name : ''}
                className="form-control w-100"
                validators={{
                    required, minLength: minLength(3), maxLength: maxLength(15)
                }}
            />
            <Errors
                className="text-danger"
                model=".name"
                show="touched"
                messages={{
                    required: 'Required ',
                    minLength: "Name must be at least 3 characters",
                    maxLength: "Name must be less than 15 characters"
                }}
            />
        </FormGroup>

        {props.parents ? withParent(props) : newTag(props)}

       

        <FormGroup>
            <Button type="submit" color="primary">Submit</Button>
        </FormGroup>
    </LocalForm>
)

export default TagForm;

