const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const dotenv = require('./config');
const jwtProvider = require('./common/jwt.provider');
const logRequestTime = require('./middleware/time.middleware');
const errorCode = require('./common/error.code');
const { errorResponse, successResponse } = require('./common/response');
require('./middleware/passport.config')(passport);

app.use((req, res, next) => {
    if (!['GET', 'PUT', 'POST', 'DELETE'].includes(req.method)) 
        return res.send(405, 'Method Not Allowed')
    return next()
});
app.use(bodyParser.json());
app.use(logRequestTime);
app.use(passport.initialize());

app.post('/login',(req, res, next) => {
    passport.authenticate('login', async (error, user, isSuccess) => {  
        if(isSuccess) {
            const [access, refresh] = await jwtProvider.generateToken(user.user_id);
            res.status(200).send(successResponse({access, refresh}));
        }else {
            res.status(400)
                .json(errorResponse({errorCode: errorCode.GENERATE_TOKEN_FAILED, detail: '로그인 실패', httpStatus: 400}));
        }
    })(req, res, next);
});

app.use((req,res,next)=>{
    (passport.authenticate('jwt', { session: false }, (...args) => {
        if(args[1] === false) {
            next(errorResponse(errorCode.DECODED_TOKEN_FAILED, 'invalid Token!', 401));
        } else {
            res.user = args[1];
            next();
        }
    }))(req, res)
});

app.use('/users', require('./routes/user.route'));
app.use('/movies', require('./routes/movie.route'));
app.use((err, req, res, next) => res.status(err.httpStatus).send(err));
app.listen(dotenv.PORT, ()=> console.log(`Listening on Port: ${dotenv.PORT}`));
