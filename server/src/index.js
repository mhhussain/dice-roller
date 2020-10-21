const e = require('express');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const _ = require('lodash');
const logger = require('./logger').logger('app');
const auth = require('./auth');

const configs = require('./configs');

let app = e();
app.use(cors());
app.use(helmet());
app.use(morgan(configs.MORGAN_FORMAT));
app.use(session({
    secret: 'hotswap-on-the-downstroke',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(e.json());

app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

// Setup auth
auth.setup(passport);
app.use('/auth', auth.router(passport));

// Setup app routes
// Routing controllers can be found at /routes/index.js
const routes = require('./routes');
app.use('/api', auth.isAuth, routes)

// Handle static front-end client for PROD
if (process.env.NODE_ENV === 'production') {
    app.use(e.static(`${__dirname}/public/`));
    app.get(/.*/, (req, res) => res.sendFile(`${__dirname}/public/index.html`));
};

// Error handler
app.use((e, req, res, next) => {
    if (e.status) {
        res.status(e.status);
    } else {
        res.status(500);
    }
    res.json({
        message: e.message,
        stack: process.env.NODE_ENV === 'production' ? 'NA' : e.stack,
    });
});

app.listen(configs.PORT, () => {
    logger.info(`Listening at http://localhost:${configs.PORT}`);
});
