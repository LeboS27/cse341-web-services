const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 Project 2 Library API',
    description: 'Week 04 secured CRUD routes for books and authors',
  },
  host: 'localhost:8081',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Use the token from /auth/login as: Bearer <token>',
    },
  },
};

swaggerAutogen('./swagger.generated.json', ['./src/routes/authRoutes.js', './src/routes/bookRoutes.js', './src/routes/authorRoutes.js'], doc);
