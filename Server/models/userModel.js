import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Enter your first name"],
    },
    lastName: {
        type: String,
        required: [true, "Enter your last name"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "Enter your password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: true,
    },
    accountType: {
        type: String,
        default: "seeker",
    },
    contact: {
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
}, { timestamps: true });

// Middleware to hash password before saving
userSchema.pre("save", async function() {
    if (!this.isModified('password')) return; // Only hash if password is modified

    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
});

// Method to compare password during login
userSchema.methods.comparePassword = async function(userPassword) {
    return await bcrypt.compare(userPassword, this.password);
};

// Method to create JWT
userSchema.methods.createJWT = function() {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
    });
};

const Users = mongoose.model('users', userSchema);

export default Users;