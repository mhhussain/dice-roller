const get = (req, res) => {
  res.json({ message: 'pong' });
};

module.exports.configRoutes = (app) => {
  app.get('/ping', get);
};
