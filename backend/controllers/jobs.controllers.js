import axios from "axios";

const jobsController = async (req, res) => {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search-v2",
    params: {
      query: "developer jobs in India",
      num_pages: "2",
      country: "us",
      date_posted: "all",
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

export default jobsController;
