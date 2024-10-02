const express = require('express');
const { getUsers, getUserById, UpdateUser, deleteUser } = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
 // JWT middleware to protect routes

const router = express.Router();

// Route to get all users (GET)
router.get('/', verifyToken, getUsers);

// Route to get a user by ID (GET)
router.get('/:id', verifyToken, getUserById);

// Route to update a user (PUT)
router.put('/:id', verifyToken, UpdateUser);

// Route to delete a user (DELETE)
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;
