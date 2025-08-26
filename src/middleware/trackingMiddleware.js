import TrackingSession from "../models/TrackingSession.js";

const trackingMiddleware = async (req, res, next) => {
    try {
        const { influencer, source, trackingId } = req.query;
        // if there is already a tracking id it won't make a new one
        if (trackingId) {
            // this will attach the tracking id for /register
            req.trackingId = trackingId;
            return next();
        }
        // this is create a new tracking session
        if (influencer && source) {
            const newSession = await TrackingSession.create({ influencer, source });
            // sets cookie to tracking id
            res.cookie("trackingId", newSession.trackingId, { maxAge: 7 * 24 * 60 * 60 * 1000 });
            // this will attach tracking id to the object
            req.trackingId = newSession.trackingId;
        }

        next();
    } catch(err) {
        console.error("Tracking middleware error:", err);
        next();
    }
};

export default trackingMiddleware;