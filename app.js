const express = require('express');

const errorHandler = require('./middleware/errorHandler');
const enableCors = require('./middleware/enableCors');

const app = express();

app.use(express.json());
app.use(enableCors);

// Import all the routers
const productRouter = require('./routers/productRouter');

app.use('/api/v1/products', productRouter);

app.use(errorHandler);

module.exports = app;
