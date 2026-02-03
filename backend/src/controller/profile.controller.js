import redisClient from "../config/redisClient.js";

export const createProfile = async (req, res) => {
  try {
    const { deviceId, nickname, bio } = req.body;
    console.log("📝 Profile creation request:", { deviceId, nickname });

    // Basic validation
    if (!deviceId || !nickname || !bio) {
      return res.status(400).json({ error: "Missing fields" });
    }

    if (nickname.length > 30 || bio.length > 500) {
      return res.status(400).json({ error: "Input too long" });
    }

    // Check gender verification
    console.log("🔍 Checking gender verification for deviceId:", deviceId);
    const gender = await redisClient.get(`gender:${deviceId}`);
    if (!gender) {
      console.log("❌ Gender not verified for deviceId:", deviceId);
      return res.status(403).json({ error: "Gender not verified" });
    }
    console.log("✅ Gender verified:", gender);

    // Save profile
    const profile = {
      nickname,
      bio,
      gender
    };

    await redisClient.set(
      `profile:${deviceId}`,
      JSON.stringify(profile)
    );
    console.log("✅ Profile saved to Redis:", { deviceId, nickname });

    res.json({ success: true });

  } catch (err) {
    console.error("❌ Profile creation error:", err.message);
    res.status(500).json({ error: "Profile creation failed: " + err.message });
  }
};
