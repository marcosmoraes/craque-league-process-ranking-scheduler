const mongoose = require('mongoose');

async function connectToDatabase(username, password, database) {
    const connectionString = `mongodb+srv://${username}:${encodeURIComponent(password)}@cluster0.slvyghg.mongodb.net/${database}?retryWrites=true&w=majority`;
    try {
        const connection = await mongoose.createConnection(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conexão com o MongoDB estabelecida com sucesso em', database);
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        throw new Error('Falha na conexão com o MongoDB');
    }
}

async function ligaDbConnection() {
    return connectToDatabase(process.env.MONGODB_USERNAME, process.env.MONGODB_PASSWORD, process.env.DATABASE);
}

async function craqueDbConnection() {
    return connectToDatabase(process.env.MONGODB_USERNAME, process.env.MONGODB_PASSWORD, process.env.DATABASE_CRAQUE);
}

module.exports = { ligaDbConnection, craqueDbConnection };
