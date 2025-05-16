const mongoose = require('mongoose');

let cachedLigaConnection = null;
let cachedCraqueConnection = null;

async function connectToDatabase(username, password, database) {
    if (!username || !password || !database) {
        throw new Error('Missing required database configuration');
    }

    const connectionString = `mongodb+srv://${username}:${encodeURIComponent(password)}@${process.env.MONGODB_HOST}/${database}?retryWrites=true&w=majority`;

    try {
        const connection = await mongoose.createConnection(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 10,
            ssl: true,
            sslValidate: true
        });
        console.log('MongoDB connection established successfully for database:', database);
        return connection;
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        throw new Error('Failed to connect to MongoDB');
    }
}

async function ligaDbConnection() {
    if (!cachedLigaConnection) {
        cachedLigaConnection = await connectToDatabase(
            process.env.MONGODB_USERNAME,
            process.env.MONGODB_PASSWORD,
            process.env.DATABASE
        );
    }
    return cachedLigaConnection;
}

async function craqueDbConnection() {
    if (!cachedCraqueConnection) {
        cachedCraqueConnection = await connectToDatabase(
            process.env.MONGODB_USERNAME,
            process.env.MONGODB_PASSWORD,
            process.env.DATABASE_CRAQUE
        );
    }
    return cachedCraqueConnection;
}

async function closeAllConnections() {
    try {
        if (cachedLigaConnection) {
            await cachedLigaConnection.close();
            cachedLigaConnection = null;
        }
        if (cachedCraqueConnection) {
            await cachedCraqueConnection.close();
            cachedCraqueConnection = null;
        }
        console.log('MongoDB connections closed successfully');
    } catch (error) {
        console.error('Error closing MongoDB connections:', error.message);
    }
}

module.exports = { ligaDbConnection, craqueDbConnection, closeAllConnections };
