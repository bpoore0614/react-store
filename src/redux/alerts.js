import {FLASH_MESSAGE} from '../redux/ActionTypes';

const initialState = {  
  message: null,
  className: null
}

export default function flashMessage(state = initialState, action){  
  switch(action.type){
    case FLASH_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};