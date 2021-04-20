const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
      },
    );
    // eslint-disable-next-line
    console.log('MongoDB is Connected...');
  } catch (err) {
    // eslint-disable-next-line
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
