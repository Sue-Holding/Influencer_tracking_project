import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to influencer tracking app");
});

router.post("/register", async (req, res) => {
    try {
        const { name, email, } = req.body;
        const trackingId = req.trackingId || req.cookies.trackingId || null;
        console.log(":envelope_with_arrow: Incoming register body:", req.body); // log request body
        const user = await User.create({ name, email, trackingId });
        console.log(":white_check_mark: New user saved:", user); // log saved document
        res.status(201).json(user);
    } catch (err) {
        console.error(":x: Register error:", err.message);
        res.status(400).json({ error: err.message });
    }
});

export default router;