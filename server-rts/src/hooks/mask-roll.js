// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { user } = context.params;

    context.result.data = await context.result.data.map(r => {
      const maskedRoll = r;
      r.dvalue = r.userId.toString() === user._id.toString() || r.visible ? r.dvalue : null;
      r.roll = r.userId.toString() === user._id.toString() || r.visible ? r.roll : null;
      return maskedRoll;
    });

    console.dir('jfieowajfew');

    return context;
  };
};
