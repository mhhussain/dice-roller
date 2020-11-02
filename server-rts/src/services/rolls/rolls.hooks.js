const { authenticate } = require('@feathersjs/authentication').hooks;

const addUserId = require('../../hooks/add-user-id');

const verifyUser = require('../../hooks/verify-user');

const maskRoll = require('../../hooks/mask-roll');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
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
