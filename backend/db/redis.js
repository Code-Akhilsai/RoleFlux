import { createClient } from "redis";

const client = await createClient({
  url: process.env.REDIS_URL_KEY,
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export default client;
