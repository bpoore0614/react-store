import * as ActionTypes from './ActionTypes';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = {
        userCreated: false,
        errMess: null
    },
     action
 ){
    switch (action.type) {
        case ActionTypes.ADD_USER:
            return Object.assign({}, state, { errMess: null, userCreated: true })
        case ActionTypes.USER_CREATION_FAILURE:
            return Object.assign({}, state, { errMess: action.payload, userCreated: false })
        default:
            return state
    }
}