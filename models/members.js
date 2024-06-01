const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//define model schema
const memberSchema = new mongoose.Schema ({
    firstname:{
        type:String,
        required:true 
    },
    lastname:{
        type:String,
        required:true 
    },
    adharcard:{
        type:String,
        required:true,
        unique:true 
    },
    mobilenumber:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true
        
    },
    gender:{
        type:String,
        enum:['male','female','other'],
        required:true 
    },
    address:{
        type:String
    },
    emergencymobile:{
        type:String
    },
    birthdate:{
        type:Date,
        required:true
    },
    bloodgroup:{
        type:String
    }

})



//creating staff model 
const member = mongoose.model('member', memberSchema);
module.exports = member;