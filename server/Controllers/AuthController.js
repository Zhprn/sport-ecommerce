const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = {
  register: async (req, res) => {
    try {
      const { email, username, password } = req.body;

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email,
        username,
        password: hashedPassword,
      });

      res.status(201).json({
        data: newUser,
        message: "Registrasi berhasil",
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Email atau password salah" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Email atau password salah" });
      }

      const token = jwt.sign(
        { id_user: user.id_user, email: user.email },
        process.env.JWT_SECRET
      );

      await User.update(
        { remember_token: token },
        { where: { id_user: user.id_user } }
      );

      res.json({
        message: "Login berhasil",
        token,
        user: {
          id_user: user.id_user,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({ message: "Token diperlukan" });
      }

      const token = authHeader.split(" ")[1];
      const user = await User.findOne({ where: { remember_token: token } });

      if (!user) {
        return res.status(401).json({ message: "Token tidak valid" });
      }

      await User.update(
        { remember_token: null },
        { where: { id_user: user.id_user } }
      );

      return res.json({ message: "Logout berhasil" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};
