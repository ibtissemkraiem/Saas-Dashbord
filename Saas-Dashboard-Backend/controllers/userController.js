

const User = require('../models/User');
const bcrypt = require('bcrypt');


//Get All Users

const getUsers= async(req,res)=>{
    try{
        const { page = 1, limit = 10 } = req.query;

        const skip  =(page-1)*limit;
        const users = await User.find().skip(skip).limit(Number(limit));
        const total = await User.countDocuments();
        res.json({
            data: users,
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
          });



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
        const updates={...req.body};


        if(updates.password){
            updates.password = await bcrypt.hash(updates.password,10);
        }




        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        
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
//All users
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

  const uploadProfileImage= async(req,res)=>{
    if(!req.file){
        return res.status(400).send('No File uploaded');
    }
    const imagePath= req.file.path;
   const userId = req.user.id;
    //console.log(user.id)
    console.log(req.user)

    console.log(req.user.id)


User.findByIdAndUpdate(userId,{profileImage: imagePath},{new:true})
.then(user=>res.status(200).json({message:'Image Uploaded',user}))
.catch(err=>res.status(500).json({message:'Error Image Updating'}))

  };

module.exports={
    getUsers,
    getUserById,
    UpdateUser,
    deleteUser,
    getTotalUsers,
    getActiveUsers,
    getNewUsers,
    uploadProfileImage

};

