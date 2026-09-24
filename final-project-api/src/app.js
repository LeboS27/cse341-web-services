require('dotenv').config();

const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const eventRoutes = require('./routes/eventRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

function createApp({ store }) {
  const app = express();

  // CORS lets Swagger and browser clients call the API.
  app.use(cors());

  // This lets the API read JSON sent in POST and PUT requests.
  app.use(express.json());

  // Controllers use this shared store to reach MongoDB or the memory test data.
  app.locals.store = store;

  // Week 05 requires published, testable API documentation at /api-docs.
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the CSE 341 Final Project Campus Events API.',
      collections: ['events', 'volunteers'],
      docs: '/api-docs',
    });
  });

  app.use('/events', eventRoutes);
  app.use('/volunteers', volunteerRoutes);

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
