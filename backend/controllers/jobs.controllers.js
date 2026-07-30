import axios from "axios";
import client from "../db/redis.js";

const jobsController = async (req, res) => {
  const cachedJobs = await client.get("jobs:");

  if (cachedJobs) return res.status(200).json(JSON.parse(cachedJobs));

  const query = "developer jobs in India";
  const THREE_DAYS_IN_SECONDS = 3 * 24 * 60 * 60;
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search-v2",
    params: {
      query,
      num_pages: "3",
      country: "in",
      date_posted: "month",
    },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY1,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(options);

    await client.setEx(
      "jobs:",
      THREE_DAYS_IN_SECONDS,
      JSON.stringify(response.data.data.jobs),
    );

    return res.send(response.data.data.jobs);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch jobs" });
  }
};
export default jobsController;
