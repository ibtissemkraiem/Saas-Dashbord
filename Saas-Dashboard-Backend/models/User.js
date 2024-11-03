const mongoose=require('mongoose');


const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    password: {
        type: String,
        required: true,
      },
      profileImage:String,
      isActive:{
        type: Boolean,
        default: true,

      }


}
, { timestamps: true });

const User = mongoose.model('User',userSchema);
module.exports=User;