const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//define model schema
const memberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    aadhaarNumber: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    emergencyRelation: {
        required: true,
        enum: [
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
        'friend'],
    type: String

},
    emergencyMobile: {
    type: String
},
    joiningDate: {
    required: true,
    type: String
},
    birthdate: {
    type: Date,
    required: true
},
    bloodGroup: {
    type: String
},
    image:{
        type: String // field to store the image path
    }

})



//creating staff model 
const member = mongoose.model('member', memberSchema);
module.exports = member;
