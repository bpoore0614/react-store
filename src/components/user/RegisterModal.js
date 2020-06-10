import React, { useState } from 'react';
import LoginForm from '../user/LoginFormComponent';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import SignupForm from './SignUpForm';

export const RegisterModal = props => {

    const [isModalOpen, setModal] = useState(false)
    const { user, handleChange, handleSubmit } = props

    const toggleModal = () => {
        setModal(!isModalOpen)
    }

    return (
        <>
            <Button outline onClick={toggleModal}>
                <span className="fa fa-pencil fa-lg">Register</span>
            </Button >

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Register</ModalHeader>
                <ModalBody>
                    <SignupForm
                        user={user}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </ModalBody>
            </Modal>
        </>
    )

}