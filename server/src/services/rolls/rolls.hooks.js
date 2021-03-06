const { authenticate } = require('@feathersjs/authentication').hooks;

const addUserId = require('../../hooks/add-user-id');

const verifyUser = require('../../hooks/verify-user');

const maskRoll = require('../../hooks/mask-roll');

const convertUserId = require('../../hooks/convert-user-id');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [convertUserId()],
    get: [],
    create: [addUserId()],
    update: [verifyUser()],
    patch: [verifyUser()],
    remove: [verifyUser()]
  },

  after: {
    all: [],
    find: [maskRoll()],
    get: [maskRoll()],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
