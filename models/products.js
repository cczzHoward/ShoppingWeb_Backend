const mongoose = require("mongoose");
const { Schema } = mongoose;

// 建立 Schema
const productSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
  },
  {
    collection: "products",
    versionKey: false,
  }
);

// 建立 Model
const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
