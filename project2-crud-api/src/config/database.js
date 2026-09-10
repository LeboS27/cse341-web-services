const { MongoClient } = require('mongodb');

// This class keeps MongoDB connection code in one file.
// That follows the course's MVC-style separation requirement.
class MongoConnection {
  constructor() {
    this.client = null;
    this.database = null;
  }

  async connect() {
    if (this.database) {
      return this.database;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing. Add it to .env or use USE_MEMORY_STORE=true for practice.');
    }

    this.client = new MongoClient(process.env.MONGODB_URI);
    await this.client.connect();
    this.database = this.client.db(process.env.DATABASE_NAME || 'cse341_library');
    return this.database;
  }

  async close() {
    if (this.client) {
      await this.client.close();
    }
  }
}

module.exports = { MongoConnection };
