const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile } = require("../controllers/auth");

// Register a new user
router.post("/register", registerUser);
// login a user
router.post("/login", loginUser);
// profile route

router.get("/profile", getProfile);

module.exports = router;
