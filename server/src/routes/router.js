const pingRouter = require('./pingRouter');
const sessionRouter = require('./sessionRouter');
const rollRouter = require('./rollRouter');

const routes = (app) => {
  pingRouter.configRoutes(app);
  sessionRouter.configRoutes(app);
  rollRouter.configRoutes(app);
};

module.exports = routes;
