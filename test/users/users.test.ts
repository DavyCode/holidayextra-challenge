import app from '../../app';
import supertest from 'supertest';
import { expect } from 'chai';
import mongoose from 'mongoose';

let firstUserIdTest = '';
const firstUserBody = {
  email: `John${Math.random()}Stones@test.com`,
  password: '122aa1212',
  givenName: 'John',
  familyName: 'Stones',
};

let accessToken = '';
const newGivenName = 'Sam';
const newGivenName2 = 'Mark';
const newFamilyName2 = 'Gates';

describe('users and auth endpoints', function () {
  let request: supertest.SuperAgentTest;
  before(function () {
    request = supertest.agent(app);
  });
  after(function (done) {
    app.close(() => {
      mongoose.connection.close(done);
    });
  });

  it('should allow a POST to /users', async function () {
    const res = await request.post('/users').send(firstUserBody);

    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.be.an('string');
    firstUserIdTest = res.body.id;
  });

  it('should allow a POST to /auth', async function () {
    const res = await request.post('/auth').send(firstUserBody);
    expect(res.status).to.equal(201);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body.accessToken).to.be.a('string');
    accessToken = res.body.accessToken;
  });

  it('should allow a GET from /users/:userId with an access token', async function () {
    const res = await request
      .get(`/users/${firstUserIdTest}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expect(res.status).to.equal(200);
    expect(res.body).not.to.be.empty;
    expect(res.body).to.be.an('object');
    expect(res.body._id).to.be.a('string');
    expect(res.body._id).to.equal(firstUserIdTest);
    expect(res.body.email).to.equal(firstUserBody.email);
  });

  it('should allow a PATCH to /users/:userId', async function () {
    const res = await request
      .patch(`/users/${firstUserIdTest}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        givenName: newGivenName,
      });
    expect(res.status).to.equal(204);
  });

  it('should disallow a PUT to /users/:userId with an wrong ID', async function () {
    const res = await request
      .put(`/users/wrong-id`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        email: firstUserBody.email,
        password: firstUserBody.password,
        givenName: 'James',
        familyName: 'Bond',
      });
    expect(res.status).to.equal(400);
  });

  it('should disallow a PUT to /users/:userId with an nonexistant ID', async function () {
    const res = await request
      .put(`/users/600df7252984884f85702cb4`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        email: firstUserBody.email,
        password: firstUserBody.password,
        givenName: 'James',
        familyName: 'Bond',
      });
    expect(res.status).to.equal(404);
  });

  it('should allow a DELETE from /users/:userId', async function () {
    const res = await request
      .delete(`/users/${firstUserIdTest}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
    expect(res.status).to.equal(204);
  });
});
