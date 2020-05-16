import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, FormGroup, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import ImageComponent from './ImageComponent';


const ImagePickerModal = props => (
    <div className="d-inline-block">
        <Button outline onClick={() => props.toggleModal(props.multiple ? "toggleMultiImageModal" : "toggleMainImageModal")}>
            <span className="fa-lg">{props.multiple ? "Select Carousel Images" : "Select Main Image"}</span>
        </Button >
        <Modal isOpen={props.isModalOpen(props.multiple ? "isMultiImageModalOpen" : "isMainModalOpen")} toggle={() => props.toggleModal(props.multiple ? "toggleMultiImageModal" : "toggleMainImageModal")}
            className="modal-dialog-full-width" >
            <ModalHeader toggle={() => props.toggleModal(props.multiple ? "toggleMultiImageModal" : "toggleMainImageModal")}>{props.multiple ? "Select Carousel Images" : "Select Main Image"}</ModalHeader>
            <ModalBody>
                <ImageComponent
                    imagePicker={true}
                    multiple={props.multiple}
                    onPickSingle={props.onPickSingle}
                    onPickMultiple={props.onPickMultiple}
                    toggleModal={props.toggleModal}
                />
            </ModalBody>
        </Modal>
    </div>
)

export default ImagePickerModal;
