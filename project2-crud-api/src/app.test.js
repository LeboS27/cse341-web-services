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

  test('POST /books rejects invalid book data', async () => {
    const { app } = await buildTestApp();

    const response = await request(app).post('/books').send({
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
});
