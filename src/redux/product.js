import * as ActionTypes from './ActionTypes';

export default function products(
    state = {
        isFetching: true,
        errMess: null,
        fetchFailed: false,
        items: [],
        page: 1,
        seletedTags: []
    },
    action
) {
    switch (action.type) {
        case ActionTypes.UPDATE_SELECTED_TAGS:
            return Object.assign({}, state, {
                selectedTags: action.payload
            })
        case ActionTypes.CHANGE_PAGE:
            return Object.assign({}, state, {
                page: action.payload
            })
        case ActionTypes.ADD_PRODUCT:
            var products = action.payload;
            return Object.assign({}, state, { isFetching: false, errMess: null, items: state.items.concat(products) })
        // return {state, isLoading: false, errMess: null, tags: action.payload };
        case ActionTypes.PRODUCTS_FAILED:
            return Object.assign({}, state, {
                fetchFailed: true,
                errMess: action.errMess
            })
        case ActionTypes.REQUEST_PRODUCTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case ActionTypes.RECEIVE_PRODUCTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.products,
                isLoading: false,
                lastUpdated: action.receivedAt
            })
        case ActionTypes.UPDATE_PRODUCT:
            alert(JSON.stringify(action.payload))
            const newState = state.items.filter((product) => product._id != action.payload._id);
            
            return Object.assign({}, state, { items: [...newState, action.payload] })
        default:
            return state
    }
}