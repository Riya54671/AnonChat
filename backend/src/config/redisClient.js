import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
});

redisClient.on("connect", () => {
  console.log("✅ Connected to Memurai (Redis)");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

export default redisClient;
