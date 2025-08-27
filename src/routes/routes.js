import express from "express";
import User from "../models/User.js";
import TrackingSession from "../models/TrackingSession.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("landingpage", { message: null, title: "Registrering" });
});

router.get("/sessions", async (req, res) => {
  try {
    const sessions = await TrackingSession.find();
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/users-with-tracking", async (req, res) => {
    try {
        const users = await User.find();
        const enrichedUsers = await Promise.all(
            users.map(async (user) => {
                const session = await TrackingSession.findOne({ trackingId: user.trackingId });
                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    trackingId: user.trackingId,
                    createdAt: user.createdAt,
                    influencer: session?.influencer || null,
                    source: session?.source || null,
                };
            })
        );

        res.json(enrichedUsers);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // to use tracking id from middleware or cookies
        const trackingId = req.trackingId || req.cookies.trackingId || null;

        console.log("Incoming register body:", req.body); // log request body

        const session = trackingId
        ? await TrackingSession.findOne ({ trackingId })
        : null ;

        const user = await User.create({ 
            name, 
            email, 
            password,
            trackingId, 
        });
        console.log("New user saved:", user); // log saved document

        res.status(201).json(user);
    } catch (err) {
        console.error("Register error:", err.message);
        res.status(400).json({ error: err.message });
    }
});

router.get("/influencer-stats", async (req, res) => {
    try {
        const stats = await User.aggregate([
            {
            $lookup: {
                from: "trackingsessions",
                localField: "trackingId",
                foreignField: "trackingId",
                as: "session",
            },
        },
        { $unwind: "$session" },
        {
            $group: {
                _id: { influencer: "$session.influencer", source: "$session.source" },
                usersCount: { $sum: 1 }
            },
        },
        { $sort: { usersCount: -1 } },
        ]);

        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;