const express = require('express'),
app = express(),
bodyParser = require('body-parser'),
logRequestTime = require('./middleware/time.middleware'),
userRoute = require('./routes/user.route');

require('dotenv').config();
const PORT = process.env.PORT;

//  Use MiddleWare
app.use(bodyParser.json());
app.use(logRequestTime);
app.use('/users', userRoute);

//  Listening Request
app.listen(PORT, ()=> {
    console.log(`Listening on Port: ${PORT}`);
});