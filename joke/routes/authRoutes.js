const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../middleware/authMiddleware');
const cors = require('cors');

const hardcodedUser = new User('admin@admin.com', 'admin123');
router.use(cors());


router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    if (email !== hardcodedUser.email || password !== 'admin123') {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token only if credentials match
    const token = generateToken(hardcodedUser);
    res.json({ token });
});

module.exports = router;

