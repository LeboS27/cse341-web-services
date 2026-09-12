const swaggerAutogen = require('swagger-autogen')();

// This file is optional because swagger.json is already written by hand.
// It is included because the course introduces swagger-autogen in Week 02.
const doc = {
  info: {
    title: 'CSE 341 Contacts API',
    description: 'Weeks 01-02 Contacts API documentation',
  },
  host: 'cse341-contacts-api-y3jc.onrender.com',
  schemes: ['https'],
};

swaggerAutogen('./swagger.generated.json', ['./src/routes/contactRoutes.js'], doc);
