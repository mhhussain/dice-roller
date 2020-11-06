// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { user } = context.params;

    if (!user) {
      return context;
    }

    if (context.result.data) {
      context.result.data = await context.result.data.map(r => {
        const maskedRoll = r;
        r.dvalue = r.userId.toString() === user._id.toString() || r.visible ? r.dvalue : null;
        r.roll = r.userId.toString() === user._id.toString() || r.visible ? r.roll : null;
        return maskedRoll;
      });
    } else {
      const r = context.result;
      context.result.dvalue = r.userId.toString() === user._id.toString() || r.visible ? r.dvalue : null;
      context.result.roll = r.userId.toString() === user._id.toString() || r.visible ? r.roll : null;
    }

    return context;
  };
};
