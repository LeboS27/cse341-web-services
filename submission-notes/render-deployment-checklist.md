# Render Deployment Checklist

Use this for both APIs.

## Live Deployment

- GitHub repository: <https://github.com/LeboS27/cse341-web-services>
- Contacts API: <https://cse341-contacts-api-y3jc.onrender.com>
- Project 2 API: <https://cse341-project2-crud-api-zoq8.onrender.com>
- Contacts Swagger: <https://cse341-contacts-api-y3jc.onrender.com/api-docs>
- Project 2 Swagger: <https://cse341-project2-crud-api-zoq8.onrender.com/api-docs>

## Before Deploying

- Make sure the project runs locally.
- Make sure the project is pushed to GitHub.
- Make sure `.env` is not committed.
- Make sure `package.json` has:
  - `start`
  - `main`

## Render Settings

- Build command: `npm install`
- Start command:
  - Contacts API: `npm start`
  - Project 2 API: `npm start`
- Environment variables:
  - `MONGODB_URI`
  - `DATABASE_NAME`
  - `PORT` is usually handled by Render, but the app already reads it if Render sets it.

## After Deploying

- Open the Render URL.
- Open `/api-docs`.
- Test each route from Swagger.
- Confirm MongoDB changes after POST, PUT, and DELETE.
