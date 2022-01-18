const dotenv = require('dotenv');

const app = require('./app');

const connectToDatabase = require('./config/database');

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to the database
connectToDatabase();

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${NODE_ENV} mode`);
});
