const express = require('express');

const router = express.Router();

const {
  fetchAllProducts,
  createProduct,
  fetchProduct,
} = require('../controllers/productController');

router.get('/', fetchAllProducts);

router.post('/', createProduct);

router.get('/:id', fetchProduct);

module.exports = router;
