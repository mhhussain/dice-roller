//
const { ObjectId } = require('mongodb');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { query } = context.params;
    query.userId = ObjectId(query.userId);
    return context;
  };
};
