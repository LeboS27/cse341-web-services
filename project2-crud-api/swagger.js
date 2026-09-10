const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 Project 2 Library API',
    description: 'Week 03 CRUD routes for books and authors',
  },
  host: 'localhost:8081',
  schemes: ['http'],
};

swaggerAutogen('./swagger.generated.json', ['./src/routes/bookRoutes.js', './src/routes/authorRoutes.js'], doc);
