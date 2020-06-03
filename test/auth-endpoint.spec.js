<<<<<<< HEAD
// const knex = require("knex");
// const app = require("../src/app");
// const helpers = require("./test-helpers");
// const jwt = require("jsonwebtoken");

// describe("Auth Endpoints", function () {
=======
// const knex = require('knex');
// const app = require('../src/app');
// const helpers = require('./test-helpers');
// const jwt = require('jsonwebtoken');

// describe('Auth Endpoints', function () {
>>>>>>> master
//   let db;

//   const { testUsers } = helpers.makeFixtures();
//   const testUser = testUsers[0];

<<<<<<< HEAD
//   before("make knex instance", () => {
//     db = knex({
//       client: "pg",
//       connection: process.env.TEST_DB_URL,
//     });
//     app.set("db", db);
//   });

//   after("disconnect from db", () => db.destroy());

//   before("cleanup", () => helpers.cleanTables(db));

//   afterEach("cleanup", () => helpers.cleanTables(db));

//   describe(`POST /api/auth/login`, () => {
//     beforeEach("insert users", () => {
//       return db.into("itav_users").insert(testUsers);
//       helpers.seedUsers(db, testUsers);
//     });

//     const requiredFields = ["username", "password"];
=======
//   before('make knex instance', () => {
//     db = knex({
//       client: 'pg',
//       connection: process.env.TEST_DB_URL,
//     });
//     app.set('db', db);
//   });

//   after('disconnect from db', () => db.destroy());

//   before('cleanup', () => helpers.cleanTables(db));

//   afterEach('cleanup', () => helpers.cleanTables(db));

//   describe(`POST /api/auth/login`, () => {
//     beforeEach('insert users', () => {
//       return db.into('itav_users').insert(testUsers);
//       helpers.seedUsers(db, testUsers);
//     });

//     const requiredFields = ['username', 'password'];
>>>>>>> master

//     requiredFields.forEach((field) => {
//       const loginAttemptBody = {
//         username: testUser.username,
//         password: testUser.password,
//       };

//       it(`responds with 400 required error when '${field}' is missing`, () => {
//         delete loginAttemptBody[field];

//         return supertest(app)
<<<<<<< HEAD
//           .post("/api/auth/login")
=======
//           .post('/api/auth/login')
>>>>>>> master
//           .send(loginAttemptBody)
//           .expect(400, {
//             error: `Missing '${field}' in request body`,
//           });
//       });
//       it(`responds 400 'invalid username or password' when bad username`, () => {
<<<<<<< HEAD
//         const userInvalidUser = { username: "user-not", password: "existy" };
//         return supertest(app)
//           .post("/api/auth/login")
=======
//         const userInvalidUser = { username: 'user-not', password: 'existy' };
//         return supertest(app)
//           .post('/api/auth/login')
>>>>>>> master
//           .send(userInvalidUser)
//           .expect(400, { error: `Incorrect username or password` });
//       });
//       it(`responds 400 'invalid username or password' when bad password`, () => {
//         const userInvalidPass = {
//           username: testUser.username,
<<<<<<< HEAD
//           password: "incorrect",
//         };
//         return supertest(app)
//           .post("/api/auth/login")
=======
//           password: 'incorrect',
//         };
//         return supertest(app)
//           .post('/api/auth/login')
>>>>>>> master
//           .send(userInvalidPass)
//           .expect(400, { error: `Incorrect username or password` });
//       });
//     });

//     describe(`POST /api/auth/refresh`, () => {
<<<<<<< HEAD
//       beforeEach("insert users", () => helpers.seedUsers(db, testUsers));
=======
//       beforeEach('insert users', () => helpers.seedUsers(db, testUsers));
>>>>>>> master
//       it(`responds 200 and JWT auth token using secret`, () => {
//         const expectedToken = jwt.sign(
//           { user_id: testUser.id },
//           process.env.JWT_SECRET,
//           {
//             subject: testUser.username,
//             expiresIn: process.env.JWT_EXPIRY,
<<<<<<< HEAD
//             algorithm: "HS256",
//           }
//         );
//         return supertest(app)
//           .post("/api/auth/refresh")
//           .set("Authorization", helpers.makeAuthHeader(testUser))
=======
//             algorithm: 'HS256',
//           }
//         );
//         return supertest(app)
//           .post('/api/auth/refresh')
//           .set('Authorization', helpers.makeAuthHeader(testUser))
>>>>>>> master
//           .expect(200, {
//             authToken: expectedToken,
//           });
//       });
//     });
//   });
// });
