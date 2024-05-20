const mongoose = require('mongoose');

//define model schema
const staffSchema = new mongoose.Schema ({
    firstname:{
        type:String,
        required:true 
    },
    lastname:{
        type:String,
        required:true 
    },
    Adharcard:{
        type:String,
        required:true,
        unique:true 
    },
    Mobilenumber:{
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
    salary:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:['superadmin','manager','trainer'],
        required:true
    }

})

//creating model 
const staff = mongoose.model('staff', staffSchema);
module.exports = staff;