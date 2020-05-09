import React from 'react';
import { Button, Form, FormGroup, FormFeedback, Label, Input, FormText, Row, Col, Modal, ModalHeader, ModalBody, Carousel } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { baseUrl } from '../../shared/baseUrl';
// import ImagePicker from 'react-image-picker';
import { validate } from '../Utility/FromValidation';
import { formErrMess } from '../Utility/FromValidation';
import './index.scss';

import { Map } from 'immutable';

class ImagePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picked: Map()
        }

        this.handleChange = this.handleChange.bind(this);
        this.isSelected = this.isSelected.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    ImageStyle(width, height) {
        return {
            width,
            height,
            objectFit: "cover"
        }
    }


    handleChange(image) {

        let pickedImages = this.props.multiple ? this.state.picked : this.state.picked.clear();
        pickedImages = pickedImages.has(image._id) ? pickedImages.delete(image._id) : pickedImages.set(image._id, image)
        this.setState({ picked: pickedImages });
    }

    isSelected(image) {
        return this.state.picked.has(image._id)
    }

    formatPicked() {
        this.props.multiple ? this.props.toggelModal("toggleMultiImageModal") : this.props.toggelModal("toggleMainImageModal")
        return this.state.picked.toIndexedSeq().toArray()
    }

    render() {
        return (
            <div className="container image-picker">
                <div className="row">
                    {/* .map((image, i) => ({ src: baseUrl + "/" + image.thumbnail, value: image._id }))} */}
                    {this.props.images.map((image, i) => (
                        // <div className={`responsive${isSelected ? " selected" : ""}`}
                        <div className="mr-1 ml-1 position-relative"
                            key={i + "imagePicker"}
                            onClick={() => this.handleChange(image)}>
                            <img className={`border border-dark p-1 rounded image-hover ${this.isSelected(image) ? "selected" : ""}`}
                                src={baseUrl + "/" + image.thumbnail}
                                // className={`thumbnail${isSelected ? " selected" : ""}`}
                                style={this.ImageStyle(150, 150)}
                            />
                            <div className={`${this.isSelected(image) ? "checked" : "d-none"}`}>
                                {/*<img src={imgCheck} style={{ width: 75, height: 75, objectFit: "cover" }}/>*/}
                                <div className="icon" />
                            </div>
                        </div>

                    ))}
                </div>
                <div>
                    <Button onClick={() => this.props.onPick(this.formatPicked())}>Submit</Button>
                </div>
            </div>
        )
    }
}


export default ImagePicker;