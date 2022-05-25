const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
logRequestTime = require('./middleware/time.middleware'),
dotenv = require('./config');
userRoute = require('./routes/user.route');

//  Use MiddleWare
app.use(bodyParser.json());
app.use(logRequestTime);
//  Use Router
app.use('/users', userRoute);

//  Listening
app.listen(dotenv.PORT, ()=> {
    console.log(`Listening on Port: ${dotenv.PORT}`);
});