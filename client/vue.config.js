const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/src/public'),
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:5001',
      },
      '/authenticate': {
        target: 'http://localhost:5001',
      },
    },
  },
};