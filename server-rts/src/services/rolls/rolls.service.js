// Initializes the `rolls` service on path `/rolls`
const { Rolls } = require('./rolls.class');
const hooks = require('./rolls.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/rolls', new Rolls(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('rolls');

  service.hooks(hooks);
};
