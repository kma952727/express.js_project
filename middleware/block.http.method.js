module.exports = (req, res, next) => {
    if (!['GET', 'PUT', 'POST', 'DELETE'].includes(req.method)) 
        return res.send(405, 'Method Not Allowed');
    return next();
};