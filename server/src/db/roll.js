const { db } = require('./connection');
const yup = require('yup');
const config = require('../config');

const collection = db.get('rolls');

const schema = yup.object().shape({
  sessionId: yup.string().trim().required(),
  name: yup.string().trim().required(),
  dice: yup.number().required(),
  roll: yup.number().required(),
  createdDate: yup.date().required(),
});

const getAll = async () => {
  const all = await collection.find();
  return all;
};

const getById = async (id) => {
  const obj = await collection.findOne({ _id: id });
  return obj;
};

const find = async (q) => {
  const all = await collection.find(q);
  return all;
};

const create = async (obj) => {
  schema.validate(obj);
  const createdObj = await collection.insert(obj);
  return createdObj;
};

const update = async (id, q, vals) => {
  const query = { _id: id, ...q };
  const updated = await collection.update(query, { $set: vals });
  return typeof updated != 'undefined';
};

const remove = async (id) => {
  const deleted = await collection.remove({ _id: id });
  return typeof deleted != 'undefined';
};

module.exports = {
  getAll,
  getById,
  find,
  create,
  update,
  remove,
};
