import JWT from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const authHeader = req?.headers?.authorization;

    // Check if the authorization header is present and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication failed, token required" });
    }

    // Extract the token from the header
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token
        const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

        // Attach user ID to the request body
        req.body.user = {
            userId: userToken.userId
        };
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Authentication failed" });
    }
};

export default userAuth;