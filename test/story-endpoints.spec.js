const app = require("../src/app");
const helpers = require("./test-helpers");

describe("story endpoints", function () {
  let db;

  const { testStories } = helpers.makeStoryFixtures();
  const testStory = testStories[0];

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`POST /api/story`, () => {
    context(`Story Validation`, () => {
      beforeEach("insert stories", () => helpers.seedStories(db, testStories));

      const requiredFields = ["author", "issue", "flag"];
      // Checks required fields are filled when posting a new story
      requiredFields.forEach((field) => {
        const storyBody = {
          author: 1,
          issue: "Looking for food",
          flag: "food",
        };

        it(`responds with 400 required error when '${field}' is missing`, () => {
          delete storyBody[field];

          return supertest(app)
            .post("/api/story")
            .send(storyBody)
            .expect(400, {
              error: `Missing '${field}' in request body`,
            });
        });
      });
      // Tests that author is a number
      it(`responds 400 author must be a number`, () => {
        const authorNotNumber = {
          author: "one",
          issue: "Looking for food",
          flag: "food",
        };
        return supertest(app)
          .post("/api/story")
          .send(authorNotNumber)
          .expect(400, { error: `author is not a number` });
      });
      //Tests that issue stated is text (string)
      it(`responds 400 issue must be a string`, () => {
        const issueNotString = {
          author: 1,
          issue: 9000,
          flag: "food",
        };
        return supertest(app)
          .post("/api/story")
          .send(issueNotString)
          .expect(400, { error: `issue is not a string` });
      });

      it(`responds 400 flag must be a string`, () => {
        const flagNotString = {
          author: 1,
          issue: "Looking for food",
          flag: 45,
        };
        return supertest(app)
          .post("/api/story")
          .send(flagNotString)
          .expect(400, { error: `flag is not a string` });
      });
      //Happy path test for new story
      context(`happy path test`, () => {
        it(`responds 201, serialized story`, () => {
          const newStory = {
            author: 45,
            issue: "need food",
            flag: "food",
            resolved: false,
          };
          return supertest(app)
            .post("/api/story")
            .send(newStory)
            .expect(201)
            .expect((res) => {
              expect(res.body).to.have.property("id");
              expect(res.body).to.have.property("created_at");
              expect(res.body.author).to.eql(newStory.author);
              expect(res.body.issue).to.eql(newStory.issue);
              expect(res.body).to.not.have.property("password");
              expect(res.headers.location).to.eql(`/api/story/${res.body.id}`);
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

                  return compare(newStory, testStory);
                })
                .then((compareMatch) => {
                  expect(compareMatch).to.be.true;
                })
            );
        });
      });
    });
  });
});
