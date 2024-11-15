const express = require("express");
const router = express.Router();
const productsModel = require("../models").products;

router.get("/", (req, res) => {
  res.send("This is the root of the products router");
});

router.post("/", async (req, res) => {
  console.log("POST /api/v1/products");
  console.log("req body:", req.body);
  const { title, price, category, description, image } = req.body;
  try {
    const newProduct = new productsModel({
      title,
      price,
      category,
      description,
      image,
    });

    let savedproduct = await newProduct.save();
    return res.send({
      message: "Product created successfully",
      savedproduct,
    });
  } catch (error) {
    console.log("Error creating product:", error);
    res.status(500).send("Error creating product");
  }
});

module.exports = router;
