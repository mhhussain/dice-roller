//
const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { user } = context.params;

    context.result.data = _.filter(context.result.data, (d) => {
      return d.userId.equals(user._id);
    });

    return context;
  };
};
