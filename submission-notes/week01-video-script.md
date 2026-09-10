# Week 01 Project: Contacts Part 1 Video Script

Use this as a checklist while recording. Keep the video between 5 and 8 minutes.

## Links To Submit

- GitHub repository link
- Render published API link
- YouTube video link

## What To Show

1. Open the GitHub repository.
2. Show that `.env` is not in GitHub.
3. Show the project structure:
   - `src/server.js`
   - `src/app.js`
   - `src/routes/contactRoutes.js`
   - `src/controllers/contactController.js`
   - `src/data/contactStore.js`
4. Explain that this follows MVC-style organization:
   - Routes define URLs.
   - Controllers decide what happens.
   - Data store talks to MongoDB.
5. Open Render and show the published API is running.
6. Open `/contacts` on the Render URL and show all contacts.
7. Open `/contacts/:id` with a real MongoDB id and show one contact.
8. Open MongoDB Compass and show the `contacts` collection with at least five records.
9. Mention that each contact has:
   - `firstName`
   - `lastName`
   - `email`
   - `favoriteColor`
   - `birthday`

## Simple Explanation To Say

This API lets a frontend ask for contact data. The GET-all route returns every contact. The GET-by-id route returns one contact. The server does not store secrets in GitHub; it reads the MongoDB connection string from environment variables.
