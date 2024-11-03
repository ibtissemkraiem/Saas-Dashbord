const express = require('express');
const { getUsers, getUserById, UpdateUser, deleteUser,getTotalUsers,getActiveUsers ,getNewUsers,uploadProfileImage} = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const upload=require('../middleware/multer')
 // JWT middleware to protect routes

const router = express.Router();

// Route to get all users (GET)
router.get('/', verifyToken, getUsers);

router.get('/total-users', verifyToken, getTotalUsers);
router.get('/activetotal-users', verifyToken,getActiveUsers);
router.get('/new-users',verifyToken, getNewUsers);


// Route to get a user by ID (GET)
router.get('/:id', verifyToken, getUserById);

// Route to update a user (PUT)
router.put('/:id', verifyToken, UpdateUser);

// Route to delete a user (DELETE)
router.delete('/:id', verifyToken, deleteUser);

router.post('/upload-image', verifyToken,upload.single('image'),uploadProfileImage)

module.exports = router;
