const errorCode = require('./common/error.code');
const { errorResponse, successResponse } = require('./common/response');

const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
passport = require('./middleware/passport.config'),
jwtProvider = require('./common/jwt.provider');
dotenv = require('./config');
logRequestTime = require('./middleware/time.middleware');

/** Middle */
app.use(bodyParser.json());
app.use(logRequestTime);
app.use(passport.initialize());  

/** Login */
app.post('/login',(req, res, next) => {
    passport.authenticate('local', async (error, user, isSuccess) => {
        if(isSuccess) {
            const [access, refresh] = await jwtProvider.generateToken(user.user_id);
            res.status(200).json(successResponse({access, refresh}));
        }else {
            res.status(400)
                .json(errorResponse({errorCode: errorCode.GENERATE_TOKEN_FAILED, detail: '로그인 실패', httpStatus}));
        }
    })(req, res, next);
});

/** JWT Authentication */
app.use(async(req, res, next) => {
    const result = await jwtProvider.isVerifiedToken(req.headers.accesstoken, req.headers.refreshtoken);
    if(!result.isSuccess)
        res.status(400).send(errorResponse(result.errorData, result.message, result.httpStatus)); 
    else
        next();   
});

/** Route */
app.use('/users', require('./routes/user.route'));
app.use('/movies', require('./routes/movie.route'));
app.use((err, req, res, next) => res.status(err.httpStatus).send(err));

app.listen(dotenv.PORT, ()=> console.log(`Listening on Port: ${dotenv.PORT}`));
