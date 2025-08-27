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
    createdAt: { type: Date, default: Date.now, expires: 24 * 60 * 60 }, //to save for only 24hrs
});

export default mongoose.model("TrackingSession", trackingSessionSchema)