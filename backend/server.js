const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/tasks");
const app = express();
const cors = require("cors");

require("dotenv").config();

const uri = process.env.MONGO_DB_URI;
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  app.use("/api/tasks", taskRoutes);
  try {
    await mongoose
      .connect(uri)
      .then(() => console.log("MongoDB connected with Mongoose"))
      .catch((err) => console.error("Mongoose connection error:", err));

    app.listen(PORT, () => {
      console.log(`Server is running on Port: ${PORT}`);
    });
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
};

startServer();
