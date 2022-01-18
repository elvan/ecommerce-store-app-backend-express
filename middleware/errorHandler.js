const NODE_ENV = process.env.NODE_ENV || 'development';

function errorHandler(err, req, res, next) {
  let error = { ...err };

  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something Went Wrong';

  if (err.name === 'CastError') {
    err.statusCode = 400;
    err.message = `Resource with invalid path ${err.path} was not found. `;
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(({ message }) => message);

    err.statusCode = 400;
    err.message = messages.join(', ');
  }

  return res.status(err.statusCode).json({
    success: false,
    status: err.statusCode,
    message: err.message,
    stack: NODE_ENV === 'production' ? null : err.stack,
  });
}

module.exports = errorHandler;
