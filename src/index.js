import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/routes.js";
import cookieParse from "cookie-parser";
import trackingMiddleware from "./middleware/trackingMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());
app.use(trackingMiddleware);

connectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// tell express to use EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use("/", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));