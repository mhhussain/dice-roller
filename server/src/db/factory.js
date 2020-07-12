const { db } = require('./connection');
const yup = require('yup');

const make = (collectionName, schema) => {
  const collection = db.get(collectionName);
  return {
    getAll: async () => {
      const all = await collection.find();
      return all;
    },
    getById: async (id) => {
      const obj = await collection.findOne({ _id: id });
      return obj;
    },
    find: async (q) => {
      const all = await collection.find(q);
      return all;
    },
    create: async (obj) => {
      schema.validate(obj);
      const createdObj = await collection.insert(obj);
      return createdObj;
    },
    update: async (id, q, vals) => {
      const query = { _id: id, ...q };
      const updated = await collection.update(query, { $set: vals });
      return typeof updated != 'undefined';
    },
    remove: async (id) => {
      const deleted = await collection.remove({ _id: id });
      return typeof deleted != 'undefined';
    },
  };
};

module.exports = {
  make,
};
