import * as ActionTypes from './ActionTypes';

export default function reviews(
    state = {
        isReviewFetching: true,
        errMess: null,
        fetchFailed: false,
        items: []
    },
    action
) {
    switch (action.type) {
        case ActionTypes.ADD_REVIEW:
            var reviews = action.payload;
            return Object.assign({}, state, { isReviewFetching: false, errMess: null, items: state.items.concat(reviews) })
        // return {state, isLoading: false, errMess: null, tags: action.payload };
        case ActionTypes.REVIEWS_FAILED:
            return Object.assign({}, state, {
                fetchFailed: true,
                errMess: action.errMess
            })
        case ActionTypes.REQUEST_REVIEWS:
            return Object.assign({}, state, {
                isReviewFetching: true,
                didInvalidate: false
            })
        case ActionTypes.RECEIVE_REVIEWS:
            alert("in review")
            return Object.assign({}, state, {
                isReviewFetching: false,
                didInvalidate: false,
                items: action.reviews,
                isLoading: false,
                lastUpdated: action.receivedAt
            })
        case ActionTypes.UPDATE_REVIEW:
            const newState = state.items.map((review) => review._id == action.payload._id ? action.payload : review);
            return Object.assign({}, state, { items: newState })
        default:
            return state
    }
}