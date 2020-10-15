
const getSessionUser = (req, res) => {
    const { user } = req;
    res.json({
        username: user.username,
        email: user.email,
    });
};

module.exports = {
    '/user': {
        get: getSessionUser,
    },
};
