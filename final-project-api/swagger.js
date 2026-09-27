const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 Final Project Campus Events API',
    description: 'Final project CRUD routes for events, volunteers, registrations, and announcements with GitHub OAuth',
  },
  host: 'localhost:8082',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Use the token from GitHub OAuth as: Bearer <token>',
    },
  },
};

swaggerAutogen('./swagger.generated.json', [
  './src/routes/authRoutes.js',
  './src/routes/eventRoutes.js',
  './src/routes/volunteerRoutes.js',
  './src/routes/registrationRoutes.js',
  './src/routes/announcementRoutes.js',
], doc);
