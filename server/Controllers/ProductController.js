const { Product, Category } = require("../models");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const uploadDir = path.join(__dirname, "../uploads/products");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png, webp) are allowed!"));
  }
};

const upload = multer({ storage, fileFilter }).single("image");

module.exports = {
  // CREATE Product
  create: (req, res) => {
    upload(req, res, async (err) => {
      if (err) return res.status(400).json({ message: err.message });
      try {
        const { nama_product, harga_produk, rating_produk, id_category } = req.body;
        if (!req.file) return res.status(400).json({ message: "Image is required" });

        const newProduct = await Product.create({
          nama_product,
          harga_produk,
          rating_produk,
          id_category,
          image: req.file.filename
        });

        res.json({ message: "Product created successfully", data: newProduct });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
  },

  // READ all products
  getAll: async (req, res) => {
    try {
      const products = await Product.findAll({
        include: [{ model: Category, attributes: ["id_category", "name_category"] }]
      });
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // READ one product
  getOne: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id, {
        include: [{ model: Category, attributes: ["id_category", "name_category"] }]
      });
      if (!product) return res.status(404).json({ message: "Product not found" });
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // UPDATE product
  update: (req, res) => {
    upload(req, res, async (err) => {
      if (err) return res.status(400).json({ message: err.message });
      try {
        const { nama_product, harga_produk, rating_produk, id_category } = req.body;
        const product = await Product.findByPk(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });

        let updatedImage = product.image;
        if (req.file) {
          const oldPath = path.join(uploadDir, product.image);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
          updatedImage = req.file.filename;
        }

        await product.update({
          nama_product,
          harga_produk,
          rating_produk,
          id_category,
          image: updatedImage
        });

        res.json({ message: "Product updated successfully", data: product });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });
  },

  // DELETE product
  delete: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ message: "Product not found" });

      const oldPath = path.join(uploadDir, product.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      await product.destroy();
      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};
