const configs = require('../configs');
module.exports.db = require('monk')(configs.MONGODB_URI);