const { Cart, Product } = require("../models");

module.exports = {
  add: async (req, res) => {
    try {
      const { user_id, product_id, quantity } = req.body;
      if (!user_id || !product_id || !quantity) {
        return res.status(400).json({ message: "user_id, product_id, and quantity are required" });
      }

      const product = await Product.findByPk(product_id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      let cartItem = await Cart.findOne({ where: { user_id, product_id } });
      if (cartItem) {
        cartItem.quantity += Number(quantity);
        await cartItem.save();
      } else {
        cartItem = await Cart.create({ user_id, product_id, quantity });
      }

      res.json({ message: "Item added to cart", data: cartItem });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const carts = await Cart.findAll({
        include: [{ model: Product, as: "product" }]
      });
      res.json(carts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getByUser: async (req, res) => {
    try {
      const { user_id } = req.params;
      const cart = await Cart.findAll({
        where: { user_id },
        include: [{ model: Product, as: "product" }]
      });
      res.json(cart);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const cartItem = await Cart.findByPk(id);
      if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

      cartItem.quantity = quantity;
      await cartItem.save();

      res.json({ message: "Cart item updated", data: cartItem });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  remove: async (req, res) => {
    try {
      const { id } = req.params;
      const cartItem = await Cart.findByPk(id);
      if (!cartItem) return res.status(404).json({ message: "Cart item not found" });

      await cartItem.destroy();
      res.json({ message: "Cart item removed" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  clear: async (req, res) => {
    try {
      const { user_id } = req.params;
      await Cart.destroy({ where: { user_id } });
      res.json({ message: "Cart cleared" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
