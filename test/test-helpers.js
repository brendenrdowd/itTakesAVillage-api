const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// makeUsersArray
function makeUsersArray() {
  return [
    {
      id: 1,
      email: 'test1@gmail.com',
      name: 'Test user 1',
      password: 'Password1',
      username:"tester1",
      location:91210
    },
    {
      id: 2,
      email: 'test2@gmail.com',
      name: 'Test user 2',
      password: 'Password2',
      username:"test2",
      location:91210
    }
  ]
}
// needs to be updated
function makeStoriesArray(users) {
  return [
    {
      // id: 1,
      // issue: "test food",
      // created_at: new Date(),
      // author: users,
      // keyword: "groceries",
      // resolved: false,
    },
    {
      // id: 2,
      // issue: "test 2 food",
      // created_at: new Date(),
      // author: users,
      // keyword: "food offer",
      // resolved: false,
    },
    {
      // id: 3,
      // issue: "test ride",
      // created_at: new Date(),
      // author: users,
      // keyword: "rideshare",
      // resolved: false,
    },
    {
      // id: 4,
      // issue: "test transportation",
      // created_at: new Date(),
      // author: users,
      // keyword: "transportation",
      // resolved: false,
    },
  ];
}

// needs to be updated
function makeCommentsArray(users) {
  return [{}, {}, {}, {}];
}

function makeStoryFixtures() {
  const testUsers = makeUsersArray();
  const testStories = makeStoriesArray(testUsers);
  const testComments = makeCommentsArray(testUsers, testStories);

  return { testUsers, testRecipes };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      itav_users,
      itav_comments,
      itav_stories
      RESTART IDENTITY CASCADE;`
  );
}

function seedUsers(db, users) {
  const hashedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db.into("itav_users").insert(hashedUsers);
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.name,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeStoryFixtures,
  cleanTables,
  seedUsers,
  makeAuthHeader,
};
