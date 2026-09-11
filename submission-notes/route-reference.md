# Route Reference

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
| GET | `/books` | Reads all books | 200 |
| GET | `/books/:id` | Reads one book | 200, 400, 404 |
| POST | `/books` | Creates one book | 201, 400 |
| PUT | `/books/:id` | Updates one book | 204, 400, 404 |
| DELETE | `/books/:id` | Deletes one book | 204, 400, 404 |
| GET | `/authors` | Reads all authors | 200 |
| GET | `/authors/:id` | Reads one author | 200, 400, 404 |
| POST | `/authors` | Creates one author | 201, 400 |
| PUT | `/authors/:id` | Updates one author | 204, 400, 404 |
| DELETE | `/authors/:id` | Deletes one author | 204, 400, 404 |
| GET | `/api-docs` | Opens Swagger documentation | 200 |
