import mongoose from "mongoose";

const dbconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("database is connected successfully");
    });
  } catch (error) {
    console.log(`database failed to connect :${error}`);
  }
};

export default dbconnection;
