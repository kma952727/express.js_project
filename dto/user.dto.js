exports.userDetail = (data) => {
    return {
        userId: data.user_id,
        username: data.username,
        password: data.password,
        registerData: data.register_date,
        account: data.account,
        mail: data.mail,
        isVerifiedMail: data.isVerifiedMail
    }
}
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
        mail: data.mail,
    }
};
exports.updateRequest = (data, userId) => {
    return { 
        userId: userId,
        mail: data.mail 
    }
};

exports.signUpResponse = (userId) => {
    return { userId: userId }
}