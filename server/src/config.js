require('dotenv').config();
module.exports = {
  PORT: process.env.PORT || 9002,
  MONGODB_URI: process.env.MONGODB_URI || 'localhost',
};
