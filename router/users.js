const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userModel = require("../models").users;
const registerValidation = require("../utils/validator").registerValidation;
const loginValidation = require("../utils/validator").loginValidation;


// Get all users
router.get("/", async (req, res) => {
  // #swagger.description = '取得所有使用者'
  console.log("GET /api/v1/users");
  try {
    let users = await userModel.find({});
    return res.send(users);
  } catch (err) {
    console.log("Error getting users:", err);
    return res.status(500).send("Error getting users");
  }
});


// Get a user by id

// Register a new user
router.post("/register", async (req, res) => {
  // #swagger.description = '註冊使用者'
  console.log("POST /api/v1/users/register");

  // Validate the request body
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the email already exists
  const { username, email, password, role } = req.body;
  const emailExists = await userModel.findOne({ email });
  if (emailExists) {
    return res.status(400).send("Email already exists");
  }

  // Create a new user
  try {
    const newUser = new userModel({
      username,
      email,
      password,
      role,
    });

    let savedUser = await newUser.save();
    return res.send({
      message: "User created successfully",
      savedUser,
    });
  } catch (error) {
    console.log("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

// Login a user
router.post("/login", async (req, res) => {
  // #swagger.description = '登入使用者'
  console.log("POST /api/v1/users/login");

  // Validate the request body
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the email already exists
  const foundUser = await userModel.findOne({ email: req.body.email });
  if (!foundUser) {
    return res.status(400).send("Email not found, please register");
  }

  // Check if the password is correct
  try {
    const isPasswordCorrect = await foundUser.comparePassword(req.body.password);
    if (!isPasswordCorrect) {
      return res.status(400).send("Password is incorrect");
    }

    // Create a JWT token
    const tokenObject = { _id: foundUser._id, email: foundUser.email, role: foundUser.role };
    const token = jwt.sign(tokenObject, process.env.TOKEN_SECRET);
    return res.send({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log("Error comparing password:", error);
    res.status(500).send("Error comparing password");
  }
});

// Update a user by id

// Delete a user by id

module.exports = router;
