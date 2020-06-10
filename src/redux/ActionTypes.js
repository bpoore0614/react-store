import review from "./reviews";
import { baseUrl } from '../shared/baseUrl'
import { NavbarText } from "reactstrap";
import { Redirect } from "react-router";
import { store } from '../App';


const axios = require('axios').default;


// axios.defaults.withCredentials = true;
// alert(ConfigureStore.getState().Auth)
let config = () => ({
    timeout: 3000,
    headers: { Authorization: "Bearer " + store.getState().Auth.token }
})

export const TAGS_LOADING = 'TAGS_LOADING';
export const INVALIDATE_TAG = 'INVALIDATE_TAG';
export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export const REQUEST_TAGS = 'REQUEST_TAGS';
export const POST_TAG = 'POST_TAGS';
export const PUT_TAG = 'PUT_TAG';
export const UPDATE_TAG = 'UPDATE_TAG';
export const ADD_TAGS = 'ADD_TAGS';
export const ADD_TAG = 'ADD_TAG';
export const FETCH_PARENTS_BEGIN = 'FETCH_PARENTS_BEGIN';
export const TAGS_FAILED = "TAGS_FAILED";
export const ADD_TAG_PARENTS = "ADD_TAG_PARENTS";
export const INVALIDATE_PARENT = 'INVALIDATE_PARENT';

export const REQUEST_PARENTS = "REQUEST_PARENTS"


export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const REQUEST_CATEGORIES = "REQUEST_CATEGORIES";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY"
export const ADD_CATEGORY_PARENTS = "ADD_CATEGORY_PARENTS"
export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const IS_ADMIN = 'IS_ADMIN';
export const ADD_USER = 'ADD_USER';
export const USER_CREATION_FAILURE = "USER_CREATION_FAILURE";





//tag action creators

function requestTags() {
    return {
        type: REQUEST_TAGS,
        // tags
    }
}

function receiveTags(json) {
    return {
        type: RECEIVE_TAGS,
        tags: json.data,
        receivedAt: Date.now()
    }
}

function addTag(json) {
    return { type: ADD_TAG, payload: json.data };
};

function updateTag(tag) {
    return {
        type: UPDATE_TAG,
        payload: tag
    }
};
function tagsFailed(err) {
    return {
        type: INVALIDATE_TAG,
        errMess: err
    }
}

//parents action creators

function requestParents() {
    return {
        type: REQUEST_PARENTS,
    }
}
function addTagParents(json) {
    return {
        type: ADD_TAG_PARENTS,
        parents: json.data,
        receivedAt: Date.now()
    }
}
function parentsFailed(err) {
    return {
        type: INVALIDATE_PARENT,
        errMess: err
    }
}

function addCategoryParents(json) {
    return {
        type: ADD_CATEGORY_PARENTS,
        parents: json,
        receivedAt: Date.now()
    }
}

//category

function requestCategories() {
    return {
        type: REQUEST_CATEGORIES,
    }
}

function receiveCategories(json) {
    return {
        type: RECEIVE_CATEGORIES,
        categories: json.data,
        receivedAt: Date.now()
    }
}

function addCategory(category) {
    return { type: ADD_CATEGORY, payload: category };
};

function updateCategory(category) {
    return {
        type: UPDATE_CATEGORY,
        payload: category
    }
};
function categoriesFailed(err) {
    return {
        type: INVALIDATE_CATEGORY,
        errMess: err
    }
}

// tags
export function fetchTags() {
    return (dispatch) => {
        return axios.get(baseUrl + '/tags/', config())
            .then(response => {
                alert(JSON.stringify(response))
                dispatch(receiveTags(response))
            })
            .catch(error => {
                alert(JSON.stringify(error))
                dispatch(tagsFailed(error))
            })

            .finally(function () {
                // always executed
            });
    }
}

function shouldFetchTags(state) {
    const tags = state.tags
    if (!tags) {
        return true
    } else if (tags.isFetching) {
        return false
    } else {
        return tags.didInvalidate
    }
}

export function fetchTagsIfNeeded(tags = null) {
    return (dispatch, getState) => {
        if (shouldFetchTags(getState())) {
            return dispatch(fetchTags())
        }
    }
}

