require('dotenv').config(); // Certifique-se de que as variáveis de ambiente sejam carregadas
const mongoose = require('mongoose');

// Função para listar todas as conexões abertas
function listOpenConnections() {
    console.log('Conexões abertas:');
    mongoose.connections.forEach((conn, index) => {
        console.log(`Conexão ${index + 1}: ${conn.name} - ${conn.readyState}`);
    });
}

async function connectToDatabase(username, password, database) {
    if (!username || !password || !database) {
        throw new Error('Missing required database credentials');
    }

    const connectionString = `mongodb+srv://${username}:${encodeURIComponent(password)}@cluster0.slvyghg.mongodb.net/${database}?retryWrites=true&w=majority`;

    try {
        const connection = await mongoose.createConnection(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
            sslValidate: false, // Adiciona esta linha para ignorar a validação SSL
            poolSize: 10 // Ajuste o poolSize conforme necessário
        });
        console.log('Conexão com o MongoDB estabelecida com sucesso em', database);
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        throw new Error('Falha na conexão com o MongoDB');
    }
}

async function closeConnection(connection) {
    try {
        await connection.close();
        console.log('Conexão com o MongoDB fechada com sucesso');
    } catch (error) {
        console.error('Erro ao fechar a conexão com o MongoDB:', error);
    }
}

async function closeAllConnections() {
    const databases = [
        { name: 'liga', dbName: "liga" },
        { name: 'craque', dbName: "craque" }
    ];

    for (const db of databases) {
        try {
            const connection = await connectToDatabase("developer", "1OINE7TynVSTWZsy", db.dbName);
            await closeConnection(connection);
        } catch (error) {
            console.error(`Erro ao fechar a conexão para o banco de dados ${db.dbName}:`, error);
        }
    }

    // Listar todas as conexões antes de fechá-las
    listOpenConnections();

    // Fechar todas as conexões abertas no mongoose
    for (const conn of mongoose.connections) {
        if (conn.readyState === 1) { // Se a conexão estiver aberta (readyState 1)
            await closeConnection(conn);
        }
    }

    // Listar todas as conexões após tentativas de fechamento
    listOpenConnections();

    console.log('Todas as conexões foram fechadas');
}

closeAllConnections().catch(error => {
    console.error('Erro ao fechar todas as conexões:', error);
});
