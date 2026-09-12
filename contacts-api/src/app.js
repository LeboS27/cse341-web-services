require('dotenv').config();

const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const contactRoutes = require('./routes/contactRoutes');

// createApp builds the Express application.
// Keeping this separate from server.js keeps the MVC structure clear:
// server.js starts the app, app.js wires the app together, and route files
// decide which controller should answer each endpoint.
function createApp({ store }) {
  const app = express();

  // CORS allows browser-based tools and frontends to call this API.
  app.use(cors());

  // This lets Express read JSON bodies sent by POST and PUT requests.
  app.use(express.json());

  // Swagger UI turns swagger.json into a web page where routes can be tested.
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the CSE 341 Contacts API.',
      docs: '/api-docs',
      week01Routes: ['GET /contacts', 'GET /contacts/:id'],
      week02Routes: ['POST /contacts', 'PUT /contacts/:id', 'DELETE /contacts/:id'],
    });
  });

  // Give the routes access to the database store through app.locals. This keeps
  // database code out of the route file and helps show the MVC separation.
  app.locals.store = store;
  app.use('/contacts', contactRoutes);

  // This catches routes that do not exist and gives a clear JSON response.
  app.use((req, res) => {
    res.status(404).json({
      error: 'Route not found',
      message: `${req.method} ${req.originalUrl} is not a supported endpoint.`,
    });
  });

  // This is the final safety net. If a controller throws an unexpected error,
  // the API still responds with JSON instead of crashing silently.
  app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).json({
      error: 'Server error',
      message: error.message || 'Something went wrong while processing the request.',
    });
  });

  return app;
}

module.exports = { createApp };
