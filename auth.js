const passport= require('passport');
const LocalStrategy = require('passport-local').Strategy;
const staff = require('./models/staff'); //adjust path as needed


passport.use(new LocalStrategy(async(username, password , done)=>{
    //authentication logic
    try{
        // console.log('Recieved Credientials:',username,password);
        const user = await staff.findOne({username});
        if(!user)
            return done(null,false,{message:'incorrect username.'});
        

        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'incorrect password.'});
        }    

    }catch(err){
        return done(err);
    }
}))

module.exports = passport; 

