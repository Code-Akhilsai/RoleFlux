import { SavedJob } from "../models/savedjobs.models.js";

const savedjobsController = async (req, res) => {
  const { jobs } = req.body;
  const { _id } = req.user ?? {};

  try {
    if (!_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    await SavedJob.findOneAndUpdate(
      { userId: _id },
      { $set: { jobs } },
      { upsert: true, new: true },
    );

    return res.status(200).json({ message: "Successfully saved" });
  } catch (error) {
    console.error("Save job error:", error);
    return res.status(500).json({ message: "Failed to save" });
  }
};

// GET - Fetch saved jobs
const getSavedJobsController = async (req, res) => {
  const { _id } = req.user ?? {};

  try {
    if (!_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const savedJobsDoc = await SavedJob.findOne({ userId: _id });

    if (!savedJobsDoc) {
      return res.status(200).json({ jobs: [] });
    }

    return res.status(200).json({ jobs: savedJobsDoc.jobs });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch saved jobs" });
  }
};

export { savedjobsController, getSavedJobsController };
