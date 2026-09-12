# Week 02 Project: Contacts Part 2 Video Script

Use this script after the Contacts API is connected to MongoDB and deployed to Render.

## Links To Submit

- GitHub repository: <https://github.com/LeboS27/cse341-web-services>
- Render Swagger/API docs: <https://cse341-contacts-api-y3jc.onrender.com/api-docs>
- Render Contacts endpoint: <https://cse341-contacts-api-y3jc.onrender.com/contacts>
- YouTube video: add your unlisted YouTube link after upload

## Before Recording

Open these pages before you start recording:

1. Swagger docs: <https://cse341-contacts-api-y3jc.onrender.com/api-docs>
2. Contacts endpoint: <https://cse341-contacts-api-y3jc.onrender.com/contacts>
3. MongoDB Atlas or Compass, opened to:
   - database: `cse341_contacts`
   - collection: `contacts`
4. GitHub repo: <https://github.com/LeboS27/cse341-web-services>

Do not show the real MongoDB connection string or password.

## Full Script

Hello, this is my Week 2 Contacts Part 2 project for CSE 341.

This project is a Contacts API built with Node.js, Express, MongoDB, and Swagger documentation. It is deployed online using Render.

I will show that all required endpoints are documented and testable, that the database updates correctly, that the app is deployed, that my MongoDB credentials are not in GitHub, and that the project follows MVC architecture.

First, I am opening the published Swagger documentation.

The URL is:

```text
https://cse341-contacts-api-y3jc.onrender.com/api-docs
```

This is not localhost. This is the live Render deployment.

In Swagger, I can see the required Week 2 endpoints:

- `GET /contacts`
- `POST /contacts`
- `GET /contacts/{id}`
- `PUT /contacts/{id}`
- `DELETE /contacts/{id}`

These are the five required endpoints for the Contacts collection.

## Show GET All Contacts

Now I will test `GET /contacts`.

This route gets all contacts from MongoDB.

In Swagger, I open `GET /contacts`, click `Try it out`, and click `Execute`.

The response returns an array of contact records. Each contact has the required fields:

- `firstName`
- `lastName`
- `email`
- `favoriteColor`
- `birthday`

The response is JSON data, and it is coming from the MongoDB contacts collection.

## Show GET One Contact By ID

Next, I will test `GET /contacts/{id}`.

I will copy one `_id` from the `GET /contacts` response and paste it into the id field.

In Swagger, I open `GET /contacts/{id}`, click `Try it out`, paste the id, and click `Execute`.

This returns one contact from MongoDB using the contact ID.

This proves the API can retrieve a single contact by its MongoDB ObjectId.

## Show POST Create

Now I will test `POST /contacts`.

This route creates a new contact in MongoDB.

In Swagger, I open `POST /contacts`, click `Try it out`, and use this JSON body:

```json
{
  "firstName": "Test",
  "lastName": "Student",
  "email": "test.student.week2@example.com",
  "favoriteColor": "orange",
  "birthday": "2000-05-15"
}
```

Then I click `Execute`.

The response should show status `201`, which means the contact was created successfully.

I will copy the new contact id because I will use it for the update and delete routes.

Now I will switch to MongoDB Atlas or Compass.

In MongoDB, I am opening the `cse341_contacts` database and the `contacts` collection.

Here I can see that the new contact was added to the database. This proves the POST route updates MongoDB.

## Show PUT Update

Now I will test `PUT /contacts/{id}`.

This route updates an existing contact.

I go back to Swagger, open `PUT /contacts/{id}`, click `Try it out`, and paste the new contact id.

I use this JSON body:

```json
{
  "firstName": "Updated",
  "lastName": "Student",
  "email": "updated.student.week2@example.com",
  "favoriteColor": "green",
  "birthday": "2000-05-15"
}
```

Then I click `Execute`.

The response should show status `204`, which means the update worked and there is no response body.

Now I go back to MongoDB and refresh the collection.

The contact now shows the updated name, email, and favorite color. This proves the PUT route updates MongoDB.

## Show DELETE Remove

Now I will test `DELETE /contacts/{id}`.

I go back to Swagger, open `DELETE /contacts/{id}`, click `Try it out`, and paste the same contact id.

Then I click `Execute`.

The response should show status `204`, which means the contact was deleted successfully.

Now I return to MongoDB and refresh the collection again.

The test contact is gone. This proves the DELETE route removes data from MongoDB.

## Show Validation

Next, I will show validation.

I open `POST /contacts` again and send invalid data:

```json
{
  "firstName": "",
  "lastName": "Example",
  "email": "not-an-email",
  "favoriteColor": "",
  "birthday": "not-a-date"
}
```

The API returns status `400`, which means the request was bad.

This proves the API checks required fields before saving data to MongoDB.

## Show Security

Next, I will show security.

I am opening my GitHub repository:

```text
https://github.com/LeboS27/cse341-web-services
```

Inside the repo, my real `.env` file is not uploaded.

My MongoDB connection string and password are stored in environment variables, not in GitHub.

The repo has `.env.example`, which is safe because it only shows placeholder example values.

The repo also does not include `node_modules`, because dependencies can be installed from `package.json`.

## Show MVC Architecture

Finally, I will show the project architecture.

Inside `contacts-api/src`, the code is separated into different files and folders.

- `server.js` starts the server.
- `app.js` builds the Express application and connects middleware.
- `routes/contactRoutes.js` lists the API endpoints.
- `controllers/contactController.js` contains the route logic.
- `middleware/validate.js` checks required fields before POST and PUT requests are saved.
- `data/contactStore.js` handles the MongoDB collection operations.
- `config/database.js` handles the MongoDB connection.

This follows MVC-style architecture because routes, controller logic, and database access are separated instead of being placed in one large server file.

## Closing Statement

To summarize, my Week 2 Contacts API is deployed on Render, all five endpoints are documented in Swagger and testable through `/api-docs`, POST, PUT, and DELETE update the MongoDB database, the contacts collection has at least five records with the required fields, my secrets are not stored in GitHub, and the project follows MVC architecture.

Thank you.

## Final Canvas Checklist

Before submitting, make sure Canvas includes:

- YouTube video link
- GitHub repository link
- Render Swagger/API docs link

YouTube visibility should be `Unlisted`, not `Private`.

Test the YouTube link in a private browser window before submitting.
