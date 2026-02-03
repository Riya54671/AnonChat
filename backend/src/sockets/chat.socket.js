import redisClient from "../config/redisClient.js";

export const chatSocket = (io) => {
  io.on("connection", (socket) => {

    // 1️⃣ JOIN CHAT ROOM
    socket.on("join-room", async ({ roomId, deviceId }) => {
      const banned = await redisClient.get(`ban:${deviceId}`);
      if (banned) {
        socket.emit("banned");
        socket.disconnect();
        return;
      }

      socket.join(roomId);
      socket.roomId = roomId;
      socket.deviceId = deviceId;

      socket.emit("joined-room");
    });

    // 2️⃣ SEND MESSAGE
    socket.on("send-message", (message) => {
      socket.to(socket.roomId).emit("receive-message", message);
    });

    // 3️⃣ LEAVE CHAT
    socket.on("leave-chat", async () => {
      socket.leave(socket.roomId);
      socket.to(socket.roomId).emit("partner-left");

      await redisClient.del(`room:${socket.roomId}`);
    });

    // 4️⃣ REPORT USER
    socket.on("report-user", async (reportedDeviceId) => {
      const count = await redisClient.incr(`report:${reportedDeviceId}`);

      if (count > 5) {
        await redisClient.set(`ban:${reportedDeviceId}`, "true");
      }
    });

    // 5️⃣ NEXT CHAT (WITH COOLDOWN)
    socket.on("next-chat", async ({ preference }) => {
      const cooldown = await redisClient.get(`cooldown:${socket.deviceId}`);
      if (cooldown) {
        socket.emit("cooldown-active");
        return;
      }

      // Set cooldown
      await redisClient.set(
        `cooldown:${socket.deviceId}`,
        "true",
        { EX: 30 }
      );

      // Leave current room
      socket.leave(socket.roomId);
      socket.to(socket.roomId).emit("partner-left");

      // Requeue user
      await redisClient.rpush(`queue:${preference}`, socket.deviceId);

      socket.emit("requeued");
    });

    // 6️⃣ HANDLE DISCONNECT
    socket.on("disconnect", async () => {
      if (socket.roomId) {
        socket.to(socket.roomId).emit("partner-left");
        await redisClient.del(`room:${socket.roomId}`);
      }
    });
  });
};
