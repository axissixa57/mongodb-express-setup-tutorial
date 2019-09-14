import mongoose from "mongoose";

import User from "./user";
import Message from "./message";

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }); // без 2-х последних будут предупреждения в консоли, чтобы добавили их
};

const models = { User, Message };

export { connectDb };
export default models;
