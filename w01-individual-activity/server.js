require('dotenv').config();

const cors = require('cors');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

// The frontend is opened directly in the browser.
// CORS allows that frontend to call this backend on localhost:8080.
app.use(cors());

// This route is just a quick check that the server is awake.
app.get('/', (req, res) => {
  res.json({
    message: 'Week 01 Individual Activity API is running.',
    mainRoute: '/professional',
  });
});

// The starter frontend fetches this exact route:
// http://localhost:8080/professional
// The shape of this object matches the fields used in frontend/script.js.
app.get('/professional', (req, res) => {
  res.json({
    professionalName: 'Lebohang CSE 341 Student',
    base64Image:
      'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABVUlEQVR4nO3dsU3DQBBF0Y9SIB0SkEAJFEABFABFQAEUQAEUQAEkUAAEkO8Qe61FrWz9k3vplXWv2Q4zY2dnZ2dnZ2c3eR6P5x2+1+sHAAAAAAAAAAAAAADgX9rtdvuyLMt7vV6vU6nU7dfr9fb7/f5er9f1+v3+3W63W63W6/W6cDgcDgAAAAAAAAAAAAD8Nm3btu3z+fzxeDxut9t9Pp/P+Xw+3+/3+33f9/sAAAAAAAAAAAAA/jaO4/j9fj+fz+f7/X6/3+/3+31d17Xb7fb7/X6/3+/3AAAAAAAAAAAAAPw2hmH4fr/f7/d7vV6v1+v1er1er9fr9XoAAAAAAAAAAAAA/Nbtdrt9Op3O+Xw+3+/3e71er9fr9Xq9Xq8AAAAAAAAAAAAA/FbHcfz5fD6fz+f7/X6/3+/3+31d13W73W6/3+/3+wAAAAAAAAAAAAD8VmEYhmEYhmEYhmEYhmEYhmEYhmEYhgAAAAAAAAAAAAD4BcprFJGbfmclAAAAAElFTkSuQmCC',
    nameLink: {
      firstName: 'Lebohang',
      url: 'https://github.com/',
    },
    primaryDescription:
      'I am learning how backend APIs send useful JSON data to frontends, mobile apps, and other clients.',
    workDescription1:
      'This Week 01 API uses Node.js and Express to create a route that the provided frontend can fetch.',
    workDescription2:
      'The most important idea is the request-response pattern: the browser asks for data, and the server responds with JSON.',
    linkTitleText: 'Professional Links',
    linkedInLink: {
      text: 'LinkedIn',
      link: 'https://www.linkedin.com/',
    },
    githubLink: {
      text: 'GitHub',
      link: 'https://github.com/',
    },
  });
});

if (process.argv.includes('--check')) {
  console.log('Week 01 Individual Activity API boot check passed.');
} else {
  app.listen(port, () => {
    console.log(`Week 01 Individual Activity API is running on port ${port}`);
    console.log(`Frontend route: http://localhost:${port}/professional`);
  });
}
