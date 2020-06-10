
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
                break;
            case 'isObject':
                if (!typeof (value) === 'object') {
                    stateObject[name].valid = false;
                    message = "Image must be selected";
                    stateObject[name].errMess = [...stateObject[name].errMess, message];
                }
            case 'hasImages':
                if ((value).length === 0) {
                    stateObject[name].valid = false;
                    message = "At least one image is required in carousel";
                    stateObject[name].errMess = [...stateObject[name].errMess, message];
                }
                break;
            case 'meetsSpecialChar':
                let hasCapitals = false;
                let hasLowerCase = false;
                let hasNumber = false;
                let hasSpecial = false;

                const capitals = /[A-Z]/g;
                if (value.match(capitals)) {
                    hasCapitals = true
                }

                const lowercase = /[a-z]/g;
                if (value.match(lowercase)) {
                    hasLowerCase = true
                }

                const numbers = /[0-9]/g;
                if (value.match(numbers)) {
                    hasNumber = true
                }

                const specialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
                if (value.match(specialChar)) {
                    hasSpecial = true
                }

                if (!hasCapitals || !hasLowerCase || !hasNumber || !hasSpecial) {
                    stateObject[name].valid = false;
                    if (!hasCapitals) {
                        message = "At least one capital letter is required"
                        stateObject[name].errMess = [...stateObject[name].errMess, message];
                    }
                    if (!hasLowerCase) {
                        message = "At least one lower-case letter is required"
                        stateObject[name].errMess = [...stateObject[name].errMess, message];
                    }
                    if (!hasNumber) {
                        message = "At least one number is required"
                        stateObject[name].errMess = [...stateObject[name].errMess, message];
                    }
                    if (!hasSpecial) {
                        message = "At least one capital special character is required"
                        stateObject[name].errMess = [...stateObject[name].errMess, message];
                    }
                }
                break;
            case 'passwordsMatch':
                if (stateObject["password"].value !== stateObject["verifyPassword"].value
                    && stateObject["verifyPassword"].touched) {
                    stateObject["verifyPassword"].valid = false;
                    message = "Passwords do not match"
                    stateObject[name].errMess = [...stateObject[name].errMess, message];
                }else{
                    stateObject["verifyPassword"].valid = true;
                }

                break;
            default:
                alert("default")
                stateObject[name].valid = true
        }
    }
    return stateObject
}

export const checkIfFormValid = (stateObject) => {
    let isFormValid = true;
    for (let item in stateObject) {
        if (stateObject[item].valid === false) {
            isFormValid = false;
        }
    }
    return isFormValid;
}

export const formSubmitErrors = (stateObject) => {
    for (let item in stateObject) {
        if (stateObject[item].valid === false) {
            stateObject[item].touched = true;
        }
        if (stateObject[item].errMess && stateObject[item].errMess.length < 1) {
            stateObject[item].errMess = ["Required"];


        }
    }
    return stateObject;
}
