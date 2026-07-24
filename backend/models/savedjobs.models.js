import mongoose from "mongoose";

const savedJobsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobs: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

export const SavedJob = mongoose.model("SavedJob", savedJobsSchema);
