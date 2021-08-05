export const updateObject = (oldObject,updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}

export const checkValidity = (value,rules) => {
    let isValid = true;
    if(!rules){//For deliveryMethod...cause undefined.required as will happen in below condition will lead to an error
        return true;
    }
    if(rules.required){
        isValid = value.trim() !== '';
    }

    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;//If isValid gets false in any condition then it will stay false no matter what
    }

    if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid;
    }

    if(rules.isEmail){
        const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        isValid = pattern.test(value) && isValid;
    }

    if(rules.isNumeric){
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }
    
    return isValid;
}