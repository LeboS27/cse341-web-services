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
