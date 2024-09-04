import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "enter your first name"],
    },
    lastName: {
        type:String,
        required: [true, "enter your last name"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "enter your password"],
        minlength: [6, " enter your password"],
        select: true,
    },
    accountType:{
        type: String,
        default: "seeker"
    },
    contact:{
        type: String,
    },
    location: {
        type: String,
    },
    profileUrl: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
    about: {
        type: String,
    },
  }
  , {timestamps: true}
);

userSchema.pre("save", async function(){

    if(!this.isModified) return;

    const salt = await bcrypt.hash(this.password, salt);
});

// compare password during login

userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);

    return isMatch;
    
};

// JWT TOKEN
userSchema.methods.createToken = async function() {
    return JWT.sign({userId: this._id}, process.env.JWT_SECRET_KEY,{
     expiresIn: "1d",   
    });
    
};

const Users = mongoose.model('users', userSchema);

export default Users;