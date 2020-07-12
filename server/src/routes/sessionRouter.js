const sessionModel = require('../db/session');

const getAll = async (req, res) => {
  const allSessions = await sessionModel.getAll();
  res.json(allSessions);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const session = await sessionModel.getById(id);
  res.json(session);
};

const openNewSession = async (req, res) => {
  const newSession = {
    createdDate: new Date(),
    open: true,
  };
  const createdSession = await sessionModel.create(newSession);
  res.json(createdSession);
};

const closeSession = async (req, res) => {
  const { id } = req.params;
  const updated = await sessionModel.update(id, null, { open: false });
  res.json(typeof updated != 'undefined');
};

module.exports = (app) => {
  app.get('/session', getAll);
  app.get('/session/:id', getById);
  app.post('/session', openNewSession);
  app.delete('/session/:id', closeSession);
};
