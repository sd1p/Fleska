const mongoose = require("mongoose");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

//creating products
exports.createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);

  if (product) {
    res.status(201).json({
      success: true,
      product,
    });
  } else {
    res.status(400);
    throw new Error("Product not created");
  }
});

//finding all products.
exports.getAllProducts = asyncHandler(async (req, res) => {
  const product = await Product.find();

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400);
    throw new Error("No Products found");
  }
});

//updating product
exports.updateProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  //product ID validation
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Please enter a valid product ID ");
  }

  let product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found ");
  }
  product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//deleting a product by ID.
exports.deleteProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  //product ID validation
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Please enter a valid product ID ");
  }

  const product = await Product.findByIdAndDelete(productId);

  if (product) {
    res.status(200).json({ message: `Deleted product ${productId}` });
  } else {
    res.status(400);
    throw new Error("Product does not exists");
  }
});
