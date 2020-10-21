const sessionsDb = require('../db/sessions');
const characterDb = require('../db/characters');

const getSession = (req, res) => {
    res.json('notimpl');
};

const getSessionById = async (req, res) => {
    const { id } = req.params;
    const session = await sessionsDb.find({ _id: id });
    res.json(session);
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

const addToSession = async (req, res) => {
    const { sessionId, characterId } = req.params;
    const updatedChar = await characterDb.update(characterId, null, {
        sessionId: sessionId,
        inSession: true
    });

    res.json(typeof updatedChar != undefined);
};

const removeFromSession = async (req, res) => {
    const { sessionId, characterId } = req.params;
    const updatedChar = await characterDb.update(characterId, null, {
        sessionId: sessionId,
        inSession: false
    });

    res.json(typeof updatedChar != undefined);
};

module.exports = {
    '/session': {
        get: getSession,
        post: createSession,
    },
    '/session/:id': {
        get: getSessionById,
    },
    '/session/search': {
        post: searchSessionByName
    },
    '/session/:sessionId/character/:characterId': {
        post: addToSession,
        delete: removeFromSession,
    },
    getSession,
    createSession,
    searchSessionByName,
};
