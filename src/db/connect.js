import { MongoClient } from 'mongodb';

let database;

const connectToDb = async () => { // connection to the database, MongoDB in this example
  const connectionString = process.env.MONGODB_URI;
  if (!connectionString) {
    throw new Error('MONGODB_URI is required.');
  }

  const client = new MongoClient(connectionString);
  await client.connect();
  database = client.db(process.env.MONGODB_DB_NAME || 'practice');
  return database;
};

const getDb = () => { // this checks for if the db is connected, if not, it tells you to call the above method
  if (!database) {
    throw new Error('Database not initialized. Call connectToDb first.');
  }
  return database;
};

export { connectToDb, getDb };
