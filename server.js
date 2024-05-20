const express = require('express')
const app = express();
const db = require("./db");


const bodyParser = require('body-parser');
app.use(bodyParser.json())


app.get('/', function (req, res) {
    res.send('Hello World')
})

//import router files
const staffRoutes = require('./routes/staffRoutes');
//use routes
app.use('/staff',staffRoutes);


//showing the port is listening
app.listen(3000,()=>{
    console.log("listening on port 3000");
})

