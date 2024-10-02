const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('jsonwebtoken'); 



//Registration Controller

exports.registerUser = async(req,res) =>{

const {username,email,password}=req.body;

    try{
        //Check if user already exists
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message:'User already exists '})
        }

        //Hash paswword
        const hashedPassword = await bcrypt.hash(password,10);

        //Create a new user
        const newUser= new User({
            username,
            email,
            password:hashedPassword,
        });

        //Save the user to the database
        await newUser.save();
        res.status(201).json({message:'User registred successfully'})


    }

    catch(error){
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
}


//Login Controller

exports.loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try{
        //Check if user exists
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message:'Invalid credentilas'})
        }
        //Check password
        const isPassworValid= await bcrypt.compare(password,user.password);
        if(!isPassworValid){
            return res.status(400).json({message:'Invalid credantials'})

        }
        //Generate a token

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    }

    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });

    }
};