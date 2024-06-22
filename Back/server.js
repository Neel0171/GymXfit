const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');


const app = express();
const port = 3005;

// Database connection (ensure you have db.js properly configured)
const db = require("./db");

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Middleware function to log requests
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); // move on next phase
};
app.use(logRequest);

// Serve static files from the uploads directory
app.use('/uploads', express.static(uploadsDir));

// Import router files
const staffRoutes = require('./routes/staffRoutes');
const memberRoutes = require('./routes/memberRoutes');
const addressRoutes = require('./routes/addressRoutes');

// Use routes
app.use('/api', staffRoutes);
app.use('/staff', staffRoutes);
app.use('/member', memberRoutes);
app.use('/address', addressRoutes);

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app.js'));
});

// Start the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
