const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ligaDbConnection } = require('../../infrastructure/database/connect-database');

async function createBetsPlacaresModel() {
    const dbConnection = await ligaDbConnection(); // Garante que a conexão esteja estabelecida

    const betsPlacaresSchema = new Schema({
        bubbleId: {
            type: String,
            index: true
        },
        bubbleName: String,
        fixture: {
            id: { type: Number, index: true },
            date: Date,
            status: {
                long: String,
                short: String,
                elapsed: Number
            }
        },
        league: {
            id: Number,
            name: String,
            country: String,
            season: Number,
            round: String
        },
        userId: {
            type: String,
            index: true
        },
        betTeams: {
            home: {
                teamId: Number,
                teamName: String,
                goals: Number
            },
            away: {
                teamId: Number,
                teamName: String,
                goals: Number
            }
        },
        goals: {
            home: Number,
            away: Number
        },
        pontosCategoria: {
            pontosGanhos: Number,
            placarCheio: Number,
            placarVencedor: Number,
            diferencaDeGols: Number
        },
        totalDePontos: Number,
        pontosCalculados: Boolean,
        betId: String,
        betDate: Date
    });

    return dbConnection.model('BetsPlacares', betsPlacaresSchema, 'bets-placares');
}

module.exports = { createBetsPlacaresModel };