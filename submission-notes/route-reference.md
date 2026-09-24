# Route Reference

## Production Links

- GitHub repository: <https://github.com/LeboS27/cse341-web-services>
- Contacts API base URL: <https://cse341-contacts-api-y3jc.onrender.com>
- Contacts Swagger docs: <https://cse341-contacts-api-y3jc.onrender.com/api-docs>
- Project 2 API base URL: <https://cse341-project2-crud-api-zoq8.onrender.com>
- Project 2 Swagger docs: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>
- Final Project API base URL: <https://cse341-final-project-api.onrender.com>
- Final Project Swagger docs: <https://cse341-final-project-api.onrender.com/api-docs>

## Week 01 Individual Activity

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/` | Confirms the API is running |
| GET | `/professional` | Sends profile JSON to the provided frontend |

## Contacts API

| Method | Route | Purpose | Main Status Codes |
| --- | --- | --- | --- |
| GET | `/` | Confirms the API is running | 200 |
| GET | `/contacts` | Reads all contacts | 200 |
| GET | `/contacts/:id` | Reads one contact | 200, 400, 404 |
| POST | `/contacts` | Creates one contact | 201, 400 |
| PUT | `/contacts/:id` | Updates one contact | 204, 400, 404 |
| DELETE | `/contacts/:id` | Deletes one contact | 204, 400, 404 |
| GET | `/api-docs` | Opens Swagger documentation | 200 |

## Project 2 CRUD API

| Method | Route | Purpose | Main Status Codes |
| --- | --- | --- | --- |
| GET | `/` | Confirms the API is running | 200 |
| POST | `/auth/register` | Creates an account and returns a token | 201, 400, 409 |
| POST | `/auth/login` | Logs in and returns a token | 200, 400, 401 |
| GET | `/auth/me` | Shows the current user when logged in | 200, 401 |
| POST | `/auth/logout` | Logs out the current token | 204, 401 |
| GET | `/books` | Reads all books | 200 |
| GET | `/books/:id` | Reads one book | 200, 400, 404 |
| POST | `/books` | Creates one book when logged in | 201, 400, 401 |
| PUT | `/books/:id` | Updates one book when logged in | 204, 400, 401, 404 |
| DELETE | `/books/:id` | Deletes one book when logged in | 204, 400, 401, 404 |
| GET | `/authors` | Reads all authors | 200 |
| GET | `/authors/:id` | Reads one author | 200, 400, 404 |
| POST | `/authors` | Creates one author when logged in | 201, 400, 401 |
| PUT | `/authors/:id` | Updates one author when logged in | 204, 400, 401, 404 |
| DELETE | `/authors/:id` | Deletes one author when logged in | 204, 400, 401, 404 |
| GET | `/api-docs` | Opens Swagger documentation | 200 |

## Final Project API

| Method | Route | Purpose | Main Status Codes |
| --- | --- | --- | --- |
| GET | `/` | Confirms the API is running | 200 |
| GET | `/events` | Reads all events | 200 |
| GET | `/events/:id` | Reads one event | 200, 400, 404 |
| POST | `/events` | Creates one event | 201, 400 |
| PUT | `/events/:id` | Updates one event | 204, 400, 404 |
| DELETE | `/events/:id` | Deletes one event | 204, 400, 404 |
| GET | `/volunteers` | Reads all volunteers | 200 |
| GET | `/volunteers/:id` | Reads one volunteer | 200, 400, 404 |
| POST | `/volunteers` | Creates one volunteer | 201, 400 |
| PUT | `/volunteers/:id` | Updates one volunteer | 204, 400, 404 |
| DELETE | `/volunteers/:id` | Deletes one volunteer | 204, 400, 404 |
| GET | `/api-docs` | Opens Swagger documentation | 200 |
