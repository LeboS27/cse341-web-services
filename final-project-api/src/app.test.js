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

async function getAuthHeader(store) {
  const user = await store.auth.createUser({
    name: 'Final Project Tester',
    email: `tester-${Date.now()}-${Math.random()}@example.edu`,
    oauthProvider: 'github',
    oauthId: `${Date.now()}-${Math.random()}`,
    githubUsername: 'final-project-tester',
  });
  const session = await store.auth.createSession(user._id);
  return `Bearer ${session.token}`;
}

function setOAuthEnv(values) {
  const keys = ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'OAUTH_CALLBACK_URL', 'OAUTH_STATE_SECRET'];
  const original = {};

  keys.forEach((key) => {
    original[key] = process.env[key];
    if (values[key] === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = values[key];
    }
  });

  return () => {
    keys.forEach((key) => {
      if (original[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = original[key];
      }
    });
  };
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

function validRegistration(overrides = {}) {
  return {
    eventTitle: 'API Showcase Night',
    attendeeName: 'Pat Student',
    attendeeEmail: 'pat@example.edu',
    ticketType: 'student',
    checkedIn: false,
    registeredAt: '2026-09-30T12:00:00.000Z',
    ...overrides,
  };
}

function validAnnouncement(overrides = {}) {
  return {
    title: 'Demo Announcement',
    message: 'This announcement proves the fourth collection is working.',
    audience: 'all',
    publishDate: '2026-09-30T12:00:00.000Z',
    expiresAt: '2026-10-30T12:00:00.000Z',
    isPinned: true,
    authorEmail: 'announcements@example.edu',
    ...overrides,
  };
}

describe('Final Project OAuth routes', () => {
  test('GET /auth/oauth/status reports missing GitHub settings clearly', async () => {
    const restoreEnv = setOAuthEnv({});

    try {
      const { app } = await buildTestApp();

      const response = await request(app).get('/auth/oauth/status');

      expect(response.status).toBe(200);
      expect(response.body.provider).toBe('GitHub');
      expect(response.body.configured).toBe(false);
      expect(response.body.loginUrl).toBe('/auth/github');
    } finally {
      restoreEnv();
    }
  });

  test('GET /auth/github redirects to GitHub when OAuth is configured', async () => {
    const restoreEnv = setOAuthEnv({
      GITHUB_CLIENT_ID: 'test-client-id',
      GITHUB_CLIENT_SECRET: 'test-client-secret',
      OAUTH_CALLBACK_URL: 'https://example.com/auth/github/callback',
      OAUTH_STATE_SECRET: 'test-state-secret',
    });

    try {
      const { app } = await buildTestApp();

      const response = await request(app).get('/auth/github').redirects(0);
      const redirectUrl = new URL(response.headers.location);

      expect(response.status).toBe(302);
      expect(`${redirectUrl.origin}${redirectUrl.pathname}`).toBe('https://github.com/login/oauth/authorize');
      expect(redirectUrl.searchParams.get('client_id')).toBe('test-client-id');
      expect(redirectUrl.searchParams.get('redirect_uri')).toBe('https://example.com/auth/github/callback');
      expect(redirectUrl.searchParams.get('scope')).toBe('read:user user:email');
    } finally {
      restoreEnv();
    }
  });

  test('GET /auth/me and POST /auth/logout require a valid session token', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(store);

    const blocked = await request(app).get('/auth/me');
    const profile = await request(app).get('/auth/me').set('Authorization', authHeader);
    const logout = await request(app).post('/auth/logout').set('Authorization', authHeader);
    const afterLogout = await request(app).get('/auth/me').set('Authorization', authHeader);

    expect(blocked.status).toBe(401);
    expect(profile.status).toBe(200);
    expect(profile.body.user.authProvider).toBe('github');
    expect(logout.status).toBe(204);
    expect(afterLogout.status).toBe(401);
  });
});

