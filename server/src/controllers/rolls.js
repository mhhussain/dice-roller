const _ = require('lodash');
const rollDb = require('../db/rolls');

const getRollsForUser = async (req, res) => {
    const { user } = req;
    const { sessionId, characterId } = req.params;

    const rolls = await rollDb.find({ sessionId });

    console.log(await rolls);

    res.json(_.map(rolls, (r) => {
        return {
            _id: r._id,
            sessionId: r.sessionId,
            characterId: r.characterId,
            dvalue: r.characterId === characterId || r.visible ? r.dvalue: null,
            roll: r.characterId === characterId || r.visible ? r.roll : null,
            name: r.name,
            rollTime: r.rollTime,
            visible: r.visible,
        };
    }));
};

const roll = async (req, res) => {
    const { sessionId, characterId, dvalue } = req.body;

    const rng = Math.ceil(Math.random() * dvalue);
    const roll = {
        sessionId,
        characterId,
        dvalue,
        'roll': rng,
        name: 'roll',
        rollTime: new Date(),
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

const showRoll = async (req, res) => {
    const { id: _id } = req.params;
    const updatedRoll = await rollDb.update(_id, null, {
        visible: true,
    });

    res.json(typeof updatedRoll != undefined);
};

const hideRoll = async (req, res) => {
    const { id: _id } = req.params;
    const updatedRoll = await rollDb.update(_id, null, {
        visible: false,
    });

    res.json(typeof updatedRoll != undefined);
};

const nameRoll = async (req, res) => {
    const { id: _id } = req.params;
    const { name } = req.body;

    const updatedRoll = await rollDb.update(_id, null, {
        name: name,
    });

    res.json(typeof updatedRoll != undefined);
};

const deleteRoll = async (req, res) => {
    const { id: _id } = req.params;

    const deletedRoll = await rollDb.remove(_id);
    res.json(typeof deletedRoll != undefined);
}

module.exports = {
    '/roll': {
        post: roll,
    },
    '/roll/:id': {
        delete: deleteRoll,
    },
    '/roll/session/:sessionId/character/:characterId' : {
        get: getRollsForUser,
    },
    '/roll/:id/show': {
        post: showRoll,
        delete: hideRoll,
    },
    '/roll/:id/name': {
        post: nameRoll,
    },
};
