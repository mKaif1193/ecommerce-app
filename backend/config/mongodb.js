import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DB connected successfully");
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/ecommerce-app`);
  } catch (error) {
    console.log("Error while connecting to DB :", error.message);
  }
};

export default connectDB;
