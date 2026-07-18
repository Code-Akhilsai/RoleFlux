import axios from "axios";
import client from "../db/redis.js";

const searchController = async (req, res) => {
  const { searching, jobType, location } = req.query || {};

  const query = searching;
  const employmentTypes = jobType && jobType !== "ALL" ? jobType : "";
  const jobLocation = location || "";

  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search-v2",
    params: {
      query,
      num_pages: "2",
      country: "in",
      date_posted: "month",
      employment_types: employmentTypes,
      location: jobLocation,
    },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.request(options);

    return res.send(response.data.data.jobs);
  } catch (error) {
    console.error(error);
  }
};

export default searchController;
