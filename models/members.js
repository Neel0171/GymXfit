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
        enum:['Male','Female','Other'],
        required:true 
    },
    emergencyrelation:{
        required:true,
        enum:['MOTHER','FATHER','SON','DAUGHTER','BROTHER','SISTER','UNCLE','AUNTY','WIFE','HUSBAND','GRANDFATHER','GRANDMOTHER','GRANDCHILD','NEIGHBOUR','FRIEND'],
        type:String

    },
    emergencymobile:{
        type:String
    },
    joiningdate:{
        required:true,
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