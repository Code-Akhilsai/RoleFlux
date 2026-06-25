import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: [true, "Username must be unique"],
    },

    email: {
      type: String,
      lowercase: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minLength: [8, "password must be eight digits"],
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
