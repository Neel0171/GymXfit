const mongoose = require('mongoose');
//define model schema

const rel = ['MOTHER','FATHER','SON','DAUGHTER','BROTHER','SISTER','UNCLE','AUNTY','WIFE','HUSBAND','GRANDFATHER','GRANDMOTHER','GRANDCHILD','NEIGHBOUR','FRIEND'];
const staffSchema = new mongoose.Schema ({
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
        enum:['Male','Female','Other'],
        required:true 
    },
    salary:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:['superadmin','manager','trainer'],
        required:true
    },
    emergencyrelation:{
        required:true,
        enum:rel,
        type:String

    },
    joiningdate:{
        required:true,
        type:String
    },
    leavingdate:{
        type:String
    },
    emergencymobile:{
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
    bloodgroup:{
        type:String
    }


})



//creating staff model 
const staff = mongoose.model('staff', staffSchema);
module.exports = staff;