const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// makeUsersArray
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
function makeStoriesArray(users) {
  return [
    {
      id: 1,
      issue:
        "Looking for a person, who can go to WholeFoods and buy a groceries from a list for me and arrange a non-contact delivery to my house",
      created_at: "2020-05-22T11:03:23.317Z",
      author: 1,
      flag: "food",
      resolved: false,
    },
    {
      id: 2,
      issue: "Need a ride to the hospital for an appointment on 5/30",
      created_at: "2020-05-22T11:03:23.317Z",
      author: 1,
      flag: "transportation",
      resolved: false,
    },
    {
      id: 3,
      issue: "looking for a winter jacket for my son, he is 10",
      created_at: "2020-05-22T11:03:23.317Z",
      author: 1,
      flag: "clothing",
      resolved: false,
    },
    {
      id: 4,
      issue: "test",
      created_at: "2020-05-22T11:45:17.295Z",
      author: 3,
      flag: "food",
      resolved: false,
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

  return { testUsers, testStories };
}

function makeFixtures() {
  return [{}, {}, {}, {}];
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
  return `Bearer ${token} `;
}

function seedStories(db, stories) {
  const testStories = stories.map((story) => ({
    ...story,
  }));
  return db.into("itav_stories").insert(testStories);
}

module.exports = {
  makeUsersArray,
  makeFixtures,
  cleanTables,
  seedUsers,
  makeStoryFixtures,
  makeStoriesArray,
  seedStories,
};
