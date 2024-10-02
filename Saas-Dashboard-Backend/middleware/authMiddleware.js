const jwt = require('jsonwebtoken');


const verifyToken=(req,res,next)=>{

    const token = req.headers['authorization']; // get token

if(!token){
    return res.status(403).json({message:'A token is required for authentication'})
}


    try{
        console.log("Received Token:", token);
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        console.log(decoded)
        req.user= decoded;//Attach decoded to the req



    }

   catch(error) {
    return res.status(401).json({message:'Invalid token'})

   }
   return next();
};

module.exports= verifyToken;


