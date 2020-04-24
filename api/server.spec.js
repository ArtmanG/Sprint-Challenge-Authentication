const server = require('./server');
const request = require('supertest');
const db = require('../database/dbConfig');

describe('testing /api/auth/register', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should return a 201 status', async () => {
    return request(server)
      .post('/api/auth/register')
      .send({ username: 'Gandalf', password: 'Mellon' })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });

  it('should return the correct username', async () => {
    return request(server)
      .post('/api/auth/register')
      .send({ username: 'Gandalf', password: 'Mellon' })
      .then((res) => {
        expect(res.body.username).toBe('Gandalf');
      });
  });
});


describe('testing /api/auth/login', () => {
  it("should return a 200 status", async () => {
    return request(server)
      .post('/api/auth/login')
      .send({ username: 'Gandalf', password: 'Mellon' })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

  it('testing that a user can login', async () => {
    return request(server)
      .post('/api/auth/login')
      .send({ username: 'Gandalf', password: 'Mellon' })
      .then((res) => {
        expect(res.body.message).toBe('Welcome Gandalf!');
      });
  });
});


describe('testing /api/jokes', () => {
  it('should return a 401 status if user is not logged in', () => {
      return request(server)
      .get('/api/jokes')
      .then(res => {
          expect(res.status).toBe(401)
      });
  });
  it('should return an error message say to log in', () => {
      return request(server)
      .get('/api/jokes')
      .then(res => {
          expect(res.body).toMatchObject({
              message: "Speak friend and enter"
          });
      });
  });
})