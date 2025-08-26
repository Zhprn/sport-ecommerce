const { Order, OrderItem, Product, User, Payment, Cart } = require("../models");

module.exports = {
  createOrder: async (req, res) => {
    const t = await Order.sequelize.transaction();
    try {
      const { id_user, address, notes, totalBayar, items, metode } = req.body;

      const order = await Order.create(
        {
          id_user,
          alamat: address,
          catatan: notes,
          total_harga: totalBayar,
          status: "pending"
        },
        { transaction: t }
      );

      const orderItems = await Promise.all(
        items.map(async (item) => {
          const product = await Product.findByPk(item.id_product);
          return OrderItem.create(
            {
              id_order: order.id_order,
              id_product: item.id_product,
              quantity: item.quantity,
              harga_satuan: product.harga_produk
            },
            { transaction: t }
          );
        })
      );

      const payment = await Payment.create(
        {
          id_order: order.id_order,
          metode: metode || "Transfer Bank",
          jumlah_bayar: totalBayar,
          status: "unpaid"
        },
        { transaction: t }
      );

      await Cart.destroy({ where: { user_id: id_user }, transaction: t });

      await t.commit();

      res.status(201).json({
        message: "Order berhasil dibuat",
        order: {
          ...order.toJSON(),
          items: orderItems,
          payment
        }
      });
    } catch (err) {
      await t.rollback();
      res.status(500).json({ message: err.message });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: [
          { model: User, attributes: ["id_user", "username", "email"] },
          { model: OrderItem, as: "items", include: [{ model: Product }] },
          { model: Payment, as: "payment" }
        ]
      });
      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, {
        include: [
          { model: User, attributes: ["id_user", "username", "email"] },
          { model: OrderItem, as: "items", include: [{ model: Product }] },
          { model: Payment, as: "payment" }
        ]
      });

      if (!order) {
        return res.status(404).json({ message: "Order tidak ditemukan" });
      }

      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getOrdersByUser: async (req, res) => {
    try {
      const { id_user } = req.params;

      const orders = await Order.findAll({
        where: { id_user },
        include: [
          { model: OrderItem, as: "items", include: [{ model: Product }] },
          { model: Payment, as: "payment" }
        ],
        order: [["createdAt", "DESC"]]
      });

      res.json(orders);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["pending", "paid", "cancelled", "arrived"].includes(status)) {
        return res.status(400).json({ message: "Status tidak valid" });
      }

      const order = await Order.findByPk(id);
      if (!order) {
        return res.status(404).json({ message: "Order tidak ditemukan" });
      } 

      order.status = status;
      await order.save();

      res.json({ message: "Status order berhasil diubah", order });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
