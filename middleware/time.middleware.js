const logRequestTime = (req, res, next) => {
    console.log(`${new Date()} ${req.path}`);
    next();
}

module.exports = logRequestTime;