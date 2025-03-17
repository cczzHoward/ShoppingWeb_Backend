const express = require("express");
const router = express.Router();
const productsModel = require("../models").products;
const postProductValidation = require("../utils/validator").postProductValidation;

// Get all products
router.get("/", async (req, res) => {
  /* 
    #swagger.description = 'Get All Products'
    #swagger.security = [{
      "JWT": []
    }]
  */
  console.log("GET /api/v1/products");
  try {
    let products = await productsModel.find({}).populate("seller", ["username", "-_id"]);
    return res.send(products);
  } catch (err) {
    console.log("Error getting products:", err);
    return res.status(500).send("Error getting products");
  }
});

// Get a product by id
router.get("/:id", async (req, res) => {
  /* 
    #swagger.description = 'Get Product by ID'
    #swagger.security = [{
      "JWT": []
    }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'Product ID',
      required: true,
      type: 'string'
    }
  */
  console.log("GET /api/v1/products/:id");
  const _id = req.params.id;
  try {
    let product = await productsModel.find({ _id }).populate("seller", ["username", "-_id"]);
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
  /* 
    #swagger.description = 'Add a new product'
    #swagger.security = [{
      "JWT": []
    }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Product data',
      required: true,
      schema: {
          $title: "Test Product",
          $price: 100,
          $category: "food",
          $description: "This is a test product",
          $image: "data:image/jpeg;base64,..."
      }
    }
  */
  console.log("POST /api/v1/products");

  // Validate the request body
  const { error } = postProductValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  if (!req.user.isSeller()) {
    return res.status(403).send("Only sellers can add products");
  }

  const { title, price, category, description, image } = req.body;
  try {
    const newProduct = new productsModel({
      title,
      price,
      category,
      description,
      image,
      seller: req.user._id,
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
