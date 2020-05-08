import * as ActionTypes from './ActionTypes';
import jwt_decode from 'jwt-decode';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = {
        isLoading: false,
        isAuthenticated: localStorage.getItem('token') ? true : false,
        isAdmin: localStorage.getItem('token') ? jwt_decode(localStorage.getItem('token')).admin : false,
        token: localStorage.getItem('token'),
        user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
        errMess: null
    },
     action
 ){
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return Object.assign({}, state, { isLoading: true, isAuthenticated: false, user: action.creds })
        case ActionTypes.LOGIN_SUCCESS:
            const token = jwt_decode(action.token);
            alert(token.admin)
            return Object.assign({}, state, { isLoading: false, isAuthenticated: true, errMess: '',  token: action.token })
        case ActionTypes.LOGIN_FAILURE:
            return Object.assign({}, state, { isLoading: false, isAuthenticated: false, errMess: action.message})
        case ActionTypes.LOGOUT_REQUEST:
            return Object.assign({}, state, { isLoading:true, isAuthenticated: true})
        case ActionTypes.LOGOUT_SUCCESS:
            return Object.assign({}, state, { isLoading: false, isAuthenticated: false, token: '', user: null})
        default:
            return state
    }
}