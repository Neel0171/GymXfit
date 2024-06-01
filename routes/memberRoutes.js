const express = require('express');
const router = express.Router();
const member = require('./../models/members')

router.post('/', async(req,res) =>{
    try{
        const data = req.body //assuming reqest body contains member data 

        const newmember = new member(data); //create a new member document using mongoose model
        
        const response = await newmember.save(); //save new member to database   
        console.log("data saved");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
    
})

//get method to get the member
router.get('/' , async(req,res)=>{
    try{
        const data = await member.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

// router.get('/:roleType', async(req,res)=>{
//     try{
//         const roleType = req.params.roleType;   //extracts staff details acording unique email URL parameters

//         if (roleType =='superadmin' || roleType =='manager' || roleType =='trainer'){
//             const response = await staff.find({role: roleType});
//             console.log('response fetched');
//             res.status(200).json(response);
//         }else{
//             res.status(404).json({error:'invalid role'});
//         }

//     }catch(err){
//         console.log(err);
//         res.status(500).json({error:'internal server error'});
//     }
// })


// put method : update

router.put('/:id', async(req,res)=>{
    try{ 
        const memberId = req.params.id; //extracts id from URL parameters
        const updatedmemberData = req.body; //updated data for the member
        
        const response = await member.findByIdAndUpdate( memberId, updatedmemberData,{
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
        const memberId = req.params.id; //extracts id from URL parameters

        const response = await member.findByIdAndDelete(memberId);

        if (!response){
            return res.status(404).json({error:'person not found'});
        }

        console.log("data deleted");
        res.status(200).json({message:"member data deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

module.exports=router;