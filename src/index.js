import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/routes.js";
import cookieParse from "cookie-parser";
import trackingMiddleware from "./middleware/trackingMiddleware.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParse());
app.use(trackingMiddleware);

connectDB();

app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));