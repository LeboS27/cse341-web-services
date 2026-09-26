const request = require('supertest');
const { createApp } = require('./app');
const { createLibraryStore } = require('./data/libraryStore');

// Week 06 later asks for route tests. Adding them now makes the Week 03
// project stronger and gives us examples to explain in the course book.
async function buildTestApp() {
  process.env.NODE_ENV = 'test';
  process.env.USE_MEMORY_STORE = 'true';
  const store = await createLibraryStore();
  const app = createApp({ store });
  return { app, store };
}

async function getAuthHeader(app, email = `student-${Date.now()}-${Math.random()}@example.com`) {
  const response = await request(app).post('/auth/register').send({
    name: 'CSE Student',
    email,
    password: 'Password123!',
  });

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('token');
  return `Bearer ${response.body.token}`;
}

function validBook(overrides = {}) {
  return {
    title: 'The Pragmatic Programmer',
    authorName: 'David Thomas and Andrew Hunt',
    isbn: '9780135957059',
    genre: 'Software Engineering',
    publishedYear: 2019,
    pages: 352,
    language: 'English',
    available: true,
    rating: 4.8,
    ...overrides,
  };
}

function validAuthor(overrides = {}) {
  return {
    name: 'David Thomas',
    country: 'United States',
    birthYear: 1956,
    primaryGenre: 'Software Engineering',
    website: 'https://pragprog.com',
    ...overrides,
  };
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

describe('Project 2 authentication routes', () => {
  test('POST /auth/register creates an account and returns a token', async () => {
    const { app, store } = await buildTestApp();

    const response = await request(app).post('/auth/register').send({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'Password123!',
    });
    const savedUser = await store.auth.findUserByEmail('ada@example.com');

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.email).toBe('ada@example.com');
    expect(response.body.user).not.toHaveProperty('passwordHash');
    expect(savedUser.passwordHash).not.toBe('Password123!');
  });

  test('POST /auth/login returns a token for a registered user', async () => {
    const { app } = await buildTestApp();
    await getAuthHeader(app, 'login@example.com');

    const response = await request(app).post('/auth/login').send({
      email: 'login@example.com',
      password: 'Password123!',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('GET /auth/me is private', async () => {
    const { app } = await buildTestApp();
    const authHeader = await getAuthHeader(app, 'me@example.com');

    const blocked = await request(app).get('/auth/me');
    const allowed = await request(app).get('/auth/me').set('Authorization', authHeader);

    expect(blocked.status).toBe(401);
    expect(allowed.status).toBe(200);
    expect(allowed.body.user.email).toBe('me@example.com');
  });

  test('POST /auth/logout removes the token', async () => {
    const { app } = await buildTestApp();
    const authHeader = await getAuthHeader(app, 'logout@example.com');

    const logout = await request(app).post('/auth/logout').set('Authorization', authHeader);
    const afterLogout = await request(app).get('/auth/me').set('Authorization', authHeader);

    expect(logout.status).toBe(204);
    expect(afterLogout.status).toBe(401);
  });

  test('GET /auth/oauth/status reports when GitHub OAuth needs Render settings', async () => {
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
      expect(redirectUrl.searchParams.get('state')).toContain('.');
    } finally {
      restoreEnv();
    }
  });
});

describe('Project 2 books routes', () => {
  test('GET /books returns books', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).get('/books');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(3);
    expect(response.body[0]).toHaveProperty('title');
  });

  test('GET /books/:id returns one book', async () => {
    const { app, store } = await buildTestApp();
    const books = await store.books.findAll();

    const response = await request(app).get(`/books/${books[0]._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('isbn');
  });

  test('GET /books/:id rejects an invalid MongoDB id', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).get('/books/not-a-real-id');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });

  test('GET /books/:id returns 404 for a valid id that does not exist', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).get('/books/507f1f77bcf86cd799439011');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Book not found');
  });

  test('POST /books creates a book and ignores extra fields', async () => {
    const { app } = await buildTestApp();
    const authHeader = await getAuthHeader(app);

    const response = await request(app)
      .post('/books')
      .set('Authorization', authHeader)
      .send(validBook({
        extraField: 'This should not be saved',
      }));

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.book.title).toBe('The Pragmatic Programmer');
    expect(response.body.book).not.toHaveProperty('extraField');
  });

  test('PUT /books/:id updates a book and keeps numeric types clean', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(app);
    const books = await store.books.findAll();
    const id = books[0]._id.toString();

    const response = await request(app)
      .put(`/books/${id}`)
      .set('Authorization', authHeader)
      .send(validBook({
        title: 'Updated Book',
        publishedYear: '2020',
        pages: '400',
        available: 'false',
        rating: '4.2',
        extraField: 'This should not be saved',
      }));
    const updatedBook = await store.books.findById(id);

    expect(response.status).toBe(204);
    expect(updatedBook.title).toBe('Updated Book');
    expect(updatedBook.publishedYear).toBe(2020);
    expect(updatedBook.pages).toBe(400);
    expect(updatedBook.available).toBe(false);
    expect(updatedBook.rating).toBe(4.2);
    expect(updatedBook).not.toHaveProperty('extraField');
  });

  test('DELETE /books/:id removes a book', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(app);
    const books = await store.books.findAll();
    const id = books[0]._id.toString();

    const response = await request(app).delete(`/books/${id}`).set('Authorization', authHeader);
    const deletedBook = await store.books.findById(id);

    expect(response.status).toBe(204);
    expect(deletedBook).toBeNull();
  });

  test('POST /books rejects invalid book data', async () => {
    const { app } = await buildTestApp();
    const authHeader = await getAuthHeader(app);

    const response = await request(app)
      .post('/books')
      .set('Authorization', authHeader)
      .send({
        title: '',
        authorName: '',
        isbn: '',
        genre: '',
        publishedYear: 999,
        pages: 0,
        language: '',
        available: 'maybe',
        rating: 9,
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });

  test('POST /books is blocked when the user is logged out', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).post('/books').send(validBook());

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Authentication required');
  });
});

describe('Project 2 authors routes', () => {
  test('GET /authors returns authors', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).get('/authors');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(3);
    expect(response.body[0]).toHaveProperty('name');
  });

  test('GET /authors/:id returns one author', async () => {
    const { app, store } = await buildTestApp();
    const authors = await store.authors.findAll();

    const response = await request(app).get(`/authors/${authors[0]._id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('country');
  });

  test('GET /authors/:id rejects an invalid MongoDB id', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).get('/authors/not-a-real-id');

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });

  test('GET /authors/:id returns 404 for a valid id that does not exist', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).get('/authors/507f1f77bcf86cd799439011');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Author not found');
  });

  test('POST /authors creates an author and ignores extra fields', async () => {
    const { app } = await buildTestApp();
    const authHeader = await getAuthHeader(app);

    const response = await request(app)
      .post('/authors')
      .set('Authorization', authHeader)
      .send(validAuthor({
        extraField: 'This should not be saved',
      }));

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.author.name).toBe('David Thomas');
    expect(response.body.author).not.toHaveProperty('extraField');
  });

  test('PUT /authors/:id updates an author and keeps birthYear numeric', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(app);
    const authors = await store.authors.findAll();
    const id = authors[0]._id.toString();

    const response = await request(app)
      .put(`/authors/${id}`)
      .set('Authorization', authHeader)
      .send(validAuthor({
        name: 'Updated Author',
        birthYear: '1970',
        website: '',
        extraField: 'This should not be saved',
      }));
    const updatedAuthor = await store.authors.findById(id);

    expect(response.status).toBe(204);
    expect(updatedAuthor.name).toBe('Updated Author');
    expect(updatedAuthor.birthYear).toBe(1970);
    expect(updatedAuthor).not.toHaveProperty('website');
    expect(updatedAuthor).not.toHaveProperty('extraField');
  });

  test('DELETE /authors/:id removes an author', async () => {
    const { app, store } = await buildTestApp();
    const authHeader = await getAuthHeader(app);
    const authors = await store.authors.findAll();
    const id = authors[0]._id.toString();

    const response = await request(app).delete(`/authors/${id}`).set('Authorization', authHeader);
    const deletedAuthor = await store.authors.findById(id);

    expect(response.status).toBe(204);
    expect(deletedAuthor).toBeNull();
  });

  test('POST /authors rejects invalid author data', async () => {
    const { app } = await buildTestApp();
    const authHeader = await getAuthHeader(app);

    const response = await request(app)
      .post('/authors')
      .set('Authorization', authHeader)
      .send({
        name: '',
        country: '',
        birthYear: 3000,
        primaryGenre: '',
        website: 'not-a-url',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });

  test('DELETE /authors/:id is blocked when the user is logged out', async () => {
    const { app, store } = await buildTestApp();
    const authors = await store.authors.findAll();

    const response = await request(app).delete(`/authors/${authors[0]._id}`);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Authentication required');
  });
});
