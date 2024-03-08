const express = require("express");
require("dotenv").config();
require("./database");
const app = express();

app.use(express.json());

const taskRoutes = require("./routes/tasks");

// Routes
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is running!");
});
