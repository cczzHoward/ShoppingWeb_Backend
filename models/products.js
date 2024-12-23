const { date } = require("joi");
const db = require("./db");
const mongoose = require("mongoose");
const { Schema } = mongoose;

// 建立 product Schema
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 63,
    },
    price: {
      type: Number,
      required: true,
      min: 1,
      max: 99999,
    },
    category: {
      type: String,
      enum: ["food", "drink", "others"],
      required: true
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    image: {
      type: String,
      default: ""
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "products",
    versionKey: false,
  }
);

// 建立 Product Model
const ProductModel = db.model("Product", productSchema);

module.exports = ProductModel;
