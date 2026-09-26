require('dotenv').config();

const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const authRoutes = require('./routes/authRoutes');

// createApp builds the Express app for Project 2.
// Keeping this separate from server.js lets tests create the app without
// starting a real network server.
function createApp({ store }) {
  const app = express();

  // Render sits in front of Express, so this helps Express understand
  // the original public URL when building OAuth callback links.
  app.set('trust proxy', 1);

  // CORS allows browser tools, Swagger, and frontends to call the API.
  app.use(cors());

  // This lets Express read JSON bodies from POST and PUT requests.
  app.use(express.json());

  // The store holds the books and authors data access objects.
  // Controllers reach it through req.app.locals.store.
  app.locals.store = store;

  // Swagger UI turns swagger.json into a testable documentation page.
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // The home route is a quick deployment check.
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the CSE 341 Project 2 Library API.',
      collections: ['books', 'authors'],
      auth: '/auth/github, /auth/oauth/status, /auth/register, /auth/login, /auth/me, /auth/logout',
      docs: '/api-docs',
    });
  });

  // Project 2 has two collections, so each collection gets its own route file.
  app.use('/auth', authRoutes);
  app.use('/books', bookRoutes);
  app.use('/authors', authorRoutes);

  // Unknown routes return JSON instead of an HTML error page.
  app.use((req, res) => {
    res.status(404).json({
      error: 'Route not found',
      message: `${req.method} ${req.originalUrl} is not part of this API.`,
    });
  });

  // This final error handler catches unexpected problems and keeps the API
  // response format consistent.
  app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).json({
      error: 'Server error',
      message: error.message || 'Something went wrong.',
    });
  });

  return app;
}

module.exports = { createApp };
