const pingRouter = require('./pingRouter');
const sessionRouter = require('./sessionRouter');

const routes = (app) => {
  pingRouter(app);
  sessionRouter(app);
};

module.exports = routes;
