const express = require('express')
const app = express();
const db = require("./db");
const bodyParser = require('body-parser');
app.use(bodyParser.json())


//Middleware Function
const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); // move on next phase
}
app.use(logRequest);


app.get('/',function (req, res) {
    res.send('Hello World')
})

//import router files
const staffRoutes = require('./routes/staffRoutes');
const memberRoutes = require('./routes/memberRoutes');
const addressRoutes = require('./routes/addressRoutes');

//use routes
app.use('/staff',staffRoutes);
app.use('/member',memberRoutes);
app.use('/address',addressRoutes);

//showing the port is listening
app.listen(3000,()=>{
    console.log("listening on port 3000");
})

