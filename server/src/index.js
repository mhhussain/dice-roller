const e = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const config = require('./config');

const router = require('./routes/router');

require('dotenv').config();

const app = e();
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());
app.use(e.json());

app.get('/', (req, res) => {
  res.json({
    message: 'dice roller',
  });
});

app.use((e, req, res, next) => {
  if (e.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: e.message,
    stack: process.env.NODE_ENV === 'production' ? 'NA' : e.stack,
  });
});

router(app);

app.listen(config.PORT, () => {
  console.log(`Listening at http://localhost:${config.PORT}`);
});
