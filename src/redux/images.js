import * as ActionTypes from './ActionTypes';

export default function images(
    state = {
        singleImage: null,
        multiImage: [],
        isFetching: true,
        errMess: null,
        fetchFailed: false,
        selected: [],
        items: [],


    },
    action
) {
    switch (action.type) {
        case ActionTypes.ADD_IMAGE:
            return Object.assign({}, state, { isFetching: false, errMess: null, items: state.items.concat(action.payload) })
        case ActionTypes.SINGLE_IMAGE:
            return Object.assign({}, state, {
                singleImage: action.payload
            })
        case ActionTypes.MULTI_IMAGE:
            return Object.assign({}, state, {
                multiImage: action.payload
            })
        case ActionTypes.REMOVE_SELECTED_IMAGE:
            const newSelectedState = state.selected.filter((id) => id !== action.payload);
            return Object.assign({}, state, { selected: newSelectedState })
        // case ActionTypes.ADD_IMAGE:
        //     var images = action.payload;
        //     return Object.assign({}, state, { isFetching: false, errMess: null, items: state.items.concat(images) })
        // return {state, isLoading: false, errMess: null, tags: action.payload };
        case ActionTypes.IMAGES_FAILED:
            return Object.assign({}, state, {
                fetchFailed: true,
                errMess: action.errMess
            })
        case ActionTypes.REQUEST_IMAGES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case ActionTypes.RECEIVE_IMAGES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.images,
                isLoading: false,
                lastUpdated: action.receivedAt
            })
        case ActionTypes.UPDATE_IMAGE:
            const newState = state.items.map((image) => image._id === action.payload._id ? action.payload : image);
            return Object.assign({}, state, { items: newState })
        default:
            return state
    }
}