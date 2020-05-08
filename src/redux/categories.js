import * as ActionTypes from './ActionTypes';

export default function category(
    state = {
        isFetching: true,
        didInvalidate: false,
        items: []
    },
    action
) {
    switch (action.type) {
        case ActionTypes.ADD_CATEGORY:
            var categories = action.payload;
            return Object.assign({}, state, { isFetching: false, errMess: null, items: state.items.concat(categories) })
        // return {state, isLoading: false, errMess: null, tags: action.payload };
        case ActionTypes.INVALIDATE_TAG:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case ActionTypes.REQUEST_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case ActionTypes.RECEIVE_CATEGORIES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.categories,
                isLoading: false,
                lastUpdated: action.receivedAt
            })
        case ActionTypes.UPDATE_CATEGORY:
            const newState = state.items.map((tag) => tag._id == action.payload._id ? action.payload : tag);
            return Object.assign({}, state, { tags: newState })
        default:
            return state
    }
}

//   function postsBySubreddit(state = {}, action) {
//     switch (action.type) {
//       case INVALIDATE_SUBREDDIT:
//       case RECEIVE_POSTS:
//       case REQUEST_POSTS:
//         return Object.assign({}, state, {
//           [action.subreddit]: posts(state[action.subreddit], action)
//         })
//       default:
//         return state
//     }
//   }

// export const Tags = (state = {
//     isLoading: true,
//     errMess: null,
//     tags: [],
// }, action) => {
//     switch (action.type) {
        // case ActionTypes.ADD_TAGS:
        //     return Object.assign({}, state, { isLoading: false, errMess: null, tags: action.payload })
        // // return {state, isLoading: false, errMess: null, tags: action.payload };

//         // case ActionTypes.TAGS_FAILED:
//         //     return { ...state, isLoading: false, errMess: action.payload, tags: [] };

//         case ActionTypes.ADD_TAG:
//             var tags = action.payload;
//             return Object.assign({}, state, { tags: state.tags.concat(tags) })
//         // return {...state, tags: state.tags.concat(tag)};
//         case ActionTypes.ADD_PARENTS:
//             return Object.assign({}, state, { isLoading: false, errMess: null, parents: action.payload })





//         default:
//             return state;
//     }
// }