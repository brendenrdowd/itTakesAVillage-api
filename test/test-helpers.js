
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// makeUsersArray
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
// needs to be updated
function makeStoriesArray(users) {
  return [
    {

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
function makeCommentsArray(users) {
  return [
    {

    },
    {

    },
    {

    },
    {

    },
  ]
}

function makeStoryFixtures() {
  const testUsers = makeUsersArray()
  const testStories = makeStoriesArray(testUsers)
  const testComments = makeCommentsArray(testUsers, testStories)

  return { testUsers, testRecipes }
}

function makeFixtures() {
  return [{}, {}, {}, {}];
}

function makeStoryFixtures() {
  const testUsers = makeUsersArray();
  const testStories = makeStoriesArray(testUsers);
  const testComments = makeCommentsArray(testUsers, testStories);

  return { testUsers, testRecipes };
}

// function makeExpectedThing(users, thing, reviews = []) {
//   const user = users.find((user) => user.id === thing.user_id);

//   const thingReviews = reviews.filter((review) => review.thing_id === thing.id);

//   const number_of_reviews = thingReviews.length;
//   const average_review_rating = calculateAverageReviewRating(thingReviews);

//   return {
//     id: thing.id,
//     image: thing.image,
//     title: thing.title,
//     content: thing.content,
//     date_created: thing.date_created,
//     number_of_reviews,
//     average_review_rating,
//     user: {
//       id: user.id,
//       user_name: user.user_name,
//       full_name: user.full_name,
//       nickname: user.nickname,
//       date_created: user.date_created,
//     },
//   };
// }

// function makeUsersFixtures() {
//   const testUsers = makeUsersArray();

//   return { testUsers };
// }

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      itav_users,
      itav_comments,
      itav_stories
      RESTART IDENTITY CASCADE;`
  )
    
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
  return `Bearer ${ token } `;
}

// };

// function seedUsers(db, users) {
//   const hashedUsers = users.map((user) => ({
//     ...user,
//     password: bcrypt.hashSync(user.password, 1),
//   }));
//   return db.into("itav_users").insert(hashedUsers);
// }

// function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
//   const token = jwt.sign({ user_id: user.id }, secret, {
//     subject: user.name,
//     algorithm: "HS256",
//   });
//   return `Bearer ${ token } `;
// }

// module.exports = {
//   makeUsersArray,
//   makeStoryFixtures,
//   cleanTables,
//   seedUsers,
//   makeAuthHeader,
//       RESTART IDENTITY CASCADE`
//   );
// }

// // function seedUsers(db, users) {
// //   //   const preppedUsers = users.map((user) => ({
// //   //     ...user,
// //   //     password: bcrypt.hashSync(user.password, 1),
// //   //   }));

// //   return db
// //     .insert(users)
// //     .into('itav_users')
// //     .returning('*')
// //     .then(([user]) => user);
// // }

// // function seedThingsTables(db, users, things, reviews = []) {
// //   return db
// //     .into('thingful_users')
// //     .insert(users)
// //     .then(() =>
// //       db
// //         .into('thingful_things')
// //         .insert(things)
// //     )
// //     .then(() =>
// //       reviews.length && db.into('thingful_reviews').insert(reviews)
// //     )
// // }

// // function seedMaliciousThing(db, user, thing) {
// //   return seedUsers(db, [user]).then(() =>
// //     db.into('thingful_things').insert([thing])
// //   );
// // }

// module.exports = {
//   makeUsersArray,
//   makeFixtures,
//   cleanTables,
//   //   seedUsers,
// };

