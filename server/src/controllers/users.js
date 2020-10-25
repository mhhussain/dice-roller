const characterDb = require('../db/characters');

const getSessionUser = (req, res) => {
    const { user } = req;
    res.json({
        username: user.username,
        email: user.email,
    });
};

const getUserCharacters = async (req, res) => {
    const { user } = req;

    const chars = await characterDb.find({ userId: user._id });
    res.json(chars);
}

module.exports = {
    '/user': {
        get: getSessionUser,
    },
    '/user/character': {
        get: getUserCharacters,
    }
};
