import mongoose from "mongoose";
import { dataInit } from "./upload.js";
import dotenv from 'dotenv-defaults';

dotenv.config();

import "dotenv-defaults/config.js";

async function connect() {
  // TODO 1.1 Connect your MongoDB
  if (!process.env.MONGO_URL) {
      console.log("Missing MONGO_URL!");
      process.exit(1);
  }

  mongoose.connect(process.env.MONGO_URL,{
      useNewUrlParser: true,
      useUnifiedTopology: true
  })

  const db = mongoose.connection;

  db.on("error", (error) => {
      throw new Error("DB connection error: " + error);
  });

  db.once('open', () => {
      console.log("MongoDB connected.");
  }) 

  // await dataInit();
}

export default { connect };