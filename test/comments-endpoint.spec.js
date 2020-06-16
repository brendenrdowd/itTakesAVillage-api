const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('story endpoints', function () {
  let db;

  const { testStories, testUsers, testComments } = helpers.makeFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe(`POST /api/story`, () => {
    context(`Story Validation`, () => {
      beforeEach('insert users', () => {
        return db.into('itav_users').insert(testUsers);
      });
      beforeEach('insert stories', () => {
        return db.into('itav_stories').insert(testStories);
      });
      beforeEach('insert comments', () => {
        return db.into('itav_comments').insert(testComments);
      });

      context(`happy path test`, () => {
        it(`responds 201, serialized story`, () => {
          const newComment = {
            author: 1,
            story: 1,
            comment: 'test comment',
          };
          return supertest(app)
            .post('/api/comment')
            .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
            .send(newComment)
            .expect(201)
            .expect((res) => {
              expect(res.body).to.have.property('id');
              expect(res.body.author).to.eql(newComment.author);
              expect(res.body.story).to.eql(newComment.story);
              expect(res.body.comment).to.eql(newComment.comment);
              expect(res.headers.location).to.eql(
                `/api/comment/${res.body.id}`
              );
            })
            .expect((res) =>
              db
                .from('itav_comments')
                .select('*')
                .where({ id: res.body.id })
                .first()
                .then((row) => {
                  expect(row.author).to.eql(newComment.author);
                  expect(row.story).to.eql(newComment.story);
                  expect(row.comment).to.eql(newComment.comment);
                  expect(row.resolved).to.eql(newComment.resolved);
                })
            );
        });
      });
    });
  });
});
