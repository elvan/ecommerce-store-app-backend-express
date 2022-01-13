const express = require('express');

const app = express();

app.use(express.json());

// Import all the routers
const productRouter = require('./routers/productRouter');

app.use('/api/v1/products', productRouter);

module.exports = app;
