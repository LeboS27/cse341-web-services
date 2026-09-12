const { MongoClient } = require('mongodb');

// MongoConnection owns the connection to MongoDB.
// The rest of the app does not need to know the connection details.
// This separation is part of the MVC architecture the rubric asks for.
class MongoConnection {
  constructor() {
    this.client = null;
    this.database = null;
  }

  async connect() {
    // Reuse the open database connection after the first successful call.
    // That keeps the API fast and avoids reconnecting on every request.
    if (this.database) {
      return this.database;
    }

    const uri = process.env.MONGODB_URI;
    const databaseName = process.env.DATABASE_NAME || 'cse341_contacts';

    if (!uri) {
      throw new Error('MONGODB_URI is missing. Add it to .env or set USE_MEMORY_STORE=true for local practice.');
    }

    // The URI is stored in .env locally and in Render environment variables in
    // production. It is never stored in GitHub.
    this.client = new MongoClient(uri);
    await this.client.connect();
    this.database = this.client.db(databaseName);
    return this.database;
  }

  async close() {
    // Closing matters for tests and one-time boot checks.
    if (this.client) {
      await this.client.close();
    }
  }
}

module.exports = { MongoConnection };
