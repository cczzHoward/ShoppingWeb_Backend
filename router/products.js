const express = require("express");
const router = express.Router();
const productsModel = require("../models").products;

// Get all products
router.get("/", async (req, res) => {
  // #swagger.description = '取得所有商品'
  console.log("GET /api/v1/products");
  try {
    let products = await productsModel.find({});
    return res.send(products);
  } catch (err) {
    console.log("Error getting products:", err);
    return res.status(500).send("Error getting products");
  }
});

// Get a product by id
router.get("/:id", async (req, res) => {
  // #swagger.description = '透過 ID 取得商品'
  console.log("GET /api/v1/products/:id");
  const _id = req.params.id;
  try {
    let product = await productsModel.find({ _id });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    return res.send(product);
  } catch (err) {
    console.log("Error getting product:", err);
    return res.status(500).send("Error getting product");
  }
});

// Add a new product
router.post("/", async (req, res) => {
  // #swagger.description = '新增商品'
  console.log("POST /api/v1/products");
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
