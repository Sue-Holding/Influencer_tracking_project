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

        // picks up the ip adress for temp storage
        const ipAdress = req.ip || req.connection.remoteAdress;

        // looks for an ip adress if saved to session within the last 24 hrs
        let session = await TrackingSession.findOne({
            ipAdress,
            createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000 )}
        })

        if (!session && influencer && source) {
            session = await TrackingSession.create({ influencer, source, ipAdress });
        }

        if (session) {
            res.cookie("trackingId", session.trackingId, { maxAge: 24 * 60 * 60 * 1000 });
            req.trackingId = session.trackingId;
        }
        next();
    } catch(err) {
        console.error("Tracking middleware error:", err);
        next();
    }
};

export default trackingMiddleware;