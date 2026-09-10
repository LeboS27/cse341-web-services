const { MongoClient } = require('mongodb');

// MongoConnection owns the connection to MongoDB.
// The rest of the app does not need to know the connection details.
class MongoConnection {
  constructor() {
    this.client = null;
    this.database = null;
  }

  async connect() {
    if (this.database) {
      return this.database;
    }

    const uri = process.env.MONGODB_URI;
    const databaseName = process.env.DATABASE_NAME || 'cse341_contacts';

    if (!uri) {
      throw new Error('MONGODB_URI is missing. Add it to .env or set USE_MEMORY_STORE=true for local practice.');
    }

    this.client = new MongoClient(uri);
    await this.client.connect();
    this.database = this.client.db(databaseName);
    return this.database;
  }

  async close() {
    if (this.client) {
      await this.client.close();
    }
  }
}

module.exports = { MongoConnection };
