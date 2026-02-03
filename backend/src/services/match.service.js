import redisClient from "../redisClient.js";
import { v4 as uuidv4 } from "uuid";

export const matchUser = async (deviceId, preference) => {
  const queueKey = `queue:${preference}`;

  // Check if someone is already waiting
  const waitingUser = await redisClient.rPop(queueKey);

  if (waitingUser) {
    // MATCH FOUND 🎉
    const roomId = uuidv4();

    return {
      matched: true,
      roomId,
      users: [waitingUser, deviceId]
    };
  } else {
    // No match → add to queue
    await redisClient.lPush(queueKey, deviceId);

    return {
      matched: false,
      message: "Waiting for partner"
    };
  }
};
