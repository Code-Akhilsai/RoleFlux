import { SavedJob } from "../models/savedjobs.models.js";

const savedjobsController = async (req, res) => {
  const { jobs } = req.body;
  const { _id, email } = req.user ?? {};
  try {
    if (!_id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    await SavedJob.findByIdAndUpdate(
      _id,
      { $set: { jobs } },
      { upsert: true, new: true },
    );

    return res.status(200).json({ message: "Successfully saved" });
  } catch (error) {
    console.error("Save job error:", error); // ✅ Log actual error
    return res.status(500).json({ message: "Failed to save" }); // Fixed typo
  }
};

export default savedjobsController;
