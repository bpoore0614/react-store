import * as ActionTypes from './ActionTypes';
import jwt_decode from 'jwt-decode';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function auth(state = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    isAdmin: false,
    refreshExpiration: null,
    tokenRefreshTime: null,
    token: null,
    errMess: null
},
    action
) {
    switch (action.type) {
        case ActionTypes.IS_ADMIN:
            return Object.assign({}, state, { isAdmin: action.payload })
        case ActionTypes.LOGIN_REQUEST:
            return Object.assign({}, state, { isLoading: true, isAuthenticated: false })
        case ActionTypes.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                user: action.payload.user,
                token: action.payload.token,
                isLoading: false,
                isAuthenticated: true,
                refreshExpiration: new Date(Date.now() + 604770000),
                tokenRefreshTime: new Date(Date.now() + 1800000)
                // tokenRefreshTime: new Date(Date.now() + 4000)
            })
        case ActionTypes.LOGIN_FAILURE:
            return Object.assign({}, state, { isLoading: false, isAuthenticated: false, errMess: action.message })
        case ActionTypes.LOGOUT_REQUEST:
            return Object.assign({}, state, { isLoading: true })
        case ActionTypes.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isLoading: false,
                isAuthenticated: false,
                refreshExpiration: null,
                tokenRefreshTime: null,
                user: null,
                token: null
            })
        default:
            return state
    }
}