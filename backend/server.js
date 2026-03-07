const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customers");

dotenv.config();

const app = express();

/* ================= CORS CONFIG ================= */

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://churn-ai-platform.vercel.app",
    "https://churn-ai-platform-5bslmi6rt-devesh-2005pcs-projects.vercel.app"
];

app.use(
    cors({
        origin: function (origin, callback) {

            // allow requests with no origin (like Postman)
            if (!origin) return callback(null, true);

            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("CORS Not Allowed"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

/* =============================================== */

app.use(express.json());

/* Health Check */
app.get("/", (req, res) => {
    res.json({
        message: "AI Churn Predictor API is running 🚀"
    });
});

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);

/* PORT */
const PORT = process.env.PORT || 5000;

/* MongoDB Connection */
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });