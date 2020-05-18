require('dotenv').config();
const express = require('express'),
  morgan = require('morgan'),
  cors = require('cors'),
  helmet = require('helmet'),
  app = express(),
  { NODE_ENV } = require('./config'),
  authRouter = require('./auth/auth-router'),
<<<<<<< HEAD
  usersRouter = require('./user/users-router'),
=======
  usersRouter = require('./users/users-router'),
>>>>>>> 14f12517446995266bfc9b18d3db966def7cc5ea
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
<<<<<<< HEAD
=======
  console.error(error);
>>>>>>> 14f12517446995266bfc9b18d3db966def7cc5ea
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
<<<<<<< HEAD
    console.error(error);
=======
>>>>>>> 14f12517446995266bfc9b18d3db966def7cc5ea
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
