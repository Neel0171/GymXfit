const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    salary:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:['superadmin','manager','trainer'],
        required:true
    },
    username:{
        required:true,
        type:String

    },
    password:{
        required:true,
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


staffSchema.pre('save',async function(next){
    const Staff = this;

    //hash the password only if it has been modified (or is new)
    if (!Staff.isModified('password')) return next();

    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedpassword = await bcrypt.hash(Staff.password, salt);

        //override plain password with hashedpassword
        Staff.password = hashedpassword;

        next();
    }catch(err){
        return next(err);
    }
})


staffSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //used bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

//creating staff model 
const staff = mongoose.model('staff', staffSchema);
module.exports = staff;