const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authverify = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized access, token is missing",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
};

module.exports = {
  authverify,
};
