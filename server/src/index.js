const e = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const _ = require('lodash');

const configs = require('./configs');

let app = e();
app.use(cors());
app.use(helmet());
app.use(morgan(configs.MORGAN_FORMAT));
app.use(e.json());

app.get('/ping', (req, res) => {
    res.json({ message: 'pong' });
});

const routes = require('./routes');
app.use('/api', routes)

// Handle static front-end client for PROD
if (process.env.NODE_ENV === 'production') {
    app.use(e.static(`${__dirname}/public/`));
    app.get(/.*/, (req, res) => res.sendFile(`${__dirname}/public/index.html`));
};

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
    console.log(`Listening at http://localhost:${configs.PORT}`);
});