describe('Final Project events routes', () => {
  test('GET /events returns all events', async () => {
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

  test('POST /events creates an event after login and ignores extra fields', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(store);

    const response = await request(app)
      .post('/events')
      .set('Authorization', authHeader)
      .send(validEvent({ extraField: 'This should not be saved' }));

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.event.title).toBe('API Showcase Night');
    expect(response.body.event).not.toHaveProperty('extraField');
  });

  test('PUT /events/:id updates an event after login and keeps clean types', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(store);
    const events = await store.events.findAll();
    const id = events[0]._id.toString();

    const response = await request(app)
      .put(`/events/${id}`)
      .set('Authorization', authHeader)
      .send(validEvent({
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

  test('DELETE /events/:id removes an event after login', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(store);
    const events = await store.events.findAll();
    const id = events[0]._id.toString();

    const response = await request(app).delete(`/events/${id}`).set('Authorization', authHeader);
    const deletedEvent = await store.events.findById(id);

    expect(response.status).toBe(204);
    expect(deletedEvent).toBeNull();
  });

  test('POST and PUT /events reject invalid data with status 400', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(store);
    const events = await store.events.findAll();

    const invalidEvent = {
      title: '',
      description: '',
      location: '',
      startDate: 'not-a-date',
      endDate: 'not-a-date',
      category: '',
      capacity: 0,
      isPublic: 'maybe',
      organizerEmail: 'not-email',
    };

    const postResponse = await request(app).post('/events').set('Authorization', authHeader).send(invalidEvent);
    const putResponse = await request(app).put(`/events/${events[0]._id}`).set('Authorization', authHeader).send(invalidEvent);

    expect(postResponse.status).toBe(400);
    expect(putResponse.status).toBe(400);
    expect(postResponse.body.error).toBe('Validation failed');
  });

  test('POST /events is blocked without login', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).post('/events').send(validEvent());

    expect(response.status).toBe(401);
  });
});

describe('Final Project volunteers routes', () => {
  test('GET /volunteers returns all volunteers', async () => {
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

  test('POST /volunteers creates a volunteer after login', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(store);

    const response = await request(app)
      .post('/volunteers')
      .set('Authorization', authHeader)
      .send(validVolunteer({ extraField: 'This should not be saved' }));

    expect(response.status).toBe(201);
    expect(response.body.volunteer.firstName).toBe('Sam');
    expect(response.body.volunteer).not.toHaveProperty('extraField');
  });

  test('PUT /volunteers/:id updates a volunteer after login', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(store);
    const volunteers = await store.volunteers.findAll();
    const id = volunteers[0]._id.toString();

    const response = await request(app)
      .put(`/volunteers/${id}`)
      .set('Authorization', authHeader)
      .send(validVolunteer({
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

  test('DELETE /volunteers/:id removes a volunteer after login', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(store);
    const volunteers = await store.volunteers.findAll();
    const id = volunteers[0]._id.toString();

    const response = await request(app).delete(`/volunteers/${id}`).set('Authorization', authHeader);
    const deletedVolunteer = await store.volunteers.findById(id);

    expect(response.status).toBe(204);
    expect(deletedVolunteer).toBeNull();
  });

  test('POST and PUT /volunteers reject invalid data with status 400', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(store);
    const volunteers = await store.volunteers.findAll();
    const invalidVolunteer = {
      firstName: '',
      lastName: '',
      email: 'bad-email',
      phone: '',
      role: '',
      availability: '',
      status: 'unknown',
    };

    const postResponse = await request(app).post('/volunteers').set('Authorization', authHeader).send(invalidVolunteer);
    const putResponse = await request(app).put(`/volunteers/${volunteers[0]._id}`).set('Authorization', authHeader).send(invalidVolunteer);

    expect(postResponse.status).toBe(400);
    expect(putResponse.status).toBe(400);
    expect(postResponse.body.error).toBe('Validation failed');
  });
});

describe('Final Project registrations routes', () => {
  test('GET /registrations returns all registrations', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).get('/registrations');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(3);
    expect(response.body[0]).toHaveProperty('attendeeEmail');
  });

  test('GET /registrations/:id returns one registration', async () => {
    const { app, store } = await buildTestApp();
    const registrations = await store.registrations.findAll();

    const response = await request(app).get(`/registrations/${registrations[0]._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('eventTitle');
  });

  test('POST, PUT, and DELETE /registrations work after login', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(store);

    const createResponse = await request(app)
      .post('/registrations')
      .set('Authorization', authHeader)
      .send(validRegistration({ extraField: 'This should not be saved' }));
    const id = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/registrations/${id}`)
      .set('Authorization', authHeader)
      .send(validRegistration({
        checkedIn: 'true',
        ticketType: 'guest',
        extraField: 'This should not be saved',
      }));
    const updatedRegistration = await store.registrations.findById(id);

    const deleteResponse = await request(app).delete(`/registrations/${id}`).set('Authorization', authHeader);
    const deletedRegistration = await store.registrations.findById(id);

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.registration).not.toHaveProperty('extraField');
    expect(updateResponse.status).toBe(204);
    expect(updatedRegistration.checkedIn).toBe(true);
    expect(updatedRegistration.ticketType).toBe('guest');
    expect(deleteResponse.status).toBe(204);
    expect(deletedRegistration).toBeNull();
  });

  test('POST and PUT /registrations reject invalid data with status 400', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(store);
    const registrations = await store.registrations.findAll();
    const invalidRegistration = {
      eventTitle: '',
      attendeeName: '',
      attendeeEmail: 'bad-email',
      ticketType: 'vip',
      checkedIn: 'maybe',
      registeredAt: 'not-a-date',
    };

    const postResponse = await request(app).post('/registrations').set('Authorization', authHeader).send(invalidRegistration);
    const putResponse = await request(app).put(`/registrations/${registrations[0]._id}`).set('Authorization', authHeader).send(invalidRegistration);

    expect(postResponse.status).toBe(400);
    expect(putResponse.status).toBe(400);
    expect(postResponse.body.error).toBe('Validation failed');
  });
});

