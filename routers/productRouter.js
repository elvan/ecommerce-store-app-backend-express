const express = require('express');

const router = express.Router();

const {
  fetchAllProducts,
  createProduct,
} = require('../controllers/productController');

router.get('/', fetchAllProducts);

router.post('/', createProduct);

module.exports = router;
