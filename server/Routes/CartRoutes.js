const express = require('express');
const router = express.Router();
const CartController = require('../Controllers/CartController');

router.post('/', CartController.add);
router.get('/', CartController.getAll);
router.get('/:id', CartController.getByUser);
router.put('/:id', CartController.update);
router.delete('/:id', CartController.remove);

module.exports = router;
