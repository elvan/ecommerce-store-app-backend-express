function catchAsync(handler) {
  return function (req, res, next) {
    handler(req, res, next).catch(next);
  };
}

module.exports = catchAsync;
