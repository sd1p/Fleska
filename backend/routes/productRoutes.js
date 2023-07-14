const express = require("express");
const {
  getAllProducts,
  createProduct,
  deleteProductById,
  updateProductById,
} = require("../controller/productController");

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/").post(createProduct);
router.route("/:productId").put(updateProductById);
router.route("/:productId").delete(deleteProductById);

module.exports = router;
