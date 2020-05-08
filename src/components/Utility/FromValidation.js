
import React from 'react';
// import {FormFeedback} from 'reactstrap';

export const validate = (value, validations, name) => {
    const validated = {
        valid: true,
        errMess: []
    };
    let message;
    for (let validation in validations) {
        switch (validation) {
            case 'minLength':
                const minLength = validations[validation]
                message = `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least ${minLength} characters`;
                if (value.length < minLength) {
                    validated.valid = false;
                    validated.errMess = [...validated.errMess, message];
                }
                break;
            case 'maxLength':
                const maxLength = validations[validation]
                message = `${name.charAt(0).toUpperCase() + name.slice(1)} must be less than ${maxLength} characters`;
                if (value.length > maxLength) {
                    validated.valid = false;
                    validated.errMess = [...validated.errMess, message];
                }
                break;
            case 'isRequired':
                if (value.length < 1) {
                    validated.valid = false;
                    message = `${name.charAt(0).toUpperCase() + name.slice(1)} cannot be empty`;
                    validated.errMess = [...validated.errMess, message];
                }
                break;
            case 'isDigit':
                var re = /^\d+$/
                if (!re.test(value)) {
                    validated.valid = false;
                    message = `${name.charAt(0).toUpperCase() + name.slice(1)} must be only numbers`;
                    validated.errMess = [...validated.errMess, message];
                }
                break;
            case 'isEmail':
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!re.test(String(value).toLowerCase())) {
                    validated.valid = false;
                    message = `${name.charAt(0).toUpperCase() + name.slice(1)} must be a valid email address`;
                    validated.errMess = [...validated.errMess, message];
                }
            default: validated.valid = true
        }
    }
    return validated
}
