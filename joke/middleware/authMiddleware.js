const jwt = require('jsonwebtoken');
const {json} = require("express");
function generateToken(user) {
    return jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    if (!token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }

    const tokenValue = token.slice(7);

    jwt.verify(JSON.parse(tokenValue), process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('JWT Verify Error:', err);
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded;
        next();
    });
}

module.exports = {
    generateToken,
    verifyToken
};
