import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDb connection established");
    });

    connection.on("error", (error) => {
      console.error("Error connecting to MongoDB", error);
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong when connecting to MongoDB ", error);
  }
};
