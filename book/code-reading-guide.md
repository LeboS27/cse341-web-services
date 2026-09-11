# How To Read The Code In This Workspace

This guide explains the code in a simple order. Use it when you want to make your own changes.

## The Best Reading Order

1. Start with `README.md` in the project folder.
2. Open `package.json` to see how the project runs.
3. Open `src/server.js` to see where the app starts.
4. Open `src/app.js` to see how Express is assembled.
5. Open the route files to see the URLs.
6. Open the controller files to see what each URL does.
7. Open the data store files to see how records are read and written.
8. Open the validation files to see what data is allowed.
9. Open `swagger.json` to see how the API is documented.
10. Open `requests.rest` to manually test the routes.

## How To Change A Field

If you want to add a field to Contacts, change these places:

- `contacts-api/src/middleware/validate.js`
- `contacts-api/swagger.json`
- `contacts-api/requests.rest`
- `contacts-api/src/data/seedContacts.json`
- the MongoDB records in Compass

Why all these places? Because an API field is not only code. It is also validation, documentation, examples, and database data.

## How To Add A New Collection

For Project 2, a new collection needs:

- a route file
- validation rules
- Swagger paths
- request examples
- seed data for memory mode
- MongoDB collection data for final submission

The easiest pattern is to copy `bookRoutes.js`, rename it, and connect it in `src/app.js`.

## How To Know A Route Is Working

A route is working when:

- It returns the expected status code.
- It returns JSON.
- It handles bad input.
- It updates MongoDB when the method is POST, PUT, or DELETE.
- It appears in Swagger.
- It can be tested from `requests.rest` or Swagger.
