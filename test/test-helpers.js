const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      name: 'Test user 1',
      email: 'example@email.com',
      password: 'Password123',
      location: ' 94601',
    },
    {
      id: 2,
      username: 'test-user-2',
      name: 'Test user 2',
      email: 'example2@email.com',
      password: 'Password123',
      location: '94601',
    },
    {
      id: 3,
      username: 'test-user-3',
      name: 'Test user 3',
      email: 'example3@email.com',
      password: 'Password123',
      location: ' 94601',
    },
    {
      id: 4,
      username: 'test-user-4',
      name: 'Test user 4',
      email: 'example4@email.com',
      password: 'Password123',
      location: '94601',
    },
  ];
}

function makeFixtures() {
  const testUsers = makeUsersArray();

  return { testUsers };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      itav_users,
      itav_comments,
      itav_stories
      RESTART IDENTITY CASCADE`
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));

  return db
    .into('itav_users')
    .insert(preppedUsers)
    .returning('*')
    .then(([user]) => user);
}

module.exports = {
  makeUsersArray,
  makeFixtures,
  cleanTables,
  seedUsers,
};
