import * as ActionTypes from './ActionTypes';


// function selectedSubreddit(state = 'reactjs', action) {
//     switch (action.type) {
//       case SELECT_SUBREDDIT:
//         return action.subreddit
//       default:
//         return state
//     }
//   }

export default function parents(
  state = {
    isFetching: false,
    isLoaded: false,
    didInvalidate: false,
    errMess: null,
    categories: [],
    tags: []
  },
  action
) {
  switch (action.type) {
    case ActionTypes.ADD_TAG_PARENTS:
      return Object.assign({}, state, {
        isLoaded: true,
        isFetching: false,
        didInvalidate: false,
        tags: action.parents,
        lastUpdated: action.receivedAt
      })
    case ActionTypes.INVALIDATE_PARENT:
      return Object.assign({}, state, {
        didInvalidate: true,
        errMess: action.errMess
      })

    case ActionTypes.ADD_CATEGORY_PARENTS:
      return Object.assign({}, state, {
        isLoaded: true,
        isFetching: false,
        didInvalidate: false,
        categories: action.parents,
        lastUpdated: action.receivedAt
      })

    case ActionTypes.REQUEST_PARENTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
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
//         case ActionTypes.ADD_TAGS:
//             return Object.assign({}, state, { isLoading: false, errMess: null, tags: action.payload })
//         // return {state, isLoading: false, errMess: null, tags: action.payload };

//         // case ActionTypes.TAGS_FAILED:
//         //     return { ...state, isLoading: false, errMess: action.payload, tags: [] };

//         case ActionTypes.ADD_TAG:
//             var tags = action.payload;
//             return Object.assign({}, state, { tags: state.tags.concat(tags) })
//         // return {...state, tags: state.tags.concat(tag)};
//         case ActionTypes.ADD_PARENTS:
//             return Object.assign({}, state, { isLoading: false, errMess: null, parents: action.payload })


//         case ActionTypes.UPDATE_TAG:
//             alert(JSON.stringify(state.tags))

//             const newState = state.tags.map((tag) => tag._id == action.payload._id ? action.payload : tag);
//             return Object.assign({}, state, { tags: newState })


//         default:
//             return state;
//     }
// }