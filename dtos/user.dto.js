exports.userSummary = (data) => {
    return { username: data.username }
};

exports.getUserRequest = (data) => {
    return { userId: data.userId }
};

exports.signUpRequest = (data) => {
    return {
        username: data.username,
        password: data.password, 
    }
};