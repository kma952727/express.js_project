const app = require('express')();
const bodyParser = require('body-parser');
const passport = require('passport');
const dotenv = require('./config/env');
const passportProvider = require('./middleware/passport.provider');
const blockHttpMethod = require('./middleware/block.http.method');
const logRequestTime = require('./middleware/time.middleware');
require('./config/passport.config')(passport);

app.use(blockHttpMethod);
app.use(logRequestTime);
app.use(bodyParser.json());
app.use(passport.initialize());

app.post('/login',passportProvider.login);
app.use(passportProvider.verifiedJWT);

app.use('/users', require('./routes/user.route'));
app.use('/movies', require('./routes/movie.route'));
app.use((err, req, res, next) => res.status(err.httpStatus).send(err));
app.listen(dotenv.PORT, ()=> console.log(`Listening on Port: ${dotenv.PORT}`));
