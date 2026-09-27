# Week 05 Video Script: Final Project Part 1

Target length: 5-8 minutes.

## Submission Links

- GitHub repository: <https://github.com/LeboS27/cse341-web-services>
- Final Project API on Render: <https://cse341-final-project-api.onrender.com>
- Final Project Swagger docs: <https://cse341-final-project-api.onrender.com/api-docs>
- OAuth login: <https://cse341-final-project-api.onrender.com/auth/github>
- YouTube video link: paste your unlisted YouTube link after upload

## Before Recording

Open:

1. Swagger docs: <https://cse341-final-project-api.onrender.com/api-docs>
2. GitHub repository: <https://github.com/LeboS27/cse341-web-services>
3. MongoDB Atlas or Compass, opened to the `cse341_final_project` database.

Do not show the real MongoDB connection string, GitHub OAuth secret, or `.env` file.

## Exact Steps And Script

### 1. Start On Swagger

Say:

> Hello, my name is Lebo. This is my CSE 341 Week 05 Final Project Part 1 demonstration. The API is deployed on Render, not localhost, and the Swagger documentation is open at `/api-docs`.

Say:

> For Week 05, the rubric asks for the first two final-project collections, full CRUD routes, Swagger documentation, error handling, deployment, and documented individual contributions.

### 2. Show First Two Collections

Scroll until you see `events` and `volunteers`.

Say:

> My first two final-project collections are `events` and `volunteers`. Both collections have GET, POST, PUT, and DELETE routes documented in Swagger.

### 3. Log In For Protected Write Routes

Open a new browser tab and go to:

```text
https://cse341-final-project-api.onrender.com/auth/github
```

Sign in with GitHub if asked.

Copy the token from the `OAuth Login Successful` page.

Return to Swagger.

Click `Authorize`.

Paste the token.

Click `Authorize`, then `Close`.

Say:

> The final project already includes authentication, so I logged in first. Swagger will now send my OAuth token with protected POST, PUT, and DELETE requests.

### 4. Events CRUD

Click `GET /events`, then `Try it out`, then `Execute`.

Say:

> `GET /events` returns all event records from MongoDB with status `200`.

Copy one event `_id`.

Click `GET /events/{id}`, paste the id, and click `Execute`.

Say:

> `GET /events/{id}` returns one event by MongoDB ObjectId.

Click `POST /events`, click `Try it out`, and use this body:

```json
{
  "title": "Temporary Week 05 Demo Event",
  "description": "Created during the Week 05 video.",
  "location": "Innovation Lab",
  "startDate": "2026-11-01T17:00:00.000Z",
  "endDate": "2026-11-01T19:00:00.000Z",
  "category": "academic",
  "capacity": 50,
  "isPublic": true,
  "organizerEmail": "showcase@example.edu"
}
```

Click `Execute`.

Say:

> `POST /events` returns status `201`, so the event was created.

Copy the new event id.

Open MongoDB, click the `events` collection, and refresh.

Say:

> The new event appears in MongoDB, so the deployed POST route updated the database.

Return to Swagger.

Click `PUT /events/{id}`, paste the new id, and use this body:

```json
{
  "title": "Temporary Week 05 Demo Event Updated",
  "description": "Updated during the Week 05 video.",
  "location": "Library Room 204",
  "startDate": "2026-11-02T17:00:00.000Z",
  "endDate": "2026-11-02T19:00:00.000Z",
  "category": "service",
  "capacity": 80,
  "isPublic": false,
  "organizerEmail": "updated@example.edu"
}
```

Click `Execute`.

Say:

> `PUT /events/{id}` returns status `204`, so the update worked.

Refresh MongoDB and show the updated event.

Return to Swagger.

Click `DELETE /events/{id}`, paste the same id, and click `Execute`.

Say:

> `DELETE /events/{id}` returns status `204`, so the temporary event was deleted.

Refresh MongoDB and show it is gone.

### 5. Volunteers CRUD

Click `GET /volunteers`, then `Try it out`, then `Execute`.

Say:

> `GET /volunteers` returns all volunteers from the second collection.

Click `POST /volunteers`, click `Try it out`, and use this body:

```json
{
  "firstName": "Temporary",
  "lastName": "Volunteer",
  "email": "temporary.volunteer@example.edu",
  "phone": "+12085550155",
  "role": "usher",
  "availability": "weekday evenings",
  "status": "active"
}
```

Click `Execute`.

Say:

> `POST /volunteers` returns status `201`, so the second collection also creates records correctly.

Copy the new volunteer id.

Click `PUT /volunteers/{id}`, paste the id, and update the status to `inactive`.

Click `Execute`.

Say:

> `PUT /volunteers/{id}` returns `204`, so the volunteer was updated.

Click `DELETE /volunteers/{id}`, paste the same id, and click `Execute`.

Say:

> `DELETE /volunteers/{id}` returns `204`, so the volunteer was deleted.

### 6. Show Validation And Error Handling

Click `POST /events`.

Use this invalid body:

```json
{
  "title": "",
  "description": "",
  "location": "",
  "startDate": "not-a-date",
  "endDate": "not-a-date",
  "category": "",
  "capacity": 0,
  "isPublic": "maybe",
  "organizerEmail": "not-email"
}
```

Click `Execute`.

Say:

> This invalid POST request returns status `400`, so validation is working before data is saved.

Click `GET /events/{id}` and use:

```text
not-a-real-id
```

Click `Execute`.

Say:

> An invalid MongoDB id returns status `400`, which proves the API handles bad input instead of crashing.

### 7. Show GitHub And Contributions

Open GitHub.

Open `final-project-api`.

Show:

- `src/routes/eventRoutes.js`
- `src/routes/volunteerRoutes.js`
- `src/middleware/validate.js`
- `swagger.json`
- `.env.example`

Say:

> The route files are separated by collection, validation is in middleware, Swagger documents the API, and `.env.example` contains only placeholders. The real `.env` file is ignored so secrets are not pushed to GitHub.

Say:

> My individual contributions are: first, I created the `events` collection with CRUD routes, validation, error handling, and Swagger documentation. Second, I created the `volunteers` collection with CRUD routes, validation, error handling, and Swagger documentation.

### 8. Closing

Say:

> This completes Week 05 Final Project Part 1. The API is deployed, documented in Swagger, connected to MongoDB, and the first two collections support full CRUD with validation and proper status codes.
