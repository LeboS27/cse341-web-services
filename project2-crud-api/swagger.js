const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 Project 2 Library API',
    description: 'Week 03 CRUD routes for books and authors with Week 04 authentication included',
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
