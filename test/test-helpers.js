const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Test helpers for test users
function makeUsersArray() {
  return [
    {
      id: 1,
      username: "test-user-1",
      name: "Test user 1",
      email: "example@email.com",
      password: "Password123",
      location: " 94601",
    },
    {
      id: 2,
      username: "test-user-2",
      name: "Test user 2",
      email: "example2@email.com",
      password: "Password123",
      location: "94601",
    },
    {
      id: 3,
      username: "test-user-3",
      name: "Test user 3",
      email: "example3@email.com",
      password: "Password123",
      location: " 94601",
    },
    {
      id: 4,
      username: "test-user-4",
      name: "Test user 4",
      email: "example4@email.com",
      password: "Password123",
      location: "94601",
    },
  ];
}
// needs to be updated
//Test helper for test stories
function makeStoriesArray(users) {
  return [
    {
      author: 1,
      issue: "story test 1",
      flag: "clothes",
      resolved: false,
      created_at: new Date(),
    },
    {
      author: 2,
      issue: "story test 1",
      flag: "clothes",
      resolved: false,
      created_at: new Date(),
    },
    {
      author: 3,
      issue: "story test 1",
      flag: "clothes",
      resolved: false,
      created_at: new Date(),
    },
    {
      author: 4,
      issue: "story test 1",
      flag: "clothes",
      resolved: false,
      created_at: new Date(),
    },
    // {
    //   id: 2,
    //   author: 2,
    //   issue: "story test 1",
    //   flag: "clothes",
    //   resolved: false,
    //   created_at: new Date(),
    // },
    // {
    //   id: 3,
    //   author: 3,
    //   issue: "story test 1",
    //   flag: "clothes",
    //   resolved: false,
    //   created_at: new Date(),
    // },
    // {
    //   id: 4,
    //   author: 4,
    //   issue: "story test 1",
    //   flag: "clothes",
    //   resolved: false,
    //   created_at: new Date(),
    // },
  ];
}
// needs to be updated
//Test helpers for test comments
function makeCommentsArray(users, stories) {
  return [
    {
      author: 1,
      story: 1,
      comment: "test comment 1",
      created_at: new Date(),
    },
    {
      author: 1,
      story: 1,
      comment: "test comment 2",
      created_at: new Date(),
    },
    {
      author: 1,
      story: 1,
      comment: "test comment 3",
      created_at: new Date(),
    },
    {
      author: 1,
      story: 1,
      comment: "test comment 4",
      created_at: new Date(),
    },
  ];
}

function makeFixtures() {
  const testUsers = makeUsersArray();
  const testStories = makeStoriesArray(testUsers);
  const testComments = makeCommentsArray(testUsers, testStories);

  return { testUsers, testStories, testComments };
}
//Truncates tables in database
function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      itav_users,
      itav_comments,
      itav_stories
      RESTART IDENTITY CASCADE;`
  );
}
//Seeds hashed users and passwords
function seedUsers(db, users) {
  const hashedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db.into("itav_users").insert(hashedUsers);
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const testUsers = makeUsersArray();
  user = testUsers;
  console.log("username is a", typeof testUsers[0].username);
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: testUsers[0].username,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeCommentsArray,
  makeStoriesArray,
  cleanTables,
  seedUsers,
  makeAuthHeader,
  makeFixtures,
};
