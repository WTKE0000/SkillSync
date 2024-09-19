import Users from "../models/userModel.js";

export const register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    // Validate fields
    if (!firstName) {
        return next("First Name is Required");
    }
    if (!email) {
        return next("Email is required");
    }
    if (!lastName) {
        return next("Last Name is required");
    }
    if (!password) {
        return next("Password is required");
    }

    try {
        const userExist = await Users.findOne({ email });
        if (userExist) {
            return next("Email already exists");
        }

        // Create user
        const user = await Users.create({
            firstName,
            lastName,
            email,
            password,
        });

        // Generate user token
        const token = user.createJWT(); // Call method with parentheses

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accountType: user.accountType,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message }); // Use 500 for server errors
    }
};

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return next("Please provide all the user credentials");
        }

        // Find user by email
        const user = await Users.findOne({ email }).select("+password");

        if (!user) {
            return next("Invalid email or password");
        }

        // Compare password
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return next("Invalid email or password");
        }

        user.password = undefined; // Clear the password field
        const token = user.createJWT(); // generating json web token

        return res.status(200).json({ // Use 200 for successful login
            success: true,
            message: "Login successful",
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message }); // Use 500 for server errors
    }
};