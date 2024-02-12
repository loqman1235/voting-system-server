import express from "express";
import config from "./config";
import mongoose from "mongoose";
import cors from "cors";
import pollRoutes from "./routes/poll.route";

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cors({ origin: process.env.HOST, credentials: true }));

const dbConnection = async () => {
  try {
    await mongoose.connect(config.mongo.url);

    console.log("Database connected");

    // Routes
    app.use("/api/polls", pollRoutes);

    // Server
    app.listen(config.server.port, () => {
      console.log(`Server running on port ${config.server.port} ✅`);
    });
  } catch (error) {
    console.log(error, "❌");
    process.exit(1);
  }
};

dbConnection();
