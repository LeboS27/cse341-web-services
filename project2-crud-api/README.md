# Project 2 CRUD API: CSE 341 Week 03

This is a library API with two MongoDB collections:

- `books`
- `authors`

The `books` collection has nine fields, so it satisfies the course rule that at least one collection should have seven or more fields.

## What Week 03 Requires

- At least two collections.
- GET, POST, PUT, and DELETE routes.
- Swagger documentation that can be tested.
- Validation on POST and PUT routes.
- Error handling with clear 400 or 500 responses.
- Published API on Render.
- No secrets pushed to GitHub.

## Run Locally

```powershell
npm start
```

Open:

- `http://localhost:8081/`
- `http://localhost:8081/books`
- `http://localhost:8081/authors`
- `http://localhost:8081/api-docs`

## Environment

Copy `.env.example` to `.env`, then add your real MongoDB connection string.

Use memory mode only for practice:

```text
USE_MEMORY_STORE=true
```

For submission, use MongoDB so the video can show database updates.
