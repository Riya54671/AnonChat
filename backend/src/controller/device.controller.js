import redisClient from "../redisClient.js";

export const registerDevice = async (req, res) => {
  const { deviceId } = req.body;

  await redisClient.set(
    `device:${deviceId}`,
    "active",
    { EX: 86400 } // 24 hours
  );

  res.json({ success: true });
};
