import React from 'react';
import { FormGroup, Button, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const withParent = props => (

    <FormGroup>
        <Label htmlFor="parent">Parent:</Label>
        <Control.select model=".parent" name="parent"
            className="form-control w-100">
            <option hidden>{props.category.parent ?  props.parents.find(parent => parent._id == props.category.parent).name : "Select Parent..."}</option>
            <option value="remove">None</option>
            {props.parents.map((category, i) => {
                if (category.name == props.category.name  || category.parent == props.category._id || category.name == 'root') 
                return                
                return (
                    <option key={category._id} value={category._id}>{category.name}</option>
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
            {props.categories.map((category) => {
                return (
                    <option key={category._id} value={category._id}>{category.name}</option>
                )
            })}
        </Control.select>
    </FormGroup>
)

const CategoryForm = props => (
    <LocalForm onSubmit={(values => props.handleSubmit(values))}>
        <FormGroup>
            <Label htmlFor="name">Name </Label>
            <Control.text model=".name" name="name"
                placeholder="Category name"
                defaultValue={props.category ? props.category.name : ''}
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

export default CategoryForm;

