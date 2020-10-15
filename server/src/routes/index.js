const e = require('express');
const _ = require('lodash');
const logger = require('../logger').logger('router');
const sessionsController = require('../controllers/sessions');
const usersController = require('../controllers/users');
const charactersController = require('../controllers/characters');
const rollsController = require('../controllers/rolls');

// All controllers must be registered here
const controllers = _.merge(
    {},
    sessionsController,
    usersController,
    charactersController,
    rollsController
)

const router = e.Router();
_.forOwn(controllers, (controller, path) => {
    _.forOwn(
        _.pick(controller, ['all', 'get', 'post', 'put', 'patch', 'delete']),
        (handler, method) => {
            logger.info(`Configuring to handle ${_.upperCase(method)} requests on path ${path}`);
            router.route(path)[method](handler);
        }
    );
})

module.exports = router;