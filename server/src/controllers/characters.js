const { id } = require('monk');
const charactersDb = require('../db/characters');

const getCharacters = async (req, res) => {
    const { _id } = req.user;
    const { sessionId } = req.params;

    const characters = await charactersDb.find({
        userId: _id,
        sessionId
    });

    res.json(characters);
};

const createCharacter = async (req, res) => {
    const { name } = req.body;
    const { sessionId } = req.params;
    const { _id } = req.user;

    const newChar = {
        name,
        level: 1,
        class: 'none',
        userId: _id,
        sessionId: sessionId,
        inSession: true,
    };

    charactersDb
        .validate(newChar)
        .then(async (val) => {
            const createdChar = await charactersDb.create(newChar);
            res.json(createdChar);
        })
        .catch(({ name, errors }) => {
            res.status(500).json({ name, errors });
        });
};

module.exports = {
    '/character/:sessionId': {
        get: getCharacters,
        post: createCharacter,
    },
    getCharacters,
    createCharacter,
};
