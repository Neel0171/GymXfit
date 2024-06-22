const mongoose = require('mongoose');
//define model schema

const rel =  [
    'mother',
    'father',
    'son',
    'daughter',
    'brother',
    'sister',
    'uncle',
    'aunty',
    'wife',
    'husband',
    'grandfather',
    'grandmother',
    'grandchild',
    'neighbour',
    'friend'];

const staffSchema = new mongoose.Schema ({
    firstName:{
        type:String,
        required:true 
    },
    lastName:{
        type:String,
        required:true 
    },
    aadhaarNumber:{
        type:String,
        required:true,
        unique:true 
    },
    mobileNumber:{
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
    salary:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:['admin','trainer','super','receptionist'],
        required:true
    },
    emergencyRelation:{
        required:true,
        enum:rel,
        type:String

    },
    joiningDate:{
        required:true,
        type:String
    },
    leavingDate:{
        type:String
    },
    emergencyMobile:{
        type:String
    },
    birthdate:{
        type:Date,
        required:true
    },
    shift:{
        type:String,
        enum:['morning','evening','fullday'],
        required:true
    },
    bloodGroup:{
        type:String
    },
    image: {
        type: String // field to store the image path
    }


})



//creating staff model 
const staff = mongoose.model('staff', staffSchema);
module.exports = staff;