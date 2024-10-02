

const User = require('../models/User');


//Get All Users

const getUsers= async(req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);



    }
    catch(
        error){
            res.status(500).json({message:'Error fetching users', error});

    }
};

//Get user by Id
const  getUserById = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message:'User not Found'});
        res.status(200).json(user);

    }
    catch(error){
        res.status(500).json({message: 'Error fetching user', error});
    }
};

//Update User
const UpdateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);  // Log the actual error
        res.status(500).json({
            message: 'Error updating user',
            error: error.message || 'Internal Server Error',
        });
    }
};


//Delete User
const deleteUser = async(req, res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(!deletedUser) return res.status(404).json({message:'User not Found'});
        res.status(200).json({message:'User Deleted Successfully'});


    }
    catch(error){
        res.status(500).json({ message: 'Error deleting user', error });

    }
};

module.exports={
    getUsers,
    getUserById,
    UpdateUser,
    deleteUser,
};

