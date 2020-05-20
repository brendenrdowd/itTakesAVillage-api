const bcrypt = require('bcryptjs');
const xss = require('xss');

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;

const UsersService = {
  hasUserWithUserName(db, username) {
    return db('itav_users')
      .where({ username })
      .first()
      .then((user) => !!user);
  },
  hasUserWithEmail(db, email) {
    return db('itav_users')
      .where({ email })
      .first()
      .then((email) => !!email);
  },
  getAllUsers(db) {
    return db.from('itav_users').select('*');
  },
  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('itav_users')
      .returning('*')
      .then(([user]) => user);
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password be longer than 8 characters';
    }
    if (password.length > 72) {
      return 'Password be less than 72 characters';
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain least one upper case and one number';
    }
    return null;
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(user) {
    return {
      id: user.id,
      name: xss(user.name),
      username: xss(user.username),
      email: xss(user.email),
      location: user.location,
    };
  },
};

module.exports = UsersService;
