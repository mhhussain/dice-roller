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

app.get("/session", async (req, res) => {
  const allSessions = await sessions.find();
  res.json(allSessions);
});

app.get("/session/:id", async (req, res, next) => {
  const { id: _id } = req.params;
  try {
    const session = await sessions.findOne({ _id });
    res.json(session);
  } catch (e) {
    next(new Error(`Session [${_id}] not found.`));
  }
});

app.post("/session", async (req, res) => {
  const session = {
    createdDate: new Date(),
    open: true,
  };
  sessionSchema.validate(session);
  // create session
  const createdSession = await sessions.insert(session);
  res.json(createdSession);
});

app.delete("/session/:id", async (req, res) => {
  const { id: _id } = req.params;
  const updated = await sessions.update({ _id }, { $set: { open: false } });
  res.json(typeof updated != "undefined");
});

const port = process.env.PORT || 9002;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
