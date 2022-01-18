const dotenv = require('dotenv');

const app = require('./app');

const connectToDatabase = require('./config/database');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(`Error name: ${err.name}`);
  console.log(`Error message: ${err.message}`);

  process.exit(1);
});

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Connect to the database
connectToDatabase();

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${NODE_ENV} mode`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(`Error name: ${err.name}`);
  console.log(`Error message: ${err.message}`);

  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
