const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Welcome to the It Takes a Village API!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Welcome to the It Takes a Village API!')
  })
})