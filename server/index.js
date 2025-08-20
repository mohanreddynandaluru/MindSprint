const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/user_route");
const quizRoutes = require("./routes/quiz_route");

require("dotenv").config();
app.use(cors());
app.use(express.json());
//connection to database
connectDB();

// health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
  });
});
app.use("/api/auth", userRoutes);
app.use("/api/quiz", quizRoutes);

app.listen(process.env.PORT, () => {
  console.log("server is running on port " + process.env.PORT);
});
