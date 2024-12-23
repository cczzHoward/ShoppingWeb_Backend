const db = require("./db");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

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
            unique: true,
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
        },
        date: {
            type: Date,
            default: Date.now,
        }
    },
    {
        collection: "users",
        versionKey: false,
    }
)

// 檢查密碼是否正確
userSchema.methods.comparePassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw new Error(err);
    }
};

// 對 password 做加密處理
userSchema.pre("save", async function(next) {
    try {
        if (this.isModified("password") || this.isNew) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
        }
        next();
    } catch (err) {
        next(err);
    }
});

// 建立 User Model
const UserModel = db.model("User", userSchema);

module.exports = UserModel;