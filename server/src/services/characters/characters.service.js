// Initializes the `characters` service on path `/characters`
const { Characters } = require('./characters.class');
const hooks = require('./characters.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/characters', new Characters(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('characters');

  service.hooks(hooks);
};
