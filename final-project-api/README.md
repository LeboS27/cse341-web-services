# Final Project API: CSE 341 Week 05

This is a campus events API for the Week 05 final project requirement.

It has two MongoDB collections:

- `events`
- `volunteers`

Both collections have full CRUD routes, validation, error handling, and Swagger documentation.

## Live Links

- Render API: <https://cse341-final-project-api.onrender.com>
- Swagger docs: <https://cse341-final-project-api.onrender.com/api-docs>
- Events route: <https://cse341-final-project-api.onrender.com/events>
- Volunteers route: <https://cse341-final-project-api.onrender.com/volunteers>
- GitHub repository: <https://github.com/LeboS27/cse341-web-services>

## What Week 05 Requires

- First two final-project collections.
- GET, POST, PUT, and DELETE routes for both collections.
- Validation on data before it is saved.
- Error handling with JSON responses.
- Swagger API documentation published at `/api-docs`.
- Deployed Render API.
- GitHub, Render, and YouTube links submitted in Canvas.

## Rubric Proof

- Collection 1: `events`
- Collection 2: `volunteers`
- Full CRUD for events: `GET /events`, `GET /events/:id`, `POST /events`, `PUT /events/:id`, `DELETE /events/:id`
- Full CRUD for volunteers: `GET /volunteers`, `GET /volunteers/:id`, `POST /volunteers`, `PUT /volunteers/:id`, `DELETE /volunteers/:id`
- Swagger docs: `/api-docs`
- Validation: POST and PUT routes check all required fields
- Error handling: bad ids, missing records, invalid data, and server errors return JSON
- Database: Render uses MongoDB through environment variables

## Individual Contributions To Mention

- Created the `events` collection with CRUD routes, validation, and Swagger documentation.
- Created the `volunteers` collection with CRUD routes, validation, and Swagger documentation.

## Run Locally

```powershell
npm start
```

Open:

- `http://localhost:8082/`
- `http://localhost:8082/events`
- `http://localhost:8082/volunteers`
- `http://localhost:8082/api-docs`

## Environment

Use these environment variables on Render:

```text
MONGODB_URI=your MongoDB connection string
DATABASE_NAME=cse341_final_project
EVENTS_COLLECTION=events
VOLUNTEERS_COLLECTION=volunteers
USE_MEMORY_STORE=false
```

Use memory mode only for tests or practice:

```text
USE_MEMORY_STORE=true
```

## Run Tests

```powershell
npm test
```

The tests use memory mode, so they are safe to run repeatedly.
