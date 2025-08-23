const express = require("express");
const router = express.Router();
const { authverify } = require("../utils/auth");
const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  updateProfile,
} = require("../controllers/auth");

// Register a new user
router.post("/register", registerUser);
// login a user
router.post("/login", loginUser);
// profile route

router.get("/profile", getProfile);

// logout
router.get("/logout", logoutUser);

// update user
router.patch("/update", authverify, updateProfile);

module.exports = router;
