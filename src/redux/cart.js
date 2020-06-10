import * as ActionTypes from './ActionTypes';

export default function category(
    state = {
        isFetching: true,
        didInvalidate: false,
        errMess: null,
        items: [],
        quantity: 0
    },
    action
) {
    switch (action.type) {
        case ActionTypes.RECEIVE_CART:
            const qty = action.payload.map(item => item.quantity).reduce((x,y) => x+y,0)
            return Object.assign({}, state, { isFetching: false, errMess: null, items: action.payload, quantity: qty})
        // return {state, isLoading: false, errMess: null, tags: action.payload };
        case ActionTypes.INVALIDATE_CART:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case ActionTypes.REQUEST_CART:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        // case ActionTypes.RECEIVE_CART:
        //     return Object.assign({}, state, {
        //         isFetching: false,
        //         didInvalidate: false,
        //         items: action.categories,
        //         isLoading: false,
        //         lastUpdated: action.receivedAt
        //     })
        case ActionTypes.UPDATE_CART:
            // const newState = state.items.map((tag) => tag._id == action.payload._id ? action.payload : tag);
            // return Object.assign({}, state, { tags: newState })
            return null 
        default:
            return state
    }
}
