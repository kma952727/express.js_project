
// convert array to object if arrayLength is 1
const arrayToObject = (data) => {
    if(data.length === 0 && typeof data === 'array')
        return array[0]
    else   
        return data
}

exports.successResponse = (data) => {
    return { 
        detail: arrayToObject(data),
        httpStatus: 201
    }
};
exports.errorResponse = (errorCode, detail, httpStatus) => {
    return { errorCode, detail, httpStatus }
};