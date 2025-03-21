const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userModel = require("../models").users;
const registerValidation = require("../utils/validator").registerValidation;
const loginValidation = require("../utils/validator").loginValidation;


// Get all users
router.get("/", async (req, res) => {
  /* 
    #swagger.description = 'Get All Users'
  */
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
router.get("/:id", async (req, res) => {
  /* 
    #swagger.description = 'Get a user by id'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID',
      required: true,
      type: 'string'
    }
  */
  console.log("GET /api/v1/users/:id");
  const _id = req.params.id;
  try {
    let user = await userModel.findById(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.send(user);
  } catch (err) {
    console.log("Error getting user:", err);
    return res.status(500).send("Error getting user");
  }
});

// Register a new user
router.post("/register", async (req, res) => {
  /* 
    #swagger.description = 'Register a new user'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'User registration data',
      required: true,
      schema: {
          $username: "test",
          $email: "test@example.com",
          $password: "password123",
          $role: "customer"
      }
    }
  */
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
  /* 
    #swagger.description = '使用者登入'
    #swagger.parameters['body'] = {
      in: 'body',
      description: '使用者登入資料',
      required: true,
      schema: {
          $email: "test@example.com",
          $password: "password123"
      }
    }
  */
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
      token: "JWT " + token,
    });
  } catch (error) {
    console.log("Error comparing password:", error);
    res.status(500).send("Error comparing password");
  }
});

// Update a user by id
router.patch("/:id", async (req, res) => {
  /* 
    #swagger.description = 'Update a user by id'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated user data',
      required: true,
      schema: {
          username: "test",
          email: "test@example.com",
          password: "password123",
          role: "customer"
      }
    }
  */
  console.log("PATCH /api/v1/users/:id");
  const _id = req.params.id;
  const { username, email, password, role } = req.body;
  try {
    let updatedUser = await userModel.findByIdAndUpdate(
      { _id },
      { username, email, password, role },
      { new: true }
    );
    return res.send({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (err) {
    console.log("Error updating user:", err);
    return res.status(500).send("Error updating user");
  }
});

// Delete a user by id

module.exports = router;
