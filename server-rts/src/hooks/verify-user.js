// Verify that the user accessing the object is the same user
// who owns the object

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { user } = context.params;

    const obj = await context.service.get(context.id);
    if (obj.userId.toString() != user._id) {
      throw new Error('invalid user');
    }

    return context;
  };
};
