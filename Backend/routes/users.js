const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                isLogin: false,
                isAdmin: false,
                message: "Nom d'utilisateur ou mot de passe incorrect.",
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                isLogin: false,
                isAdmin: false,
                message: "Nom d'utilisateur ou mot de passe incorrect.",
            });
        }

        return res.json({
            Id: user._id,
            isLogin: true,
            isAdmin: user.role === "Admin",
        });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        return res.status(500).json({
            isLogin: false,
            isAdmin: false,
            message: "Erreur interne du serveur.",
        });
    }
});

router.post("/signup", async (req, res) => {
    const { username, password, role, class: className } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                message: "Un utilisateur avec ce nom existe déjà.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });

        await newUser.save();

        return res.status(201).json({
            message: "Utilisateur créé avec succès.",
            user: {
                Id: newUser._id,
                username: newUser.username,
                role: newUser.role
            },
        });
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        return res.status(500).json({
            message: "Erreur interne du serveur.",
        });
    }
});

router.get("/", (req, res) => {
    res.json({ message: "Api is working" });
});

module.exports = router;