const express = require("express");
const router = express.Router();
const productController = require("../Controllers/ProductController.js");

router.post("/", productController.create);
router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

module.exports = router;
