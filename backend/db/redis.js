import { createClient } from "redis";

const client = createClient({
  url: process.env.REDIS_URL_KEY,
  socket: {
    keepAlive: 30000,
    reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
  },
  pingInterval: 40000,
});

client.on("error", (err) => console.log("Redis Client Error", err));

await client.connect();

export default client;
