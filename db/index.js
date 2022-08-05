import mongoose from "mongoose";

export default async function () {
  return await mongoose.connect("mongodb://localhost:27017/bs");
}
