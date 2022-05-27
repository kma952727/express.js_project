
// convert array to object if arrayLength is 1
const arrayToObject = (data) => {
    if(data.length === 0 && typeof data === 'array')
        return array[0]
    else   
        return data
}

const successResponse = (data) =>{
    return { 
        detail: arrayToObject(data),
        httpStatus: 201
    }
};
const errorResponse = (errorCode, detail, httpStatus) => {
    return { errorCode, detail, httpStatus }
};

module.exports = { successResponse, errorResponse }