describe('Final Project announcements routes', () => {
  test('GET /announcements returns all announcements', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).get('/announcements');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(3);
    expect(response.body[0]).toHaveProperty('message');
  });

  test('GET /announcements/:id returns one announcement', async () => {
    const { app, store } = await buildTestApp();
    const announcements = await store.announcements.findAll();

    const response = await request(app).get(`/announcements/${announcements[0]._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('authorEmail');
  });

  test('POST, PUT, and DELETE /announcements work after login', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(store);

    const createResponse = await request(app)
      .post('/announcements')
      .set('Authorization', authHeader)
      .send(validAnnouncement({ extraField: 'This should not be saved' }));
    const id = createResponse.body.id;

    const updateResponse = await request(app)
      .put(`/announcements/${id}`)
      .set('Authorization', authHeader)
      .send(validAnnouncement({
        title: 'Updated Announcement',
        audience: 'students',
        isPinned: 'false',
        extraField: 'This should not be saved',
      }));
    const updatedAnnouncement = await store.announcements.findById(id);

    const deleteResponse = await request(app).delete(`/announcements/${id}`).set('Authorization', authHeader);
    const deletedAnnouncement = await store.announcements.findById(id);

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.announcement).not.toHaveProperty('extraField');
    expect(updateResponse.status).toBe(204);
    expect(updatedAnnouncement.title).toBe('Updated Announcement');
    expect(updatedAnnouncement.isPinned).toBe(false);
    expect(deleteResponse.status).toBe(204);
    expect(deletedAnnouncement).toBeNull();
  });

  test('POST and PUT /announcements reject invalid data with status 400', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(store);
    const announcements = await store.announcements.findAll();
    const invalidAnnouncement = {
      title: '',
      message: '',
      audience: 'parents',
      publishDate: 'not-a-date',
      expiresAt: 'not-a-date',
      isPinned: 'maybe',
      authorEmail: 'bad-email',
    };

    const postResponse = await request(app).post('/announcements').set('Authorization', authHeader).send(invalidAnnouncement);
    const putResponse = await request(app).put(`/announcements/${announcements[0]._id}`).set('Authorization', authHeader).send(invalidAnnouncement);

    expect(postResponse.status).toBe(400);
    expect(putResponse.status).toBe(400);
    expect(postResponse.body.error).toBe('Validation failed');
  });
});
