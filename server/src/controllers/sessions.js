const getSession = (req, res) => {
    res.json('notimpl');
};

const getSessionId = (req, res) => {
    const { id } = req.params;
    res.json(id);
};

module.exports = {
    '/session': {
        get: getSession,
    },
    '/session/:id': {
        get: getSessionId
    },
    getSession,
    getSessionId,
};
