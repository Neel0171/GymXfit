const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/staff'

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

//event liteners
db.on('connected',()=>{
    console.log("connected to mongoDB server");
})

db.on('error',(err)=>{
    console.log("connection error",err);
})

db.on('disconnected',()=>{
    console.log("mongoDB disconnected");
})

module.exports = db; 