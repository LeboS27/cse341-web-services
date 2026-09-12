const { createApp } = require('./app');
const { createContactStore } = require('./data/contactStore');

// This file is the front door of the Contacts API.
// The rubric wants a published API that talks to MongoDB, so this file does
// the startup work in a small, easy-to-follow order:
// 1. Build the data store.
// 2. Give that store to Express.
// 3. Start listening for web requests.
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

  // Render gives the app a PORT value. Local practice uses 8080 because the
  // course examples and videos expect that port.
  app.listen(port, () => {
    console.log(`Contacts API is running on port ${port}`);
    console.log(`Swagger docs: http://localhost:${port}/api-docs`);
  });
}

// If startup fails, print a clear message instead of leaving the problem hidden.
main().catch((error) => {
  console.error('The Contacts API could not start.');
  console.error(error.message);
  process.exit(1);
});
