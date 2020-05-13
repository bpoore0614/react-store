import React from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Form, FormGroup, FormFeedback, Label, Input, FormText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Carousel } from 'reactstrap';
import AddImage from "./AddImageComponent";

const AddImageModal = props => (
    <>
        <Button outline onClick={() => props.toggleModal("toggleAddImageModal")}>
            <span className="fa-lg"> Add New Image</span>
        </Button >
        <Modal isOpen={props.isModalOpen("isAddImageModalOpen")} toggle={() => props.toggleModal("toggleAddImageModal")}
            className="modal-dialog-full-width" >
            <ModalHeader toggle={() => props.toggleModal("toggleAddImageModal")}>Select Main Image</ModalHeader>
            <ModalBody>
                <AddImage
                    image={props.image}
                    handleChange={props.handleChange}
                    handleUploadFilesSubmit={props.handleUploadFilesSubmit}
                    handleOnChangeUploadFiles={props.handleOnChangeUploadFiles}
                />
            </ModalBody>
        </Modal>
    </>
)
export default AddImageModal;
