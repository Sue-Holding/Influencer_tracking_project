import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to influencer tracking app");
});

router.post("/register", async (req, res) => {
    try {
        const { name, email } = req.body;
        // to use tracking id from middleware or cookies
        const trackingId = req.trackingId || req.cookies.trackingId || null;

        const user = await User.create({ name, email, trackingId });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;