const rollDb = require('../db/rolls');

const getRollsForUser = async (req, res) => {
    const { user } = req;

    res.json('notimpl');
};

const roll = async (req, res) => {
    const { sessionId, characterId, dvalue } = req.body;

    const rng = Math.ceil(Math.random() * dvalue);
    const roll = {
        sessionId,
        characterId,
        dvalue,
        rng,
        'roll': rng,
        rollTime: newDate(),
        visible: false,
    };

    rollDb
        .validate(roll)
        .then(async (val) => {
            const createdRoll = await rollDb.create(roll);
            res.json(createdRoll);
        })
        .catch(({ name, erors }) => {
            res.status(500).json({ name, errors });
        });
};

module.exports = {
    '/roll': {
        get: getRollsForUser,
        post: roll
    }
};
