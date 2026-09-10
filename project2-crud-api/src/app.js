require('dotenv').config();

const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');

function createApp({ store }) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.locals.store = store;

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the CSE 341 Project 2 Library API.',
      collections: ['books', 'authors'],
      docs: '/api-docs',
    });
  });

  app.use('/books', bookRoutes);
  app.use('/authors', authorRoutes);

  app.use((req, res) => {
    res.status(404).json({
      error: 'Route not found',
      message: `${req.method} ${req.originalUrl} is not part of this API.`,
    });
  });

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
