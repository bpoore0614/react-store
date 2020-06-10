import { createStore, combineReducers, applyMiddleware } from "redux";
// import { createForms } from 'react-redux-form';
// import { Dishes } from './dishes';
import tags from './tags';
import parents from './parents';
import categories from './categories';
import auth from './auth';
import reviews from './reviews';
import images from './images';
import cart from './cart';
import user from './user';
// import { Promotions } from './promotions';
// import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import flashMessage from "./alerts";
import jwtDecode from 'jwt-decode'
// import { routerMiddleware, push } from 'react-router-redux'

import { useHistory } from "react-router-dom";
import { logoutUser, refreshToken, receiveLogout } from './ActionTypes';
import products from "./product";
import { InitialFeedback } from '../components/product/ProductFormComponent';
// import { InitialFeedback } from './forms';

const rootReducer = combineReducers({
  Tags: tags,
  Parents: parents,
  Categories: categories,
  Products: products,
  Auth: auth,
  Reviews: reviews,
  FlashMessage: flashMessage,
  Images: images,
  Cart: cart,
  User: user

})

export default function ConfigureStore(preloadedState) {
  alert("run before action creator")
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger, refreshTokenMiddleware)
  )
}

const refreshTokenMiddleware = store => next => async action => {
  const { tokenRefreshTime, refreshExpiration, isAuthenticated } = store.getState().Auth;
// alert(JSON.stringify(action))
  // if (isAuthenticated && tokenRefreshTime && refreshExpiration
  //   && tokenRefreshTime < Date.now()
  //   && refreshExpiration > Date.now()) {
  //   const result = await store.dispatch(refreshToken());
  //   if (result) {
  //     next(action)
  //   } else {
  //     // alert(isAuthenticated)
      // alert("Your session has expired")
      // window.location.href = "/login";
  //     // store.dispatch(receiveLogout())
  //     // alert(JSON.stringify(action))
      
  //   }
  // } else next(action)
  next(action)

  //   // const token = localStorage.getItem('token')
  //   // if (token && jwtDecode(token).exp < Date.now() / 1000) {
  //   //   localStorage.removeItem('token');
  //   //   store.dispatch(logoutUser())
  //   //   next(action);
  //   // }
  //   // else if(token){
  //   //   store.dispatch(refreshToken())

  //   // }


};


// export const ConfigureStore = () => {
//     const store = createStore(
//         combineReducers({
//             // dishes: Dishes,
//             tags
//             // promotions: Promotions,
//             // leaders: Leaders,
//             // ...createForms({
//                 // feedback: InitialFeedback
//             // })
//         }),
//         applyMiddleware(thunk, logger)
//     );

//     return store;
// }
