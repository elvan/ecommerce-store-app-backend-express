const dotenv = require('dotenv');

const app = require('./app');

dotenv.config();

const port = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${NODE_ENV} mode`);
});
