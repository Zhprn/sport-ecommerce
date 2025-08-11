const { Category } = require('../models');

module.exports = {
  // Create Category
  create: async (req, res) => {
    try {
      const { name_category } = req.body;

      if (!name_category) {
        return res.status(400).json({ message: "Nama kategori wajib diisi" });
      }

      const category = await Category.create({ name_category });

      res.status(201).json({
        message: "Kategori berhasil dibuat",
        data: category
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get All Categories
  getAll: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.json({
        message: "Daftar kategori",
        data: categories
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get Category by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Kategori tidak ditemukan" });
      }

      res.json({
        message: "Detail kategori",
        data: category
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update Category
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name_category } = req.body;

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Kategori tidak ditemukan" });
      }

      await category.update({ name_category });

      res.json({
        message: "Kategori berhasil diperbarui",
        data: category
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Delete Category
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Kategori tidak ditemukan" });
      }

      await category.destroy();

      res.json({ message: "Kategori berhasil dihapus" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
