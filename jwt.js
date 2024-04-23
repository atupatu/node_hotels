const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {

    //first check request header has authorization or not
    // Extract jwt token from the request header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}

const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET);
}

module.exports = { jwtAuthMiddleware, generateToken };
