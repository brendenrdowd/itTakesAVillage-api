require("dotenv").config();
const express = require("express"),
  morgan = require("morgan"),
  cors = require("cors"),
  helmet = require("helmet"),
  app = express(),
  usersRouter = require("./user/users-router"),
  { NODE_ENV } = require("./config");

const authRouter = require("./auth/auth-router");
const StoryRouter = require("./story/story-router");

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use("/api/auth", authRouter);
// left / off at the end on purpose
app.use("/api", StoryRouter);
app.use("/api/users", usersRouter);

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
