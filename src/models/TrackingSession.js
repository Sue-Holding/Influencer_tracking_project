import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const trackingSessionSchema = new mongoose.Schema({
    trackingId: {
        type: String,
        default: () => uuidv4(),
        unique: true,
    },
    influencer: { type: String, required: true },
    source: { type: String, required: true },
    ipAdress: { type: String},
    createdAt: { type: Date, default: Date.now, expires: 15 * 60 }, //to expire after 15 minutes
});

export default mongoose.model("TrackingSession", trackingSessionSchema)