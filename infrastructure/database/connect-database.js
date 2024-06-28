const mongoose = require('mongoose');

let cachedLigaConnection = null;
let cachedCraqueConnection = null;

async function connectToDatabase(username, password, database) {
    const connectionString = `mongodb+srv://${username}:${encodeURIComponent(password)}@cluster0.slvyghg.mongodb.net/${database}?retryWrites=true&w=majority`;

    try {
        const connection = await mongoose.createConnection(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 10 // Ajuste o poolSize conforme necessário
        });
        console.log('Conexão com o MongoDB estabelecida com sucesso em', database);
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        throw new Error('Falha na conexão com o MongoDB');
    }
}

async function ligaDbConnection() {
    if (!cachedLigaConnection) {
        cachedLigaConnection = await connectToDatabase(process.env.MONGODB_USERNAME, process.env.MONGODB_PASSWORD, process.env.DATABASE);
    }
    return cachedLigaConnection;
}

async function craqueDbConnection() {
    if (!cachedCraqueConnection) {
        cachedCraqueConnection = await connectToDatabase(process.env.MONGODB_USERNAME, process.env.MONGODB_PASSWORD, process.env.DATABASE_CRAQUE);
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
        console.log('Conexões com o MongoDB fechadas com sucesso');
    } catch (error) {
        console.error('Erro ao fechar as conexões com o MongoDB:', error);
    }
}

module.exports = { ligaDbConnection, craqueDbConnection, closeAllConnections };
