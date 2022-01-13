const mongoose = require('mongoose');

const mongodbServer =
  process.env.MONGODB_SERVER || 'mongodb://localhost:27017/';

const connectToDatabase = () => {
  mongoose
    .connect(mongodbServer, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((defaultConn) => {
      console.log(`Connected to database at ${defaultConn.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToDatabase;
