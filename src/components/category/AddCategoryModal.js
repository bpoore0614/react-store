import React from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Form, FormGroup, FormFeedback, Label, Input, FormText, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Carousel } from 'reactstrap';
import CategoryForm from './CategoryFormComponent';

const AddCategoryModal = props => (
    <>
    {alert("mad it")}
        <Button outline onClick={() => props.toggleModal("toggleAddCategoryModal")}>
            <span className="fa-lg"> Add New Category</span>
        </Button >
        <Modal isOpen={props.isModalOpen("isAddCategoryModalOpen")} toggle={() => props.toggleModal("toggleAddCategoryModal")}
            className="modal-dialog-full-width" >
            <ModalHeader toggle={() => props.toggleModal("toggleAddCategoryModal")}>Add New Category</ModalHeader>
            <ModalBody>
                <CategoryForm
                    categories={props.categories}
                    handleSubmit={props.handleSubmit} />
            </ModalBody>
        </Modal>
    </>
)
export default AddCategoryModal;
