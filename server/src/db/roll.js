const factory = require('./factory');
const yup = require('yup');

const schema = yup.object().shape({
  sessionId: yup.string().trim().required(),
  name: yup.string().trim().required(),
  dice: yup.number().required(),
  roll: yup.number().required(),
  createdDate: yup.date().required(),
});

module.exports = factory.make('rolls', schema);
