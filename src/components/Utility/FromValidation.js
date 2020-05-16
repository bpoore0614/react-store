
import React from 'react';
// import {FormFeedback} from 'reactstrap';

export const validate = (event, stateObject) => {
    const name = event.target.name;
    const value = event.target.value;
    stateObject[name].value = value;
    stateObject[name].touched = true;
    stateObject[name].errMess = [];
    stateObject[name].valid = true;
    const validations = stateObject[name].validationRules

    let message;
    for (let validation in validations) {
        switch (validation) {
            case 'minLength':
                const minLength = validations[validation]
                message = `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${minLength} characters`;
                if (value.length < minLength) {
                    stateObject[name].valid = false;
                    stateObject[name].errMess = [...stateObject[name].errMess, message];
                }
                break;
            case 'maxLength':
                const maxLength = validations[validation]
                message = `${name.charAt(0).toUpperCase() + name.slice(1)} must be less than ${maxLength} characters`;
                if (value.length > maxLength) {
                    stateObject[name].valid = false;
                    stateObject[name].errMess = [...stateObject[name].errMess, message];
                }
                break;
            case 'isRequired':
                if (value.length < 1) {
                    stateObject[name].valid = false;
                    message = `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be empty`;
                    stateObject[name].errMess = [...stateObject[name].errMess, message];
                }
                break;
            case 'isDigit':
                try {
                    const price = parseFloat(value)
                } catch (error) {
                    if (!(typeof (value) == 'number')) {
                        stateObject[name].valid = false;
                        message = `${name.charAt(0).toUpperCase() + name.slice(1)} must be only numbers`;
                        stateObject[name].errMess = [...stateObject[name].errMess, message];
                    }
                }
                break;
            case 'isEmail':
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(String(value).toLowerCase())) {
                    stateObject[name].valid = false;
                    message = `${name.charAt(0).toUpperCase() + name.slice(1)} must be a valid email address`;
                    stateObject[name].errMess = [...stateObject[name].errMess, message];
                }
            case 'isObject':
                if (!typeof (value) === 'object') {
                    stateObject[name].valid = false;
                    message = "Image must be selected";
                    stateObject[name].errMess = [...stateObject[name].errMess, message];
                }

            default: stateObject[name].valid = true
        }
    }
    return stateObject
}

export const checkIfFormValid = (stateObject) => {
    let isFormValid = true;
    for (let item in stateObject) {
        if (stateObject[item].valid === false) {
            alert(stateObject[item].value)
            isFormValid = false;
        }
    }
    return isFormValid;
}

export const formSubmitErrors = (stateObject) => {
    for (let item in stateObject) {
        if (stateObject[item].errMess && stateObject[item].errMess.length < 1) {
            stateObject[item].touched = true;
            stateObject[item].errMess = ["Required"];
        }
    }
    return stateObject;
}
