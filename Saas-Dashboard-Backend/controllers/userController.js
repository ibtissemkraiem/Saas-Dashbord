

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

const getTotalUsers = async(req,res)=>{
    try{
        const totalUsers = await User.countDocuments();
        res.status(200).json({totalUsers});

    }
    catch(error){
        res.status(500).json({message:'Error retreiving Total users', error})

    }
}

//Get numbers of active Users
const getActiveUsers= async(req,res)=>{
    try{
        const activeUsers = await User.countDocuments({isActive:true});
        res.status(200).json({activeUsers});

    }
    catch{
        res.status(500).json({ message: 'Error retrieving active users', error });

    }
}
// Get number of new users in the last 7 days
const getNewUsers = async (req, res) => {
    try {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7); // Date for 7 days ago
  
      const newUsers = await User.countDocuments({ createdAt: { $gte: lastWeek } });
      res.status(200).json({ newUsers });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving new users', error });
    }
  };

module.exports={
    getUsers,
    getUserById,
    UpdateUser,
    deleteUser,
    getTotalUsers,
    getActiveUsers,
    getNewUsers

};

