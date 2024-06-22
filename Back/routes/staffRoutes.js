const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const staff = require('./../models/staff');

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
        const newStaff = new staff(data); // Create a new staff document using mongoose model
        const response = await newStaff.save(); // Save new staff to database
        console.log("Data saved");
        res.status(200).json(response);
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add this route to get the total number of staff entries
router.get('/staff/count', async (req, res) => {
    try {
        const count = await Staff.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching staff count' });
    }
});

// GET method to get all staff members
router.get('/', async (req, res) => {
    try {
        const data = await staff.find();
        console.log("Data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET method to get staff member by ID
router.get('/:id', async (req, res) => {
    try {
        const staffId = req.params.id;
        const response = await staff.findById(staffId);
        if (!response) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        console.log('Staff details fetched');
        res.status(200).json(response);
    } catch (err) {
        console.error('Error fetching staff details:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET method to get staff members by role
router.get('/role/:roleType', async (req, res) => {
    try {
        const roleType = req.params.roleType;
        if (roleType == 'superadmin' || roleType == 'manager' || roleType == 'trainer') {
            const response = await staff.find({ role: roleType });
            console.log('Response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid role' });
        }
    } catch (err) {
        console.error('Error fetching data by role:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// PUT method to update staff member
router.put('/:id', async (req, res) => {
    try {
        const staffId = req.params.id;
        const updatedStaffData = req.body;
        const response = await staff.findByIdAndUpdate(staffId, updatedStaffData, {
            new: true, // Returns updated document
            runValidators: true, // Run mongoose validation
        });
        if (!response) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        console.log("Response updated");
        res.status(200).json(response);
    } catch (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE method to delete staff member
router.delete('/:id', async (req, res) => {
    try {
        const staffId = req.params.id;
        const response = await staff.findByIdAndDelete(staffId);
        if (!response) {
            return res.status(404).json({ error: 'Staff not found' });
        }
        console.log("Data deleted");
        res.status(200).json({ message: "Staff data deleted successfully" });
    } catch (err) {
        console.error('Error deleting data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
