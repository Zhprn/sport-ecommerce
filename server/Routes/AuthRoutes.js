const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController.js');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.delete('/logout', authController.logout);

module.exports = router;
