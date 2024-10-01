import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;

  // Check for the presence of the Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication failed: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);

    // Set user information on req.user instead of req.body.user
    req.user = {
      _id: userToken.userId, // Use _id for consistency
      // You can add more user information here if needed
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Authentication failed: Invalid token" });
  }
};

export default userAuth;