const express = require('express');
const path = require('path');
const UsersService = require('./users-service');
const { requireAuth } = require('../middleware/jwt-auth')

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.route('/').get((req, res, next) => {
  UsersService.getAllUsers(req.app.get('db'))
    .then((users) => {
      res.json(users.map(UsersService.serializeUser));
    })
    .catch(next);
});
usersRouter.get('/:id', (req, res, next) => {
  UsersService.getUserById(
    req.app.get('db'),
    req.params.id)
    .then((user) => {
      res.json(serializeStory(user));
    })
    .catch(next);
})

usersRouter.delete('/', requireAuth, (req, res, next) => {
  UsersService.deleteUser(
    req.app.get('db'),
    req.user.id)
    .then((user) => {
      res.json({ message: "User was deleted" });
    })
    .catch(next);
})

usersRouter.post('/', jsonBodyParser, (req, res, next) => {
  const { name, email, username, location, password } = req.body;

  for (const field of ['name', 'username', 'password', 'location', 'email'])
    if (!req.body[field])
      return res.status(400).json({
        error: `Missing '${field}' in request body`,
      });

  const passwordError = UsersService.validatePassword(password);

  if (passwordError) return res.status(400).json({ error: passwordError });

  UsersService.hasUserWithUserName(req.app.get('db'), username)
    .then((hasUserWithUserName) => {
      if (hasUserWithUserName)
        return res.status(400).json({ error: `Username already taken` });

      UsersService.hasUserWithEmail(req.app.get('db'), email).then(
        (hasUserWithEmail) => {
          if (hasUserWithEmail) {
            return res.status(400).json({ error: 'Email already taken' });
          }
        }
      );

      return UsersService.hashPassword(password).then((hashedPassword) => {
        const newUser = {
          username,
          password: hashedPassword,
          name,
          email,
          location,
        };

        return UsersService.insertUser(req.app.get('db'), newUser).then(
          (user) => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${user.id}`))
              .json(UsersService.serializeUser(user));
          }
        );
      });
    })
    .catch(next);
});

module.exports = usersRouter;
