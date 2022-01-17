const express = require('express');

const router = express.Router();

const {
  fetchAllProducts,
  createProduct,
  fetchProduct,
  updateProduct,
} = require('../controllers/productController');

router.get('/', fetchAllProducts);

router.post('/', createProduct);

router.get('/:id', fetchProduct);

router.patch('/:id', updateProduct);

module.exports = router;
