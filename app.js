const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
logRequestTime = require('./middleware/time.middleware'),
dotenv = require('./config');

//  MiddleWare
app.use(bodyParser.json());
app.use(logRequestTime);
//  Router
app.use('/users', require('./routes/user.route'));
//  Listening
app.listen(dotenv.PORT, ()=> {
    console.log(`Listening on Port: ${dotenv.PORT}`);
});