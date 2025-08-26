const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/OrderController.js");

router.post("/", orderController.createOrder);
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.get("/user/:id_user", orderController.getOrdersByUser);
router.patch("/:id/status", orderController.updateStatus);

module.exports = router;
