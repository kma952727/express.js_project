const userSummary = (data) => {
    return {
        username: data.username,
    }
};

const getUserRequest = (data) => {
    return {
        userId: data.userId
    }
};

const signUpRequest = (data) => {
    return {
        username: data.username,
        password: data.password, 
    }
};

module.exports = {
    userSummary,
    signUpRequest,
    getUserRequest 
};