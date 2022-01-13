exports.fetchAllProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Products will be displayed through this endpoint',
  });
};
