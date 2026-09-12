const { createApp } = require('./app');
const { createLibraryStore } = require('./data/libraryStore');

// server.js starts the whole API.
// It is intentionally small so the rest of the project is easier to understand:
// create the store, create the app, then listen for requests.
async function main() {
  const store = await createLibraryStore();
  const app = createApp({ store });

  // The --check flag lets the project prove it can boot without leaving a
  // long-running server open.
  if (process.argv.includes('--check')) {
    console.log('Project 2 CRUD API boot check passed.');
    await store.close();
    return;
  }

  const port = process.env.PORT || 8081;

  // Render provides process.env.PORT. Local practice uses 8081 so it does not
  // collide with the Contacts API on 8080.
  app.listen(port, () => {
    console.log(`Project 2 CRUD API is running on port ${port}`);
    console.log(`Swagger docs: http://localhost:${port}/api-docs`);
  });
}

// If startup fails, show a clear message and stop the process.
main().catch((error) => {
  console.error('The Project 2 CRUD API could not start.');
  console.error(error.message);
  process.exit(1);
});
