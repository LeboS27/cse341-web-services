const request = require('supertest');
const { createApp } = require('./app');
const { createFinalProjectStore } = require('./data/finalProjectStore');

async function buildTestApp() {
  process.env.NODE_ENV = 'test';
  process.env.USE_MEMORY_STORE = 'true';
  const store = await createFinalProjectStore();
  const app = createApp({ store });
  return { app, store };
}

function validEvent(overrides = {}) {
  return {
    title: 'API Showcase Night',
    description: 'Students present APIs, Swagger docs, and MongoDB updates.',
    location: 'Innovation Lab',
    startDate: '2026-11-01T17:00:00.000Z',
    endDate: '2026-11-01T19:00:00.000Z',
    category: 'academic',
    capacity: 50,
    isPublic: true,
    organizerEmail: 'showcase@example.edu',
    ...overrides,
  };
}

function validVolunteer(overrides = {}) {
  return {
    firstName: 'Sam',
    lastName: 'Taylor',
    email: 'sam@example.edu',
    phone: '+12085550155',
    role: 'usher',
    availability: 'weekday evenings',
    status: 'active',
    ...overrides,
  };
}

describe('Final Project events routes', () => {
  test('GET /events returns events', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).get('/events');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(3);
    expect(response.body[0]).toHaveProperty('title');
  });

  test('GET /events/:id returns one event', async () => {
    const { app, store } = await buildTestApp();
    const events = await store.events.findAll();

    const response = await request(app).get(`/events/${events[0]._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('organizerEmail');
  });

  test('POST /events creates an event and ignores extra fields', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).post('/events').send(validEvent({
      extraField: 'This should not be saved',
    }));

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.event.title).toBe('API Showcase Night');
    expect(response.body.event).not.toHaveProperty('extraField');
  });

  test('PUT /events/:id updates an event and keeps clean types', async () => {
    const { app, store } = await buildTestApp();
    const events = await store.events.findAll();
    const id = events[0]._id.toString();

    const response = await request(app).put(`/events/${id}`).send(validEvent({
      title: 'Updated Event',
      capacity: '80',
      isPublic: 'false',
      extraField: 'This should not be saved',
    }));
    const updatedEvent = await store.events.findById(id);

    expect(response.status).toBe(204);
    expect(updatedEvent.title).toBe('Updated Event');
    expect(updatedEvent.capacity).toBe(80);
    expect(updatedEvent.isPublic).toBe(false);
    expect(updatedEvent).not.toHaveProperty('extraField');
  });

  test('DELETE /events/:id removes an event', async () => {
    const { app, store } = await buildTestApp();
    const events = await store.events.findAll();
    const id = events[0]._id.toString();

    const response = await request(app).delete(`/events/${id}`);
    const deletedEvent = await store.events.findById(id);

    expect(response.status).toBe(204);
    expect(deletedEvent).toBeNull();
  });

  test('POST /events rejects invalid event data', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).post('/events').send({
      title: '',
      description: '',
      location: '',
      startDate: 'not-a-date',
      endDate: 'not-a-date',
      category: '',
      capacity: 0,
      isPublic: 'maybe',
      organizerEmail: 'not-email',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });
});

describe('Final Project volunteers routes', () => {
  test('GET /volunteers returns volunteers', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).get('/volunteers');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(3);
    expect(response.body[0]).toHaveProperty('firstName');
  });

  test('GET /volunteers/:id returns one volunteer', async () => {
    const { app, store } = await buildTestApp();
    const volunteers = await store.volunteers.findAll();

    const response = await request(app).get(`/volunteers/${volunteers[0]._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email');
  });

  test('POST /volunteers creates a volunteer and ignores extra fields', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).post('/volunteers').send(validVolunteer({
      extraField: 'This should not be saved',
    }));

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.volunteer.firstName).toBe('Sam');
    expect(response.body.volunteer).not.toHaveProperty('extraField');
  });

  test('PUT /volunteers/:id updates a volunteer', async () => {
    const { app, store } = await buildTestApp();
    const volunteers = await store.volunteers.findAll();
    const id = volunteers[0]._id.toString();

    const response = await request(app).put(`/volunteers/${id}`).send(validVolunteer({
      firstName: 'Updated',
      status: 'inactive',
      extraField: 'This should not be saved',
    }));
    const updatedVolunteer = await store.volunteers.findById(id);

    expect(response.status).toBe(204);
    expect(updatedVolunteer.firstName).toBe('Updated');
    expect(updatedVolunteer.status).toBe('inactive');
    expect(updatedVolunteer).not.toHaveProperty('extraField');
  });

  test('DELETE /volunteers/:id removes a volunteer', async () => {
    const { app, store } = await buildTestApp();
    const volunteers = await store.volunteers.findAll();
    const id = volunteers[0]._id.toString();

    const response = await request(app).delete(`/volunteers/${id}`);
    const deletedVolunteer = await store.volunteers.findById(id);

    expect(response.status).toBe(204);
    expect(deletedVolunteer).toBeNull();
  });

  test('POST /volunteers rejects invalid volunteer data', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).post('/volunteers').send({
      firstName: '',
      lastName: '',
      email: 'bad-email',
      phone: '',
      role: '',
      availability: '',
      status: 'unknown',
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });
});
