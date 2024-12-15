const express = require("express");
const router = express.Router();
const userModel = require("../models").users;
const registerValidation = require("../utils/validator").registerValidation;


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

// Add a new user
router.post("/", async (req, res) => {
  // #swagger.description = '新增使用者'
  console.log("POST /api/v1/users");

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

// Update a user by id

// Delete a user by id

module.exports = router;
