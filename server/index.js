const e = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const yup = require("yup");
const monk = require("monk");

require("dotenv").config();

const db = monk(process.env.MONGODB_URI);
const sessions = db.get("sessions");

const sessionSchema = yup.object().shape({
  _id: yup.string().trim().required(),
  createdDate: yup.date(),
  open: yup.boolean(),
});

const rollSchema = yup.object().shape({
  _id: yup.string().trim().required(),
  dice: yup.number().required(),
  roll: yup.number().required(),
  createdDate: yup.date().required(),
});

const app = e();

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(e.json());
app.use(e.static("./public"));

app.get("/", (req, res) => {
  res.json({
    message: "dice roller",
  });
});

// Error handler
app.use((e, req, res, next) => {
  if (e.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: e.message,
    stack: process.env.NODE_ENV === "production" ? "NA" : e.stack,
  });
});

app.get("/session", (req, res) => {
  // TODO: get all session
});

app.get("/session/:id", async (req, res, next) => {
  // TODO: get session by id
  const { id: _id } = req.params;
  console.log(_id);
  try {
    const session = await sessions.findOne({ _id });
    res.json(session);
  } catch (e) {
    next(new Error(`Session [${_id}] not found.`));
  }
});

app.post("/session", async (req, res) => {
  // TODO: create a new session, return session id
  const session = {
    createdDate: new Date(),
    open: true,
  };
  sessionSchema.validate(session);
  // create session
  const createdSession = await sessions.insert(session);
  res.json(createdSession);
});

const port = process.env.PORT || 9002;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
