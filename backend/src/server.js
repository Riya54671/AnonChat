import express from "express";
import cors from "cors";
import multer from "multer";
import redisClient from "./config/redisClient.js";
import genderRoutes from "./routes/genderRoute.js";
import profileRoutes from "./routes/profile.route.js";
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for frontend requests
app.use(cors());

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Routes with multer
app.use("/api/gender", upload.single("image"), genderRoutes);
app.use("/api/profile", profileRoutes);

// Debug endpoint to check Redis data
app.get("/api/debug/redis/:deviceId", async (req, res) => {
  try {
    const { deviceId } = req.params;
    const gender = await redisClient.get(`gender:${deviceId}`);
    const profile = await redisClient.get(`profile:${deviceId}`);
    res.json({
      deviceId,
      gender: gender || "NOT FOUND",
      profile: profile ? JSON.parse(profile) : "NOT FOUND"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

async function startServer() {
  try {
    await redisClient.connect();
    console.log("✅ Redis connected");

    app.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
    });
  } catch (err) {
    console.error("❌ Failed to connect Redis", err);
  }
}

startServer();

