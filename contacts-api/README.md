# Contacts API: CSE 341 Weeks 01-02

This project covers:

- Week 01: GET all contacts and GET one contact by id.
- Week 02: POST, PUT, DELETE, Swagger documentation, and database updates.
- Extra polish: validation, clear error messages, MVC folders, `.rest` request examples, and a local memory mode for practice.

## How The App Is Organized

- `src/server.js`: starts the API.
- `src/app.js`: builds the Express app and connects middleware.
- `src/routes/contactRoutes.js`: lists the URLs the API supports.
- `src/controllers/contactController.js`: explains what each route does.
- `src/data/contactStore.js`: talks to MongoDB, or memory mode while practicing.
- `src/middleware/validate.js`: checks incoming data before it reaches the database.
- `swagger.json`: powers `/api-docs`.
- `requests.rest`: request examples for the VS Code REST Client extension.

## Live Links

- Render API: <https://cse341-contacts-api-y3jc.onrender.com>
- Swagger docs: <https://cse341-contacts-api-y3jc.onrender.com/api-docs>
- GitHub repository: <https://github.com/LeboS27/cse341-web-services>

## Rubric Proof

- W01 GET all contacts: `GET /contacts`
- W01 GET one contact by id: `GET /contacts/:id`
- W01/W02 deployed location: Render URL above
- W01/W02 security: real MongoDB credentials live in `.env` locally and Render environment variables online, not in GitHub
- W01/W02 architecture: routes, controllers, database code, and server startup are in separate files
- W02 Swagger: all five required endpoints are documented at `/api-docs`
- W02 database: MongoDB has five contacts with `firstName`, `lastName`, `email`, `favoriteColor`, and `birthday`

## Required Environment Variables

Copy `.env.example` to `.env`, then add your real MongoDB connection string.

```text
PORT=8080
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=cse341_contacts
CONTACTS_COLLECTION=contacts
USE_MEMORY_STORE=false
```

For quick local practice without MongoDB, set:

```text
USE_MEMORY_STORE=true
```

Do not use memory mode for the Canvas submission video. The rubric expects MongoDB.

## Run The Project

```powershell
npm start
```

Open:

- `http://localhost:8080/`
- `http://localhost:8080/contacts`
- `http://localhost:8080/api-docs`

## Submission Checklist

- GitHub repository is public or accessible to the grader.
- Render site is deployed and uses the real MongoDB config vars.
- `/api-docs` works on Render.
- MongoDB has at least five contacts with `firstName`, `lastName`, `email`, `favoriteColor`, and `birthday`.
- Video shows GET all, GET by id, POST, PUT, DELETE, database updates, `.env` security, and MVC structure.

## Extra Quality Added

This project goes beyond the first two rubrics in a few helpful ways:

- Validation rejects bad POST and PUT data with status `400`.
- Missing contacts return status `404`.
- Unexpected errors are caught by one final error handler.
- Swagger documents all routes.
- `requests.rest` gives repeatable REST Client examples.
- Jest and Supertest tests prove the main routes work.

## Run Tests

```powershell
npm test
```

The tests use memory mode. That means they do not change your real MongoDB database.
