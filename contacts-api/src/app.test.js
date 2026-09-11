const request = require('supertest');
const { createApp } = require('./app');
const { MemoryContactStore } = require('./data/contactStore');

// These tests use the memory store so they run without touching MongoDB.
// The route behavior is still real Express behavior, which makes them useful
// for proving that the API responds with the right status codes and JSON.
function buildTestApp() {
  const store = new MemoryContactStore();
  const app = createApp({ store });
  return { app, store };
}

describe('Contacts API routes', () => {
  test('GET /contacts returns the seed contacts', async () => {
    const { app } = buildTestApp();

    const response = await request(app).get('/contacts');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(5);
    expect(response.body[0]).toHaveProperty('firstName');
  });

  test('GET /contacts/:id returns one contact', async () => {
    const { app, store } = buildTestApp();
    const contacts = await store.findAll();

    const response = await request(app).get(`/contacts/${contacts[0]._id}`);

    expect(response.status).toBe(200);
    expect(response.body.email).toContain('@example.com');
  });

  test('POST /contacts creates a new contact', async () => {
    const { app } = buildTestApp();

    const response = await request(app).post('/contacts').send({
      firstName: 'Mary',
      lastName: 'Jackson',
      email: 'mary.jackson@example.com',
      favoriteColor: 'red',
      birthday: '1921-04-09',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  test('POST /contacts rejects invalid data', async () => {
    const { app } = buildTestApp();

    const response = await request(app).post('/contacts').send({
      firstName: '',
      lastName: '',
      email: 'not-an-email',
      favoriteColor: '',
      birthday: 'bad-date',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });
});
