const express = require('express');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Protected Route: Get User Profile
router.get('/profile', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Profile data', user: req.user });
});



module.exports = router;
