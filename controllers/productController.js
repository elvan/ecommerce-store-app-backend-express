const catchAsync = require('../helpers/catchAsync');
const Product = require('../models/product');
const AppError = require('../helpers/AppError');
const ApiFeatures = require('../helpers/ApiFeatures');

exports.fetchAllProducts = catchAsync(async (req, res, next) => {
  const limit = req.query.limit;
  const pageIndex = req.query.page * 1 || 1;
  const pageSize = !limit || limit * 1 > 12 ? 12 : limit;

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(pageSize);

  const countWithoutPagination = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  const productsCount =
    await countWithoutPagination.mongooseQuery.countDocuments();

  const products = await apiFeatures.mongooseQuery;

  if (products.length === 0) {
    return next(new AppError('No products found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'Products fetched successfully',
    productsCount: productsCount,
    pageIndex: pageIndex,
    pageSize: pageSize,
    products: products,
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);

  if (!product) {
    return next(new AppError('Product could not be created', 400));
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
    return next(new AppError('Failed to find product', 404));
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
    return next(new AppError('Failed to find product', 404));
  }

  product.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});
