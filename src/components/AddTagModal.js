import React from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Form, FormGroup, FormFeedback, Label, Input, FormText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Carousel } from 'reactstrap';
import TagForm from './TagFormComponent';

const AddCategoryModal = props => (
    <>
        <Button outline onClick={() => props.toggleModal("toggleAddTagModal")}>
            <span className="fa-lg"> Add New Tag</span>
        </Button >
        <Modal isOpen={props.isModalOpen("isAddTagModalOpen")} toggle={() => props.toggleModal("toggleAddTagModal")}
            className="modal-dialog-full-width" >
            <ModalHeader toggle={() => props.toggleModal("toggleAddTagModal")}>Add New Tag</ModalHeader>
            <ModalBody>
                <TagForm
                    tags={props.tags}
                    handleSubmit={props.handleSubmit} />
            </ModalBody>
        </Modal>
    </>
)
export default AddCategoryModal;