export const postTag = (name, parent) => (dispatch) => {
    const newTag = {
        name: name,
        parent: parent
    };

    axios.post(baseUrl + '/tags', newTag)
        .then(response => dispatch(addTag(response)))
        .catch(error => {
            console.log('Post tag ', error.message);
            if (error.response.status == 401) {
                const err = "Must be signed in with an admin account to post new tags";
                dispatch(tagsFailed(err))
            }
        })
}



export function putTag(tagId, name, parent) {
    return dispatch => {
        const updatedTag = {
            name: name,
            parent: parent
        }
        return fetch(baseUrl + '/tags/' + tagId, {
            method: "PUT",
            body: JSON.stringify(updatedTag),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    alert(response.status)
                    alert(response.statusText)
                    alert(response.data)
                    alert(response.message)

                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    alert(error.message + " error")
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            // .then(json => dispatch(updateTag(json)))
            .then((json) => dispatch(fetchTags()))
            .catch(error => {
                console.log('Post tag ', error.message);
                alert('Your tag could not be updated\nError: ' + error.message)
            })
    };
}

export const removeTag = (tagId) => (dispatch) => {
    return fetch(baseUrl + '/tags/' + tagId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(json => dispatch(receiveTags(json)))
        .catch(error => {
            console.log('Post tag ', error.message);
            alert('Your comment could not be posted\nError: ' + error.message)
        })
};

//parents
export function fetchParents(tagId) {
    return dispatch => {

        return axios.get(baseUrl + '/tags' + '/parents/' + tagId)
            .then(response => dispatch(addTagParents(response)))
            .catch(error => dispatch(parentsFailed(error.message)))
            .finally(function () {
                // always executed
            });
    }
}

// export const fetchParents = (tagId) => (dispatch) => {
//     return fetch('/tags' + '/parents/' + tagId)
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
//         .then(json => dispatch(addTagParents(json)))
//         .catch(error => {
//             console.log('Post tag ', error.message);
//             alert('Your tag could not be updated\nError: ' + error.message)
//         })
//     .catch(error => dispatch(tagsFailed(error.message)));
// }





// categories
export function fetchCategories() {
    return (dispatch) => {

        return axios.get(baseUrl + '/categories/')
            .then(response => {
                dispatch(receiveCategories(response))
            })
            .catch(error => dispatch(categoriesFailed(error)))
            .finally(function () {
                // always executed
            });
    }
}

export const removeCategory = (categoryId) => (dispatch) => {
    return fetch(baseUrl + '/categories/' + categoryId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(json => dispatch(receiveCategories(json)))
        .catch(error => {
            console.log('Post tag ', error.message);
            alert('Your comment could not be posted\nError: ' + error.message)
        })
};

export const postCategory = (name, parent) => (dispatch) => {
    const newCategory = {
        name: name,
        parent: parent
    };

    axios.post(baseUrl + '/categories', newCategory)
        .then(json => dispatch(receiveCategories(json)))
        .catch(function (error) {
            dispatch(categoriesFailed(error.response.data.message))
        })
        .finally(function () {
            // always executed
        });
}

export function putCategory(categoryId, name, parent) {
    return dispatch => {
        const updateCategory = {
            name: name,
            parent: parent
        }
        return fetch(baseUrl + '/categories/' + categoryId, {
            method: "PUT",
            body: JSON.stringify(updateCategory),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);

                    error.response = response;
                    throw error;
                }
            },
                error => {
                    alert(error.message + " error")
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then(response => response.json())
            .then((json) => dispatch(fetchCategories()))
            .catch(error => {
                console.log('Post tag ', error.message);
                alert('Your tag could not be updated\nError: ' + error.message)
            })
    };
}

export const fetchCategoryParents = (tagId) => (dispatch) => {
    return fetch(baseUrl + '/categories' + '/parents/' + tagId)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(json => dispatch(addCategoryParents(json)))
        .catch(error => {
            console.log('Post tag ', error.message);
            alert('Your tag could not be updated\nError: ' + error.message)
        })
    // .catch(error => dispatch(tagsFailed(error.message)));
}

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        creds
    }
}

function receiveLogin(response) {
    return {
        type: LOGIN_SUCCESS,
        payload: response
    }
}

function receiveAdmin(response) {
    return {
        type: IS_ADMIN,
        payload: response
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        message
    }
}

function addUser() {
    return {
        type: ADD_USER
    }
}
function userCreationError(message) {
    return {
        type: USER_CREATION_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds))
    return axios.post(baseUrl + '/users/login/', creds, { withCredentials: true })
        .then(response => {
            dispatch(receiveLogin(response.data))
        }).then(() => {
            dispatch(sendFlashMessage("You have successfully logged in!", 'alert-success'))
        })
        .catch(function (error) {
            alert(error)
            dispatch(sendFlashMessage("Invalid username/password", 'alert-danger'))
            dispatch(loginError("Invalid username/password"))
        })
}






export const postUser = (creds) => (dispatch) => {
    const user = {
        username: creds.email.value,
        password: creds.password.value,
        name: creds.name.value,
        newsletter: creds.newsletter.value
    }

    return axios.post(baseUrl + '/users/signup/', user)
        .then(response => {
            dispatch(sendFlashMessage("You have successfully registered!", 'alert-success'))
            dispatch(addUser())
        })
        .catch(function (error) {
            alert(JSON.stringify(error))
            // if (error.response) {
            //     if (error.response.data.error.name && error.response.data.error.name === "UserExistsError") {
            //         dispatch(sendFlashMessage("A user with the given username is already registered", "alert-danger"))

            //     }
            // }
            // else {
            //     dispatch(sendFlashMessage("User was not created, please try again", 'alert-danger'))
            //     dispatch(userCreationError("User was not created, please try again"))
            // }
        })
}
// export const loginUser = (creds) => (dispatch) => {
//     // We dispatch requestLogin to kickoff the call to the API
//     dispatch(requestLogin(creds))

//     return fetch('localhost:3000/users/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(creds)
//     })
//         .then(response => {
//             if (response.ok) {
//                 localStorage.setItem('token', response.token);
//                 localStorage.setItem('creds', JSON.stringify(creds));
//                 dispatch(receiveLogin(response))
//                 return response;
//             } else {
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//             error => {
//                 throw error;
//             })
//         .then(response => response.json())
//         .then(response => {
//             if (response.success) {
//                 // If login was successful, set the token in local storage

//                 localStorage.setItem('token', response.token);
//                 localStorage.setItem('creds', JSON.stringify(creds));
//                 // Dispatch the success action
//                 // dispatch(fetchFavorites());
//                 dispatch(receiveLogin(response))
//                 return response
//             }
//             else {
//                 var error = new Error('Error ' + response.status);
//                 error.response = response;
//                 throw error;
//             }
//         })
//         .catch(error => dispatch(loginError(error.message)))
// };

function requestLogout() {
    return {
        type: LOGOUT_REQUEST
    }
}

export const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => async (dispatch) => {
    alert("logout")
    return axios.get(baseUrl + '/users/logout/', {withCredentials: true})
        .then(response => {
            dispatch(receiveLogout())
            dispatch(sendFlashMessage("You have successfully logged out", 'alert-success'))
        })
        .catch(error => {
            console.log(error)
            dispatch(sendFlashMessage("Logout failed, please try again", 'alert-alert'))
        })
        alert("end")

}

//alerts 
export const FLASH_MESSAGE = 'FLASH_MESSAGE';

export function sendFlashMessage(message, className) {
    return {
        type: FLASH_MESSAGE,
        payload: {
            message,
            className
        }
    }
};

//review
export const ADD_REVIEW = "ADD_REVIEW";
export const INVALIDATE_REVIEW = "INVALIDATE_REVIEW";
export const REQUEST_REVIEWS = "REQUEST_REVIEWS";
export const RECEIVE_REVIEWS = "RECEIVE_REVIEWS";
export const UPDATE_REVIEW = "UPDATE_REVIEW";
export const REVIEWS_FAILED = "REVIEWS_FAILED"
//review 
function requestReviews() {
    return {
        type: REQUEST_REVIEWS,
    }
}

function receiveReviews(json) {
    return {
        type: RECEIVE_REVIEWS,
        reviews: json.data,
        receivedAt: Date.now()
    }
}

function addReview(review) {
    return { type: ADD_REVIEW, payload: review.data };
};

function updateReview(review) {
    return {
        type: UPDATE_REVIEW,
        payload: review
    }
};

function reviewsFailed(err) {
    return {
        type: REVIEWS_FAILED,
        errMess: err
    }
}

//review action creators

export const fetchReviews = () => (dispatch) => {

    axios.get(baseUrl + '/reviews')
        .then(response => dispatch(receiveReviews(response)))
        .catch(function (error) {
            dispatch(reviewsFailed(error.response.data.message))
        })
        .finally(function () {
            // always executed
        });
}

export const postReview = (val) => (dispatch) => {

    axios.post(baseUrl + '/reviews', val)
        .then(response => dispatch(addReview(response)))
        .catch(function (error) {
            dispatch(reviewsFailed(error.response.data.message))
        })
        .finally(function () {
            // always executed
        });
}
export const putReview = (id, val) => (dispatch) => {

    axios.put(baseUrl + '/reviews/' + id, val)
        .then(response => dispatch(receiveReviews(response)))
        .catch(function (error) {
            dispatch(reviewsFailed(error.response.data.message))
        })
        .finally(function () {
            // always executed
        });

}

export const removeReview = (id) => (dispatch) => {

    axios.delete(baseUrl + '/reviews/' + id)
        .then(response => dispatch(receiveReviews(response)))
        .catch(function (error) {
            dispatch(reviewsFailed(error.response.data.message))
        })
        .finally(function () {
            // always executed
        });
}

export const SINGLE_IMAGE = "SINGLE_IMAGE";
export const MULTI_IMAGE = "MULTI_IMAGE";
export const POST_IMAGE = "POST_IMAGE";
export const ADD_IMAGE = "ADD_IMAGE";
export const ADD_SELECTED_IMAGE = "ADD_SELECTED_IMAGE"
export const REMOVE_SELECTED_IMAGE = "REMOVE_SELECTED_IMAGE"
export const INVALIDATE_IMAGE = "INVALIDATE_IMAGE";
export const REQUEST_IMAGES = "REQUEST_IMAGES";
export const RECEIVE_IMAGES = "RECEIVE_IMAGES";
export const UPDATE_IMAGE = "UPDATE_IMAGE";
export const IMAGES_FAILED = "IMAGES_FAILED"

function requestImages() {
    return {
        type: REQUEST_IMAGES,
    }
}

function receiveImages(json) {
    return {
        type: RECEIVE_IMAGES,
        images: json.data,
        receivedAt: Date.now()
    }
}
function addImage(img) {
    return { type: ADD_IMAGE, payload: img.data };
};

function addSelected(image) {
    return { type: SINGLE_IMAGE, payload: image }
}
function addMultiImage(image) {
    return { type: MULTI_IMAGE, payload: image }
}

function removeSelectedImage(image) {
    return { type: REMOVE_SELECTED_IMAGE, payload: image }
}


function updateImage(image) {
    return {
        type: UPDATE_IMAGE,
        payload: image
    }
};

function imagesFailed(err) {
    return {
        type: IMAGES_FAILED,
        errMess: err
    }
}

export const fetchImages = () => (dispatch) => {

    axios.get(baseUrl + '/imageupload/')
        .then(response => dispatch(receiveImages(response)))
        .catch(function (error) {
            dispatch(imagesFailed(error.response.data.message))
        })
        .finally(function () {
        });
}

export const postImages = (values, formData) => (dispatch) => {
    formData.append('title', values.title ? values.title.value : null);
    formData.append('caption', values.caption ? values.caption.value : null);
    formData.append('alt', values.alt ? values.alt.value : null);
    formData.append('description', values.description ? values.description.value : null);

    axios.post(baseUrl + '/imageupload/', formData)
        .then(response => {
            dispatch(addImage(response))
            // if (values.addToSingle) {
            //     response = response.data.map((image, i) => ({ src: baseUrl + image.thumbnail, value: image._id }))[0]
            //     dispatch(addSelected(response))
            // }
            // if (values.addToMultiple) {
            //     response = response.data.map((image, i) => ({ src: baseUrl + image.thumbnail, value: image._id }))
            //     alert(response);
            //     dispatch(addMultiImage(response))
            // }
        })
        .catch(function (error) {
            dispatch(imagesFailed(error.response.data))
        })
        .finally(function () {
            // if (values.addToSingle) {
            // }
        });
}

export const putImage = (values, id) => (dispatch) => {
    const image = {
        title: values.title ? values.title.value : null,
        caption: values.caption ? values.caption.value : null,
        alt: values.alt ? values.alt.value : null,
        description: values.description ? values.description.value : null
    }


    axios.put(baseUrl + '/imageupload/' + id, image)
        .then(response => {
            dispatch(receiveImages(response))
        })
        .catch(function (error) {
            dispatch(imagesFailed(error.response.data))
        })
        .finally(function () {
            // if (values.addToSingle) {
            // }
        });
}

export const removeImage = (id) => (dispatch) => {

    axios.delete(baseUrl + '/imageupload/' + id)
        .then(response => {
            dispatch(receiveImages(response))
        })
        .catch(function (error) {
            dispatch(imagesFailed(error.response.data))
        })
        .finally(function () {
        });
}

export const addSelectedImage = (image) => (dispatch) => {
    dispatch(addSelected(image))
}
export const dispatchMultiImage = (image) => (dispatch) => {
    dispatch(addMultiImage(image))
}


export const ADD_PRODUCT = "ADD_PRODUCT";
export const INVALIDATE_PRODUCT = "INVALIDATE_PRODUCT";
export const REQUEST_PRODUCTS = "REQUEST_PRODUCTS";
export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const PRODUCTS_FAILED = "PRODUCTS_FAILED"
export const CHANGE_PAGE = "CHANGE_PAGE";
export const UPDATE_SELECTED_TAGS = "UPDATE_SELECTED_TAGS";

function requestProducts() {
    return {
        type: REQUEST_PRODUCTS,
    }
}

function receiveProducts(json) {
    return {
        type: RECEIVE_PRODUCTS,
        products: json.data,
        receivedAt: Date.now()
    }
}

function addProduct(product) {
    return { type: ADD_PRODUCT, payload: product.data };
};

function updateProduct(product) {

    return {
        type: UPDATE_PRODUCT,
        payload: product.data
    }
};

function productsFailed(err) {
    return {
        type: PRODUCTS_FAILED,
        errMess: err
    }
}

function changePage(val) {
    return {
        type: CHANGE_PAGE,
        payload: val,
    }
}

function updateSelectedTags(val) {
    return {
        type: UPDATE_SELECTED_TAGS,
        payload: val
    }
}

export const setProductPage = (page) => (dispatch) => {
    dispatch(changePage(page))
}


export function fetchProducts() {
    return (dispatch) => {
        return axios.get(baseUrl + '/products/')
            .then(response => {
                dispatch(receiveProducts(response))
            })
            .catch(error => dispatch(productsFailed(error)))
            .finally(function () {
                // always executed
            });
    }
}

export const postProduct = (values) => (dispatch) => {
    const newCategory = {};
    newCategory.name = values.name.value;
    newCategory.description = values.description.value;
    newCategory.price = values.price.value;
    newCategory.mainImage = values.mainImage.image ? values.mainImage.image._id : null;
    newCategory.carouselImages = values.carouselImages.images.map(img => img._id);
    newCategory.featured = values.featured.value;
    newCategory.categories = values.categories;
    newCategory.tags = values.tags;


    axios.post(baseUrl + '/products', newCategory)
        .then(response => dispatch(addProduct(response)))
        .catch(function (error) {
            dispatch(reviewsFailed(error.response.data.message))
        })
        .finally(function () {
            // always executed
        });
}

export const putProduct = (values, id) => (dispatch) => {
    const newCategory = {};

    newCategory.name = values.name.value;
    newCategory.description = values.description.value;
    newCategory.price = values.price.value;
    newCategory.mainImage = values.mainImage.image ? values.mainImage.image._id : null;
    newCategory.carouselImages = values.carouselImages.images.map(img => img._id);
    newCategory.featured = values.featured.value;
    newCategory.categories = values.categories;
    newCategory.tags = values.tags;


    axios.put(baseUrl + '/products/' + id, newCategory)
        .then(response => dispatch(updateProduct(response)))
        .catch(function (error) {
            alert(JSON.stringify(error))
            dispatch(productsFailed(error.response))
        })
        .finally(function () {
            // always executed
        });
}

export const removeProduct = (id) => (dispatch) => {


    axios.delete(baseUrl + '/products/' + id)
        .then(response => dispatch(receiveProducts(response)))
        .catch(function (error) {
            alert(JSON.stringify(error))
            dispatch(productsFailed(error.response))
        })
        .finally(function () {
            // always executed
        })
}


export const updateTagsState = (val) => (dispatch) => {
    dispatch(updateSelectedTags(val))
}

export const updateCategoriesState = (val) => (dispatch) => {
}


// export const RECEIVE_CART = "ADD_CART_ITEM";
export const INVALIDATE_CART = "INVALIDATE_CART";
export const REQUEST_CART = "REQUEST_CART";
export const RECEIVE_CART = "RECEIVE_CART";
export const UPDATE_CART = "UPDATE_CART";

function receiveCart(items) {
    return { type: RECEIVE_CART, payload: items };
};

function cartFailed(error) {
    alert(error)
    // return { type: ADD_CART_ITEM, payload: items };
};

export function fetchCart() {
    return (dispatch, getState) => {
        alert(getState().Auth.isAuthenticated)
        if (getState().Auth.isAuthenticated) {
            return axios.get(baseUrl + '/cart', config())
                .then(response => {
                    dispatch(receiveCart(response.data.products))
                })
                .catch(error => dispatch(productsFailed(error)))
                .finally(function () {
                    // always executed
                });
        } else {
            let cart = JSON.parse(localStorage.getItem("cart")) === null ? [] : JSON.parse(localStorage.getItem("cart"))
            dispatch(receiveCart(cart));
        }
    }
}
//     let cartItems = JSON.parse(localStorage.getItem("cart"))
//     if (cartItems === null) {
//         localStorage.setItem('cart', JSON.stringify([]));
//         cartItems = JSON.parse(localStorage.getItem("cart"))

//     }
// }
// dispatch(addCartItem(cartItems))
// const config = {
//     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
// };
// return axios.get(baseUrl + '/products/',
//     config)
//     .then(response => {
//         dispatch(receiveProducts(response))
//     })
//     .catch(error => dispatch(productsFailed(error)))
//     .finally(function () {
//         // always executed
//     });

export const refreshToken = () => (dispatch, getState) => {
    const { tokenRefreshTime, refreshExpiration, isAuthenticated } = getState().Auth;
    if (isAuthenticated && tokenRefreshTime && refreshExpiration
        && tokenRefreshTime < Date.now()
        && refreshExpiration > Date.now()) {
        return axios.get(baseUrl + '/users/refreshtoken/', { withCredentials: true })
            .then(response => {
                dispatch(receiveLogin(response.data))
                return (true)
            })
            .catch(async function (error) {
                dispatch(receiveLogout())
                alert("Your session has expired")
                window.location.href = "/login";
                return (false)
            })
    }else return true
}

export const autoLogIn = () => (dispatch, getState) => {
    return axios.get(baseUrl + '/users/refreshtoken/', { withCredentials: true })
        .then(response => {
            if (response.data !== "No refresh cookie") {
                dispatch(receiveLogin(response.data))
            }
        })
        .catch(async function (error) {

        })
}

export const getUser = () => (dispatch) => {
    return axios.get(baseUrl + '/users/get-user/', config())
        .then(response => {
            dispatch(receiveAdmin(response.data))
        })
        .catch(async function (error) {
            console.log(error);
        })
}

export const postCart = (values) => async (dispatch, getState) => {
    alert(getState().Auth.isAuthenticated)
    if (getState().Auth.isAuthenticated) {
        const hasToken = await dispatch(refreshToken())
        if (hasToken) {
            alert(hasToken)
            const cartItem = { id: values.product._id, quantity: values.quantity }
            axios.post(baseUrl + '/cart', cartItem, config())
                .then(response => {
                    dispatch(receiveCart(response.data.products))
                    // added = response.data.products.find(product => product.id._id.toString() === values.product._id.toString())
                    dispatch(sendFlashMessage(values.quantity + " " + values.product.name + " added to cart", 'alert-success'))
                })
                .catch(function (error) {
                    dispatch(sendFlashMessage("Error adding " + values.product.name + " to cart. Please try again!", 'alert-danger'))
                })
        }

    } else {
        // localStorage.removeItem("cart")
        let cart = JSON.parse(localStorage.getItem("cart")) === null ? [] : JSON.parse(localStorage.getItem("cart"))
        let addFlag = false;
        const productsInCart = cart.map(product => {
            if (product.product._id.toString() === values.product._id.toString()) {
                addFlag = true;
                return ({ product: product.product, quantity: product.quantity + values.quantity })
            } return ({ product: product.product, quantity: product.quantity })
        })
        if (addFlag) {
            cart = productsInCart
        } else {
            cart.push({ product: values.product, quantity: values.quantity })
        }
        localStorage.setItem('cart', JSON.stringify(cart));

        dispatch(receiveCart(JSON.parse(localStorage.getItem('cart'))));
        dispatch(sendFlashMessage(values.quantity + " " + values.product.name + " added to cart", 'alert-success'))
    }
}

export const putCart = (values) => async (dispatch, getState) => {
    if (getState().Auth.isAuthenticated) {
        const hasToken = await dispatch(refreshToken())
        if (hasToken) {
            const cartItem = { id: values.product._id, quantity: values.quantity }
            axios.put(baseUrl + '/cart/' + values.product._id, cartItem, config())
                .then(response => {
                    dispatch(receiveCart(response.data.products))
                    // added = response.data.products.find(product => product.id._id.toString() === values.product._id.toString())
                    dispatch(sendFlashMessage(values.product.name + " quantity changed to " + values.quantity, 'alert-success'))
                })
                .catch(function (error) {
                    alert(error)
                    dispatch(sendFlashMessage("Error updating " + values.product.name + " in cart. Please try again!", 'alert-danger'))
                })
        }
    } else {
        let cart = JSON.parse(localStorage.getItem("cart")) === null ? [] : JSON.parse(localStorage.getItem("cart"))
        cart = cart.map(product => {
            if (product.product._id.toString() === values.product._id.toString()) {
                return ({ product: product.product, quantity: values.quantity })
            }
            return ({ product: product.product, quantity: product.quantity })
        })
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(receiveCart(JSON.parse(localStorage.getItem('cart'))));
        dispatch(sendFlashMessage(values.product.name + " quantity changed to " + values.quantity, 'alert-success'))
    }
}

export const deleteCart = (values) => async (dispatch, getState) => {
    if (getState().Auth.isAuthenticated) {
        const hasToken = await dispatch(refreshToken())
        if (hasToken) {
            axios.delete(baseUrl + '/cart/' + values._id, config())
                .then(response => {
                    dispatch(receiveCart(response.data.products))
                    dispatch(sendFlashMessage(values.name + " removed from cart", 'alert-success'))
                })
                .catch(function (error) {
                    alert(error)
                    dispatch(sendFlashMessage("Error removing " + values.name + " from cart. Please try again!", 'alert-danger'))
                })
        }
    } else {
        let cart = JSON.parse(localStorage.getItem("cart")) === null ? [] : JSON.parse(localStorage.getItem("cart"))
        cart = cart.filter(product => product.product._id.toString() !== values._id.toString())
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch(receiveCart(JSON.parse(localStorage.getItem('cart'))));
        dispatch(sendFlashMessage(values.name + " removed from cart", 'alert-success'))
    }
}



export function postLocalCart() {
    return (dispatch, getState) => {
        if (getState().Auth.isAuthenticated) {
            const cart = { cart: JSON.parse(localStorage.getItem('cart')) }
            if (cart.cart) {
                cart.cart = cart.cart.map(item => (
                    { id: item.product._id, quantity: item.quantity }
                ))
                axios.post(baseUrl + '/cart/transfer', cart, config())
                    .then(response => {
                        dispatch(fetchCart())
                        localStorage.removeItem("cart")
                    })
                    .catch(function (error) {
                        alert(error)
                    })
                    .finally(function () {
                        // always executed
                    });
            } else {
                dispatch(fetchCart())
            }
        }
    }

}
