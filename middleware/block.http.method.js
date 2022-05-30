module.exports = (req, res, next) => {
    if (!['GET', 'PUT', 'POST', 'DELETE'].includes(req.method)) 
        return res.status(405).send('Method Not Allowed');
    return next();
};