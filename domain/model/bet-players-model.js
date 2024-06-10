const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ligaDbConnection } = require('../../infrastructure/database/connect-database');

async function createBetPlayersModel() {
    const dbConnection = await ligaDbConnection(); 

    const betPlayersSchema = new Schema({
        bubbleId: {
            type: String,
            index: true
        },
        bubbleName: { type: String, required: true },
        userId: { type: String, index: true },
        player: {
            id: { type: Number, index: true },
            name: { type: String, required: true },
            position: { type: String, required: true }
        },
        team: {
            id: { type: Number, required: true },
            name: { type: String, required: true }
        },
        pontosCategoria: {
            Dobrou: { type: Boolean, default: false },
            habilidade: { type: String, required: true }
        },
        totalDePontos: { type: Number, default: null },
        pontosCalculados: { type: Boolean, default: false },
        betId: { type: String, required: true, unique: true },
        betDate: { type: Date, default: Date.now }
    });

    return dbConnection.model('BetPlayers', betPlayersSchema, 'bets-players');
}

module.exports = { createBetPlayersModel };
