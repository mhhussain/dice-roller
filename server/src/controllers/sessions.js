const sessionsDb = require('../db/sessions');

const getSession = (req, res) => {
    res.json('notimpl');
};

const searchSessionByName = async (req, res) => {
    const { name, password } = req.body;
    const session = await sessionsDb.find({ name, password });
    res.json(session);
};

const createSession = async (req, res) => {
    const { name, password } = req.body;
    const newSession = {
        status: 'open',
        name,
        password,
        created: new Date(),
    };

    sessionsDb
        .validate(newSession)
        .then(async (val) => {
            const createdSession = await sessionsDb.create(newSession);
            res.json(createdSession);
        })
        .catch(({ name, errors }) => {
            res.status(500).json({ name, errors });
        });
};

module.exports = {
    '/session': {
        get: getSession,
        post: createSession,
    },
    '/session/search': {
        post: searchSessionByName
    },
    getSession,
    createSession,
    searchSessionByName,
};
