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
// import { Promotions } from './promotions';
// import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import flashMessage from "./alerts";
import jwtDecode from 'jwt-decode'
// import { routerMiddleware, push } from 'react-router-redux'

import { useHistory } from "react-router-dom";
import {logoutUser} from './ActionTypes';
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
  Cart: cart

})

export default function ConfigureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger, checkTokenExpirationMiddleware)
  )
}

const checkTokenExpirationMiddleware = store => next => action => {
  const token = localStorage.getItem('token')
  if (token && jwtDecode(token).exp < Date.now() / 1000) {
    alert("Your session has expired")
    localStorage.removeItem('token');
    store.dispatch(logoutUser())
    next(action);
  }
  next(action);
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
