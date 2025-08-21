const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide all required fields",
      });
    }

    // Check if user already exists
    const existinguser = await User.findOne({ email: email });
    if (existinguser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists with this email",
      });
    }

    // Hash the password for security
    const hashedpassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newuser = new User({
      name: username,
      email: email,
      password: hashedpassword,
    });

    // Save the user to the database
    await newuser.save();

    // create jwt token

    const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Respond with success message
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        username,
        email,
        token,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Please provide all required fields",
      });
    }
    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User does not exist with this email",
      });
    }
    // Check if password is correct
    const ispasswordValid = await bcrypt.compare(password, user.password);
    if (!ispasswordValid) {
      return res.status(400).json({
        status: "error",
        message: "Invalid password",
      });
    }
    // create jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // Respond with success message
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 900000,
      sameSite: "lax",
    });

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      data: {
        username: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

// profile

const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized access, token is missing",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        username: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};
