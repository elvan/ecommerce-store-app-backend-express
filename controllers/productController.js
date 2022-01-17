const Product = require('../models/product');

exports.fetchAllProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Products will be displayed through this endpoint',
  });
};

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  if (!product) {
    return res.status(400).json({
      success: false,
      message: 'Product could not be created',
    });
  }

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product: product,
  });
};
