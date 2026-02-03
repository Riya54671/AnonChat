import genderService from "../services/genderService.js";
import redisClient from "../config/redisClient.js";

export const verifyGender = async (req, res) => {
  try {
    const { deviceId } = req.body;
    const image = req.file; 

    console.log("Verification request - deviceId:", deviceId, "image:", image ? "received" : "missing");

    if (!deviceId || !image) {
      return res.status(400).json({ error: "Invalid request", success: false });
    }

    const alreadyVerified = await redisClient.get(`verified:${deviceId}`);
    if (alreadyVerified) {
      return res.status(403).json({ error: "Already verified", success: false });
    }

    const result = await genderService.verifyGender(image.path);
    console.log("Gender service result:", result);

    if (!result || !result.gender) {
      throw new Error("Invalid response from AI service: " + JSON.stringify(result));
    }

    await redisClient.set(`gender:${deviceId}`, String(result.gender));
    await redisClient.set(`verified:${deviceId}`, 'true');

    res.json({
      success: true,
      gender: result.gender
    });

  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ error: err.message || "Verification failed", success: false });
  }
};

export const getVerificationStatus = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const verified = await redisClient.get(`verified:${deviceId}`);
    const gender = await redisClient.get(`gender:${deviceId}`);
    
    res.json({
      verified: !!verified,
      gender: gender || null
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to get status" });
  }
};
