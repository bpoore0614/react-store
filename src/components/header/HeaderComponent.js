import React, { useState, Component } from 'react';
import { baseUrl } from '../../shared/baseUrl'
import { Control, LocalForm, Errors } from 'react-redux-form';
// import { postTag } from '../redux/ActionTypes';
import { Link } from 'react-router-dom';
// import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import FlashMessage from '../Utility/FlashMessage';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    FormGroup,
    InputGroup,
    Input,
    Label,
    Button,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { faSearch, faBars, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    sendFlashMessage,
    loginUser,
    logoutUser
} from '../../redux/ActionTypes';
import Login from '../user/LoginComponent';
import './index.css';
import { CartModal } from '../cart/CartModalComponent';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


const Header = (props) => {
    const { cart, location, auth, putCart, deleteCart } = props
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    // return (
    //     <div className="container-fluid">
    //         <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //             <a className="navbar-brand" href="#">
    // <img style={{ width: "230px" }} src={require('./images/Vintage-to-New-Logo.png')}></img>
    //                 import React, { useState } from 'react';


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="order-1 col-10 col-lg-4 d-flex justify-content-center align-items-center">
                    <div className="col-2" >
                        <FontAwesomeIcon className="align-middle d-lg-none mr-2" icon={faBars} size="lg" onClick={toggle} />
                    </div>
                    <div className="col-10 text-center text-lg-center" >
                        <Link className="" to="/products/all">
                            <img style={{ width: "85%" }} src={require('./images/Vintage-to-New-Logo.png')}></img>
                        </Link>
                    </div>
                </div>
                <div className="order-3 col-lg-4 d-flex justify-content-center align-items-center ">
                    <InputGroup className="">
                        <Input
                            type="search"
                            name="search"
                            id="exampleSearch"
                            placeholder="search placeholder"
                        />
                        <Button className="">
                            < FontAwesomeIcon className="d-inline" icon={faSearch} />
                        </Button>
                    </InputGroup>

                </div>
                <div className="order-2 order-lg-3 col-1 col-lg-4 d-flex justify-content-center align-items-center">
                    <div className="">
                        <CartModal cart={cart}
                        putCart={putCart}
                        deleteCart={deleteCart} />
                    </div>
                </div>
            </div>



            <div className={`d-none ${isOpen ? "d-block" : "d-none "}  d-lg-flex aqua-background rounded row align-items-center justify-content-center`} >
                {/* <Collapse isOpen={isOpen} > */}
                <ListGroupItem className={!auth.isAuthenticated && location.pathname === "/login" ? "d-none" : "aqua-background text-white"}>
                    <span className={auth.isAuthenticated ? "d-none" : ""}>
                        <Login />
                    </span>
                    <span className={!auth.isAuthenticated ? "d-none" : ""}>
                        <Link to={'/logout'}>
                            <Button outline >
                                <span className="fa fa-pencil fa-lg">Logout</span>
                            </Button>
                        </Link>
                    </span>

                </ListGroupItem>
                <ListGroupItem className="aqua-background"><NavLink className="text-white" href="#">Components</NavLink></ListGroupItem>
                <ListGroupItem className="aqua-background">
                    <NavLink className="text-white" href="#">Test</NavLink>
                </ListGroupItem>
                <UncontrolledDropdown className="align-middle">
                    <DropdownToggle outline className="text-white" caret>
                        Dropdown
                                    </DropdownToggle>
                    <DropdownMenu className="aqua-background">
                        {/* <DropdownItem header>Header</DropdownItem> */}
                        {/* <DropdownItem disabled>Action</DropdownItem> */}
                        <DropdownItem className="aqua-background text-white">
                            <span className="text-white">
                                Another Action
                            </span>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem className="aqua-background">
                            <span className="text-white">
                                Another Action
                            </span>
                        </DropdownItem>
                        <DropdownItem divider />
                    </DropdownMenu>
                </UncontrolledDropdown>
                {/* </Collapse> */}

            </div>

            <div>

                <FlashMessage />
            </div>
        </div >
    )

}


// </nav>








export default (Header);


