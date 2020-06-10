import React, { useState } from 'react';
import LoginForm from '../user/LoginFormComponent';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

export const LoginModal = props => {

    const [isModalOpen, setModal] = useState(false)
    const { loginUser } = props
    const { handleSubmit } = props

    const toggleModal = () => {
        setModal(!isModalOpen)
    }
   
    return (
        <>
            <Button outline onClick={toggleModal}>
                <span className="fa fa-pencil fa-lg">Login</span>
            </Button >

            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                <ModalBody>
                    <LoginForm
                        loginUser={loginUser}
                        handleSubmit={handleSubmit}
                    />
                </ModalBody>
            </Modal>
        </>
    )

}