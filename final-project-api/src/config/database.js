const { MongoClient } = require('mongodb');

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
    if (!uri) {
      throw new Error('MONGODB_URI is required when USE_MEMORY_STORE is false.');
    }

    this.client = new MongoClient(uri);
    await this.client.connect();
    this.database = this.client.db(process.env.DATABASE_NAME || 'cse341_final_project');
    return this.database;
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.database = null;
    }
  }
}

module.exports = { MongoConnection };
