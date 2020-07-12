const factory = require('./factory');
const yup = require('yup');

const schema = yup.object().shape({
  createdDate: yup.date().required(),
  open: yup.boolean().required(),
});

module.exports = factory.make('sessions', schema);
