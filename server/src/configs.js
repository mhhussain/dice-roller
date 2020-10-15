const _ = require('lodash');
require('dotenv').config();
module.exports = {
    PORT: _.defaultTo(process.env.PORT, 9002),
    MONGODB_URI: _.defaultTo(process.env.MONGODB_URI, 'localhost'),
    MORGAN_FORMAT: _.defaultTo(process.env.MORGAN_FORMAT, 'tiny'),
};
