const { createApp } = require('./app');
const { createContactStore } = require('./data/contactStore');

// This file is the front door of the application.
// It creates the database store, gives it to Express, and starts the server.
async function main() {
  const store = await createContactStore();
  const app = createApp({ store });

  // This flag gives us a quick way to verify the app can boot without keeping
  // a long-running server open. It is useful for local checks and grading prep.
  if (process.argv.includes('--check')) {
    console.log('Contacts API boot check passed.');
    await store.close();
    return;
  }

  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Contacts API is running on port ${port}`);
    console.log(`Swagger docs: http://localhost:${port}/api-docs`);
  });
}

main().catch((error) => {
  console.error('The Contacts API could not start.');
  console.error(error.message);
  process.exit(1);
});
