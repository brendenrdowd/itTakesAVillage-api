const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("story endpoints", function () {
  let db;

  const { testStories, testUsers } = helpers.makeFixtures();
  const testUser = testUsers[0];

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`POST /api/story`, () => {
    context(`Story Validation`, () => {
      beforeEach("insert users", () => {
        return db.into("itav_users").insert(testUsers);
      });
      beforeEach("insert stories", () => {
        return db.into("itav_stories").insert(testStories);
      });

      context(`happy path test`, () => {
        it(`responds 201, serialized story`, () => {
          const newStory = {
            author: 1,
            issue: "need food",
            flag: "food",
            resolved: false,
          };
          console.log(testUser);

          return supertest(app)
            .post("/api/story")
            .set("Authorization", helpers.makeAuthHeader(testUser))
            .send(newStory)
            .expect(201)
            .expect((res) => {
              expect(res.body).to.have.property("id");
              expect(res.body).to.have.property("created_at");
              expect(res.body.author).to.eql(newStory.author);
              expect(res.body.issue).to.eql(newStory.issue);
              expect(res.headers.location).to.eql(`api/story/${res.body.id}`);
            })
            .expect((res) =>
              db
                .from("itav_stories")
                .select("*")
                .where({ id: res.body.id })
                .first()
                .then((row) => {
                  expect(row.author).to.eql(newStory.author);
                  expect(row.issue).to.eql(newStory.issue);
                  expect(row.flag).to.eql(newStory.flag);
                  expect(row.resolved).to.eql(newStory.resolved);
                })
            );
        });
      });
    });
  });
});
