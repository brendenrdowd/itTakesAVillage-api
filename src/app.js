require('dotenv').config();
const express = require('express'),
  morgan = require('morgan'),
  cors = require('cors'),
  helmet = require('helmet'),
  app = express(),
  { NODE_ENV } = require('./config'),
  authRouter = require('./auth/auth-router'),
  usersRouter = require('./users/users-router'),
  morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the It Takes a Village API!');
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
