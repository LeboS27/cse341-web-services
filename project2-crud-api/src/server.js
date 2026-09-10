const { createApp } = require('./app');
const { createLibraryStore } = require('./data/libraryStore');

// server.js starts the whole API.
// It is intentionally small so the rest of the project is easier to understand.
async function main() {
  const store = await createLibraryStore();
  const app = createApp({ store });

  if (process.argv.includes('--check')) {
    console.log('Project 2 CRUD API boot check passed.');
    await store.close();
    return;
  }

  const port = process.env.PORT || 8081;
  app.listen(port, () => {
    console.log(`Project 2 CRUD API is running on port ${port}`);
    console.log(`Swagger docs: http://localhost:${port}/api-docs`);
  });
}

main().catch((error) => {
  console.error('The Project 2 CRUD API could not start.');
  console.error(error.message);
  process.exit(1);
});
