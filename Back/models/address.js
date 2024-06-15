const mongoose = require('mongoose');

const states = [
    'Andaman and Nicobar Islands','Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat','Delhi',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh','Dadra and Nagar Haveli','Jammu & Kashmir',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab','Daman and Diu',' Lakshadweep',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

//define model schema
const addressSchema = new mongoose.Schema ({
    addresstype:{
        type:String,
        enum:['Billing Address','Member Address','Invoice Address','Staff Address'],
        required:true 
    },
    state:{
        type:String,
        enum:states,
        required:true 
    },
    city:{
        type:String,
        required:true, 
    },
    flat_house_building_name: {
        type: String,
        required:true
      },
    area_street_name:{
    type: String,
    required:true
    },
    pincode: {
        type: String,
        required:true
    }

})


//creating staff model 
const address = mongoose.model('address', addressSchema);
module.exports = address;