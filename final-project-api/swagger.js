const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE 341 Final Project Campus Events API',
    description: 'Week 05 CRUD routes for events and volunteers',
  },
  host: 'localhost:8082',
  schemes: ['http'],
};

swaggerAutogen('./swagger.generated.json', ['./src/routes/eventRoutes.js', './src/routes/volunteerRoutes.js'], doc);
