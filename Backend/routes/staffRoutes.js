const express = require('express');
const router = express.Router();
const staff = require('./../models/staff')

router.post('/', async(req,res) =>{
    try{
        const data = req.body //assuming reqest body contains staff data 

        const newstaff = new staff(data); //create a new staff document using mongoose model
        
        const response = await newstaff.save(); //save new staff to database   
        console.log("data saved");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
    
})

//get method to get the staff member
router.get('/' , async(req,res)=>{
    try{
        const data = await staff.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

router.get('/:roleType', async(req,res)=>{
    try{
        const roleType = req.params.roleType;   //extracts staff details acording unique email URL parameters

        if (roleType =='superadmin' || roleType =='manager' || roleType =='trainer'){
            const response = await staff.find({role: roleType});
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'invalid role'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})


//put method : update

router.put('/:id', async(req,res)=>{
    try{ 
        const staffId = req.params.id; //extracts id from URL parameters
        const updatedStaffData = req.body; //updated data for the staff
        
        const response = await staff.findByIdAndUpdate( staffId, updatedStaffData,{
            new:true, //returns updated document
            runValidators:true, //run mongoose validation

        })

        if (!response){
            return res.status(404).json({error:'person not found'});
        }

        console.log("response updated");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

//DELETE method

router.delete('/:id', async(req,res)=>{
    try{
        const staffId = req.params.id; //extracts id from URL parameters

        const response = await staff.findByIdAndDelete(staffId);

        if (!response){
            return res.status(404).json({error:'person not found'});
        }

        console.log("data deleted");
        res.status(200).json({message:"staff data deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

module.exports=router;