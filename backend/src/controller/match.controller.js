import redisClient from "../redisClient.js";
import { v4 as uuid } from "uuid";

export const findMatch = async (req, res) => {
  const { deviceId, preference } = req.body;

  const banned = await redisClient.get(`ban:${deviceId}`);
  if (banned) {
    return res.status(403).json({ error: "Banned" });
  }

  const queueKey = `queue:${preference}`;

  const partner = await redisClient.lpop(queueKey);

  if (!partner) {
    await redisClient.rpush(queueKey, deviceId);
    return res.json({ matched: false });
  }

  const roomId = uuid();

  await redisClient.set(
    `room:${roomId}`,
    JSON.stringify([deviceId, partner]),
    { EX: 3600 }
  );

  res.json({
    matched: true,
    roomId
  });
};
