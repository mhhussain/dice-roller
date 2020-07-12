const config = require('../config');
module.exports.db = require('monk')(config.MONGODB_URI);
