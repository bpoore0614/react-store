import {FLASH_MESSAGE} from '../redux/ActionTypes';

const initialState = {  
  message: null,
  className: null
}

export default function flashMessage(state = initialState, action){  
  switch(action.type){
    case FLASH_MESSAGE:
            return Object.assign({}, state, { message: action.payload.message, className: action.payload.className})
    default:
      return state;
  }
};