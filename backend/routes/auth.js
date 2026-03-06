const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

/*
REGISTER
*/
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, companyId } = req.body;

        if (!name || !email || !password || !companyId) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // default role
        const role = "user";

        const user = new User({
            name,
            email,
            password,
            role,
            companyId
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({
            error: "Server error during registration"
        });
    }
});


/*
LOGIN
*/
router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                companyId: user.companyId
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                companyId: user.companyId
            }
        });

    } catch (err) {
        console.error("Login Error:", err);

        res.status(500).json({
            error: "Server error during login"
        });
    }
});

/*
UPDATE PROFILE
*/
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

router.put('/update', authMiddleware, async (req, res) => {
    try {
        const { name, companyId } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ error: "User not found" });

        if (name) user.name = name;
        if (companyId) user.companyId = companyId;

        await user.save();

        res.json({
            message: "Profile updated successfully",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                companyId: user.companyId
            }
        });
    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ error: "Server error during profile update" });
    }
});

module.exports = router;