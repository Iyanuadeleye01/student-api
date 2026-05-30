const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDb = async () => {
    if (database) return database;

    const client = await MongoClient.connect(process.env.MONGODB_URL);
    database = client.db('studentCourseDb');

    console.log("Database connected");
    return database;
};

const getDb = () => {
    if (!database) {
        throw new Error("Database not initialized");
    }
    return database;
};

module.exports = { initDb, getDb };