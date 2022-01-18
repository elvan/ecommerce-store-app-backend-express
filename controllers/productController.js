const catchAsync = require('../helpers/catchAsync');
const Product = require('../models/product');
const AppError = require('../helpers/AppError');

exports.fetchAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    message: 'Products fetched successfully',
    results: products.length,
    products: products,
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
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
});

exports.fetchProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Failed to find product', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Product fetched successfully',
    product: product,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Failed to find product',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    product: product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Failed to find product',
    });
  }

  product.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});
