const { db } = require('./connection');
const yup = require('yup');
const config = require('../config');

const sessions = db.get('sessions');

const sessionSchema = yup.object().shape({
  createdDate: yup.date().required(),
  open: yup.boolean().required(),
});

const getAll = async () => {
  const allSessions = await sessions.find();
  console.log(allSessions);
  console.log(config);
  return allSessions;
};

const getById = async (id) => {
  const session = await sessions.findOne({ _id: id });
  return session;
};

const create = async (obj) => {
  sessionSchema.validate(obj);
  const createdSession = await sessions.insert(obj);
  return createdSession;
};

const update = async (id, q, vals) => {
  const query = { _id: id, ...q };
  const updated = await sessions.update(query, { $set: vals });
  return typeof updated != 'undefined';
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
