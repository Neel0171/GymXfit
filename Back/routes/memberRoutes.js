const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const member = require('./../models/members')


// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

// POST route to add a new staff member with image
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const data = req.body; // Assuming request body contains staff data
        if (req.file) {
            data.image = req.file.path; // Add image path to data
        }
        const newMember = new member(data); // Create a new staff document using mongoose model
        const response = await newMember.save(); // Save new staff to database
        console.log("Data saved");
        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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

// GET method to get staff member by ID
router.get('/:id', async (req, res) => {
    try {
        const memberId = req.params.id;
        const response = await member.findById(memberId);
        if (!response) {
            return res.status(404).json({ error: 'member not found' });
        }
        console.log('Member details fetched');
        res.status(200).json(response);
    } catch (err) {
        console.error('Error fetching member details:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/role/:roleType', async(req,res)=>{
    try{
        const roleType = req.params.roleType;   //extracts staff details acording unique email URL parameters

        if (roleType =='superadmin' || roleType =='manager' || roleType =='trainer'){
            const response = await member.find({role: roleType});
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


// put method : update


router.put('/:id', async(req,res)=>{
    try{ 
        const memberId = req.params.id; //extracts id from URL parameters
        const updatedMemberData = req.body; //updated data for the member
        
        const response = await member.findByIdAndUpdate( memberId, updatedMemberData,{
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