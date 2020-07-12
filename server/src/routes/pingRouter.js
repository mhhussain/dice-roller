const get = (req, res) => {
  res.json({ message: 'pong' });
};

module.exports = (app) => {
  app.get('/ping', get);
};
