const factory = require('./factory');
const yup = require('yup');

const schema = yup.object().shape({
  _id: yup.string().trim(),
});

module.exports = factory.make('characters', schema);