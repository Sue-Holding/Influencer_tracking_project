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
    createAt: { type: Date, default: Date.now },
});

export default mongoose.model("TrackingSession", trackingSessionSchema)