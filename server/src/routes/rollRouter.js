const rollModel = require('../db/roll');

const getAllRolls = async (req, res) => {
  const { sessionId, name } = req.params;
  const allRolls = await rollModel.find({ sessionId, name });
  res.json(allRolls);
};

const rollDice = async (req, res) => {
  const { sessionId, name, dice } = req.params;

  let newRoll = {
    sessionId,
    name,
    dice,
    roll: Math.ceil(Math.random() * dice),
    createdDate: new Date(),
  };

  const createdRoll = await rollModel.create(newRoll);
  res.json(createdRoll);
};

const deleteRoll = async (req, res) => {
  const { id } = req.params;
  const deleted = await rollModel.remove(id);
  res.json(deleted);
};

module.exports.configRoutes = (app) => {
  app.get('/roll/:sessionId/:name', getAllRolls);
  app.post('/roll/:sessionId/:name/:dice', rollDice);
  app.delete('/roll/:id', deleteRoll);
};
