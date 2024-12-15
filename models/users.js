const db = require("./db");
const mongoose = require("mongoose");
const { Schema } = mongoose;

// 建立 users Schema
const userSchema = new Schema(
    {
        username: { 
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 63,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 127,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            maxlength: 255,
        },
        role: {
            type: String,
            required: true,
            enum: ["customer", "seller", "admin"],
            default: "customer",
        }
    },
    {
        collection: "users",
        versionKey: false,
    }
)

// 建立 User Model
const UserModel = db.model("User", userSchema);

module.exports = UserModel;