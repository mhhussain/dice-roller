const users = require('./users/users.service.js');
const sessions = require('./sessions/sessions.service.js');
const rolls = require('./rolls/rolls.service.js');
const characters = require('./characters/characters.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(sessions);
  app.configure(rolls);
  app.configure(characters);
};
