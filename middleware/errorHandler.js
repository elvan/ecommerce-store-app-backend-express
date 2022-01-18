const NODE_ENV = process.env.NODE_ENV || 'development';

function errorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something Went Wrong';

  if (NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      success: false,
      status: err.statusCode,
      message: err.message,
      stack: err.stack,
    });
  } else if (NODE_ENV === 'production') {
    let error = { ...err };

    error.message = err.message;

    return res.status(err.statusCode).json({
      success: false,
      status: err.statusCode,
      message: err.message || 'Something Went Wrong',
    });
  }
}

module.exports = errorHandler;
