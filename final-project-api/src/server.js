require('dotenv').config();

const { createApp } = require('./app');
const { createFinalProjectStore } = require('./data/finalProjectStore');

async function main() {
  const store = await createFinalProjectStore();
  const app = createApp({ store });

  if (process.argv.includes('--check')) {
    console.log('Final Project API boot check passed.');
    await store.close();
    return;
  }

  const port = process.env.PORT || 8082;
  app.listen(port, () => {
    console.log(`Final Project API running on port ${port}`);
  });
}

main().catch((error) => {
  console.error('Failed to start Final Project API:', error);
  process.exit(1);
});
