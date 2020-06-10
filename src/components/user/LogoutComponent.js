// import React, { Component } from 'react';
// import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom';
// import {
//     logoutUser
// } from '../../redux/ActionTypes';


// const LogoutComponent = (props) => {

//     handleLogout() {
//         this.props.logoutUser()
//     }

//     render() {
//         const { auth, loginUser } = this.props
//         const { handleLogout, handleSubmit, toggleModal } = this

//         return (

//             <Switch location={this.props.location}>
//                 <Route exact path='/loginmodal' component={() =>
//                     <LoginModal
//                         auth={auth}
//                         handleLogout={handleLogout}
//                         handleSubmit={handleSubmit}
//                         loginUser={loginUser}
//                     />} />
//             </Switch>


//         )
//     }
// }

// const mapStateToProps = state => {
//     return {
//         auth: state.Auth
//     }
// }

// const mapDispatchToProps = (dispatch) => ({
//     loginUser: (creds) => dispatch(loginUser(creds))
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Login);


