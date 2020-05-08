import review from "./reviews";
import { baseUrl } from '../shared/baseUrl'
const axios = require('axios').default;

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
        return axios.get(baseUrl + '/tags/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            
            .then(response => {
                console.log(JSON.stringify(response))
                dispatch(receiveTags(response))
            })
            .catch(error => {
                alert(JSON.stringify(error))
                dispatch(tagsFailed(error))})

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
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.post(baseUrl + '/tags', newTag,
        config)
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
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        return axios.get(baseUrl+ '/tags' + '/parents/' + tagId,
            config)
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
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        return axios.get( baseUrl + '/categories/',
            config)
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
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.post(baseUrl + '/categories', newCategory,
        config)
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
        token: response.token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        message
    }
}


export const loginUser = (creds) => (dispatch) => {
    dispatch(requestLogin(creds))
    
    return axios.post(baseUrl +'/users/login/', creds)
        .then(response => {
            localStorage.setItem('token', response.data.token);
            dispatch(receiveLogin(response.data))
            return response.data;
        })
        .catch(function (error) {
            alert(JSON.stringify(error))
            // var error = new Error('Error ' + response.status);
            // error.response = response;
            // throw error;
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

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
    return true
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
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.get(baseUrl + '/reviews',
        config)
        .then(response => dispatch(receiveReviews(response)))
        .catch(function (error) {
            dispatch(reviewsFailed(error.response.data.message))
        })
        .finally(function () {
            // always executed
        });
}

export const postReview = (val) => (dispatch) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.post(baseUrl + '/reviews', val,
        config)
        .then(response => dispatch(addReview(response)))
        .catch(function (error) {
            dispatch(reviewsFailed(error.response.data.message))
        })
        .finally(function () {
            // always executed
        });
}
export const putReview = (id, val) => (dispatch) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.put(baseUrl + '/reviews/' + id, val,
        config)
        .then(response => dispatch(receiveReviews(response)))
        .catch(function (error) {
            dispatch(reviewsFailed(error.response.data.message))
        })
        .finally(function () {
            // always executed
        });

}

export const removeReview = (id) => (dispatch) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.delete(baseUrl + '/reviews/' + id,
        config)
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

function removeSelected(image) {
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
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.get(baseUrl + '/imageupload/',
        config)
        .then(response => dispatch(receiveImages(response)))
        .catch(function (error) {
            dispatch(imagesFailed(error.response.data.message))
        })
        .finally(function () {
        });
}

export const postImage = (img, values) => (dispatch) => {

    let formData = new FormData();

    for (let x of img) {
        formData.append('myFile', x);
    }

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.post(baseUrl + '/imageupload/', formData,
        config)
        .then(response => {
            dispatch(addImage(response))
            if (values.addToSingle) {
                response = response.data.map((image, i) => ({ src: baseUrl + image.thumbnail, value: image._id }))[0]
                dispatch(addSelected(response))
            }
            if (values.addToMultiple) {
                response = response.data.map((image, i) => ({ src: baseUrl + image.thumbnail, value: image._id }))
                alert(response);
                dispatch(addMultiImage(response))
            }
        })
        .catch(function (error) {
            dispatch(imagesFailed(error.response.data))
        })
        .finally(function () {
            if (values.addToSingle) {
            }
        });
}



export const addSelectedImage = (image) => (dispatch) => {
    dispatch(addSelected(image))
}
export const dispatchMultiImage = (image) => (dispatch) => {
    dispatch(addMultiImage(image))
}

export const removeSelectedImage = (image) => (dispatch) => {
    dispatch(removeSelected(image))
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
    alert("in update prod")
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
        const config = {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        return axios.get(baseUrl + '/products/',
            config)
            .then(response => {
                console.log(JSON.stringify(response))
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
    newCategory.mainImage = values.mainImage.value;
    newCategory.carouselImages = values.carouselImages.values;
    newCategory.featured = values.featured.value;
    newCategory.categories = values.categories;
    newCategory.tags = values.tags;

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.post(baseUrl + '/products', newCategory,
        config)
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
    newCategory.mainImage = values.mainImage.value;
    newCategory.carouselImages = values.carouselImages.values;
    newCategory.featured = values.featured.value;
    newCategory.categories = values.categories;
    newCategory.tags = values.tags;

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    axios.put(baseUrl + '/products/' + id, newCategory,
        config)
        .then(response => dispatch(updateProduct(response)))
        .catch(function (error) {
            alert(JSON.stringify(error))
            dispatch(productsFailed(error.response))
        })
        .finally(function () {
            // always executed
        });
}


export const updateTagsState = (val) => (dispatch) => {
    dispatch(updateSelectedTags(val))
}

export const updateCategoriesState = (val) => (dispatch) => {
}
