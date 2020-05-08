// import * as ActionTypes from './ActionTypes';
// import { baseUrl } from '../shared/baseUrl';


// export const postTag = (name, parent) => (dispatch) => {
//     const newTag = {
//         name: name,
//         parent: parent
//     };
//     // newTag.date = new Date().toISOString();

//     return fetch('/tags', {
//         method: "POST",
//         body: JSON.stringify(newTag),
//         headers: {
//             "Content-Type": "application/json"
//         },
//         credentials: "same-origin"
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             } else {
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message);
//                 throw errmess;
//             })
//         .then(response => response.json())
//         .then(response => dispatch(addTag(response)))
//         .catch(error => {
//             console.log('Post tag ', error.message);
//             alert('Your comment could not be posted\nError: ' + error.message)
//         })
// };

// export const putTag = (tagId, name, parent) => (dispatch) => {
//     const updatedTag = {
//         name: name,
//         parent: parent
//     };

//     return fetch('/tags/' + tagId, {

//         method: "PUT",
//         body: JSON.stringify(updatedTag),
//         headers: {
//             "Content-Type": "application/json"
//         },
//         credentials: "same-origin"
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             } else {
//                 alert(response.status)
//                 alert(response.statusText)
//                 alert(response.data)
//                 alert(response.message)

//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//             error => {
//                 alert(error.message + " error")
//                 var errmess = new Error(error.message);
//                 throw errmess;
//             })
//         .then(response => response.json())
//         .then(response => dispatch(updateTag(response)))
//         .catch(error => {
//             console.log('Post tag ', error.message);
//             alert('Your tag could not be updated\nError: ' + error.message)
//         })
// };




// export const removeTags = (tagId) => (dispatch) => {
//     return fetch('/tags/' + tagId, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         credentials: "same-origin"
//     })
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             } else {
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message);
//                 throw errmess;
//             })
//         .then(response => response.json())
//         .then(response => dispatch(addTags(response)))
//         .catch(error => {
//             console.log('Post tag ', error.message);
//             alert('Your comment could not be posted\nError: ' + error.message)
//         })
// };

// export function fetchParents(tagId) {
    
//     return dispatch => {
//      dispatch(fetchParentsBegin());   
//         return fetch('/tags' + '/parents/' + tagId)
//             .then(res => res.json())
//             .then(json => {
//                 dispatch(addParents(json))
//                 return json
//             })
//             .catch(error => dispatch(tagsFailed(error.message)));
//     }
// }




// // export const fetchDishes = () => (dispatch) => {

// //     dispatch(dishesLoading(true));

// //     return fetch(baseUrl + 'dishes')
// //         .then(response => {
// //             if (response.ok) {
// //                 return response;
// //             } else {
// //                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
// //                 error.response = response;
// //                 throw error;
// //             }
// //         },
// //             error => {
// //                 var errmess = new Error(error.message);
// //                 throw errmess;
// //             })
// //         .then(response => response.json())
// //         .then(dishes => dispatch(addDishes(dishes)))
// //         .catch(error => dispatch(dishesFailed(error.message)));
// // }



// // export const dishesFailed = (errmess) => ({
// //     type: ActionTypes.DISHES_FAILED,
// //     payload: errmess
// // });

// // export const addDishes = (dishes) => ({
// //     type: ActionTypes.ADD_DISHES,
// //     payload: dishes
// // });

// export const fetchTags = () => (dispatch) => {

//     dispatch(tagsLoading(true));

//     return fetch('/tags')
//         .then(response => {
//             if (response.ok) {
//                 return response;
//             } else {
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message);
//                 throw errmess;
//             })
//         .then(response => response.json())
//         .then(promos => dispatch(addTags(promos)))
//         .catch(error => dispatch(tagsFailed(error.message)));
// }



// // export const fetchPromos = () => (dispatch) => {

// //     dispatch(promosLoading(true));

// //     return fetch(baseUrl + 'promotions')
// //         .then(response => {
// //             if (response.ok) {
// //                 return response;
// //             } else {
// //                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
// //                 error.response = response;
// //                 throw error;
// //             }
// //         },
// //             error => {
// //                 var errmess = new Error(error.message);
// //                 throw errmess;
// //             })
// //         .then(response => response.json())
// //         .then(promos => dispatch(addPromos(promos)))
// //         .catch(error => dispatch(promosFailed(error.message)));
// // }

// // export const promosLoading = () => ({
// //     type: ActionTypes.PROMOS_LOADING
// // });

// // export const promosFailed = (errmess) => ({
// //     type: ActionTypes.PROMOS_FAILED,
// //     payload: errmess
// // });

// // export const addPromos = (promos) => ({
// //     type: ActionTypes.ADD_PROMOS,
// //     payload: promos
// // });

// // export const fetchLeaders = () => (dispatch) => {

// //     dispatch(leadersLoading(true));

// //     return fetch(baseUrl + 'leaders')
// //         .then(response => {
// //             if (response.ok) {
// //                 return response;
// //             } else {
// //                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
// //                 error.response = response;
// //                 throw error;
// //             }
// //         },
// //             error => {
// //                 var errmess = new Error(error.message);
// //                 throw errmess;
// //             })
// //         .then(response => response.json())
// //         .then(leaders => dispatch(addLeaders(leaders)))
// //         .catch(error => dispatch(leadersFailed(error.message)));
// // }

// // export const leadersLoading = () => ({
// //     type: ActionTypes.LEADERS_LOADING
// // });

// // export const leadersFailed = (errmess) => ({
// //     type: ActionTypes.LEADERS_FAILED,
// //     payload: errmess
// // });

// // export const addLeaders = (leaders) => ({
// //     type: ActionTypes.ADD_LEADERS,
// //     payload: leaders
// // });

// // export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
// //     const newFeedback = {
// //         firstname: firstname,
// //         lastname: lastname,
// //         telnum: telnum,
// //         email: email,
// //         agree: agree,
// //         contactType: contactType,
// //         message: message

// //     };
// //     newFeedback.date = new Date().toISOString();

// //     return fetch(baseUrl + 'feedback', {
// //         method: "POST",
// //         body: JSON.stringify(newFeedback),
// //         headers: {
// //             "Content-Type": "application/json"
// //         },
// //         credentials: "same-origin"
// //     })
// //         .then(response => {
// //             if (response.ok) {
// //                 return response;
// //             } else {
// //                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
// //                 error.response = response;
// //                 throw error;
// //             }
// //         },
// //             error => {
// //                 var errmess = new Error(error.message);
// //                 throw errmess;
// //             })
// //         .then(response => response.json())
// //         .then(response => alert(JSON.stringify(response)))
// //         // .then(response => dispatch(addFeedback(response)))
// //         .catch(error => {
// //             console.log('Post comment ', error.message);
// //             alert('Your comment could not be posted\nError: ' + error.message)
// //         })
// // };