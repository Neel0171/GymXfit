const express = require('express')
const app = express();
const db = require("./db");
const passport = require("./auth");
const bodyParser = require('body-parser');
app.use(bodyParser.json())


//Middleware Function
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); // move on next phase
}
app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/',function (req, res) {
    res.send('Hello World')
})

//import router files
const staffRoutes = require('./routes/staffRoutes');

//use routes
app.use('/staff',localAuthMiddleware,staffRoutes);


//showing the port is listening
app.listen(3000,()=>{
    console.log("listening on port 3000");
})

