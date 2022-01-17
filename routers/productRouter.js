const express = require('express');

const router = express.Router();

const {
  fetchAllProducts,
  createProduct,
  fetchProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.get('/', fetchAllProducts);

router.post('/', createProduct);

router.get('/:id', fetchProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;
