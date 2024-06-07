const express = require('express');
const router = express.Router();
const address = require('./../models/address')

router.post('/', async(req,res) =>{
    try{
        const data = req.body;

        const newAddress = new address(data);
        
        const response = await newAddress.save(); 
        console.log("data saved");
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
    
})


router.get('/' , async(req,res)=>{
    try{
        const data = await address.find();
        console.log("data fetched");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})


// put method : update

router.put('/:id', async(req,res)=>{
    try{ 
        const addressId = req.params.id; //extracts id from URL parameters
        const updatedaddressData = req.body; //updated data 
        
        const response = await address.findByIdAndUpdate(addressId, updatedaddressData,{
            new:true, //returns updated document
            runValidators:true, //run mongoose validation

        })

        if (!response){
            return res.status(404).json({error:'address not found'});
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
        const addressId = req.params.id; //extracts id from URL parameters

        const response = await address.findByIdAndDelete(addressId);

        if (!response){
            return res.status(404).json({error:'address not found'});
        }

        console.log("data deleted");
        res.status(200).json({message:"address data deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

module.exports=router;