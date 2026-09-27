# Final Project API: CSE 341 Weeks 05-06

This is a campus events API for the CSE 341 final project.

It has four MongoDB collections:

- `events`
- `volunteers`
- `registrations`
- `announcements`

All four collections have full CRUD routes, validation, error handling, and Swagger documentation. GitHub OAuth protects create, update, and delete routes.

## Live Links

- Render API: <https://cse341-final-project-api.onrender.com>
- Swagger docs: <https://cse341-final-project-api.onrender.com/api-docs>
- OAuth login: <https://cse341-final-project-api.onrender.com/auth/github>
- OAuth status: <https://cse341-final-project-api.onrender.com/auth/oauth/status>
- Events route: <https://cse341-final-project-api.onrender.com/events>
- Volunteers route: <https://cse341-final-project-api.onrender.com/volunteers>
- Registrations route: <https://cse341-final-project-api.onrender.com/registrations>
- Announcements route: <https://cse341-final-project-api.onrender.com/announcements>
- GitHub repository: <https://github.com/LeboS27/cse341-web-services>

## Week 05 Rubric Proof

- Deployment: Render live API above.
- API documentation: Swagger is published at `/api-docs`.
- First two collections: `events` and `volunteers`.
- Full CRUD for events: `GET /events`, `GET /events/:id`, `POST /events`, `PUT /events/:id`, `DELETE /events/:id`.
- Full CRUD for volunteers: `GET /volunteers`, `GET /volunteers/:id`, `POST /volunteers`, `PUT /volunteers/:id`, `DELETE /volunteers/:id`.
- Error handling: bad ids, missing records, invalid data, and server errors return JSON.
- Security: secrets are stored in environment variables, not GitHub.

## Week 06 Rubric Proof

- Last two collections: `registrations` and `announcements`.
- Full CRUD for registrations and announcements.
- POST and PUT validation exists for all four collections.
- GitHub OAuth login is available at `/auth/github`.
- Protected routes require bearer-token authentication.
- Unit tests cover GET all and GET by id for all four collections.
- Tests also cover protected writes, validation, and logout.

## Individual Contributions To Submit

- Contribution 1: Created the first final-project collections, `events` and `volunteers`, with CRUD routes, validation, error handling, and Swagger documentation.
- Contribution 2: Added the last final-project collections, `registrations` and `announcements`, with CRUD routes, validation, error handling, and Swagger documentation.
- Contribution 3: Added GitHub OAuth authentication and protected create, update, and delete routes.
- Contribution 4: Added route tests that prove GET all and GET by id work for all four collections.

## Run Locally

```powershell
npm start
```

Open:

- `http://localhost:8082/`
- `http://localhost:8082/events`
- `http://localhost:8082/volunteers`
- `http://localhost:8082/registrations`
- `http://localhost:8082/announcements`
- `http://localhost:8082/api-docs`

## Environment

Use these environment variables on Render:

```text
MONGODB_URI=your MongoDB connection string
DATABASE_NAME=cse341_final_project
EVENTS_COLLECTION=events
VOLUNTEERS_COLLECTION=volunteers
REGISTRATIONS_COLLECTION=registrations
ANNOUNCEMENTS_COLLECTION=announcements
USERS_COLLECTION=users
SESSIONS_COLLECTION=sessions
USE_MEMORY_STORE=false
GITHUB_CLIENT_ID=your GitHub OAuth client id
GITHUB_CLIENT_SECRET=your GitHub OAuth client secret
OAUTH_CALLBACK_URL=https://cse341-final-project-api.onrender.com/auth/github/callback
OAUTH_STATE_SECRET=replace with a long random secret
```

Use memory mode only for tests or practice:

```text
USE_MEMORY_STORE=true
```

## Test The Protected Routes

1. Open `/auth/github`.
2. Log in with GitHub.
3. Copy the token from the success page.
4. Open `/api-docs`.
5. Click `Authorize`.
6. Paste only the token.
7. Test protected `POST`, `PUT`, and `DELETE` routes.

## Run Tests

```powershell
npm test
```

The tests use memory mode, so they are safe to run repeatedly.
