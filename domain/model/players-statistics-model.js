const mongoose = require('mongoose');
const { craqueDbConnection } = require('../../infrastructure/database/connect-database');

async function createStatisticsModel() {
    const dbConnection = await craqueDbConnection(); // Garante que a conexão esteja estabelecida

    const playerSchema = new mongoose.Schema({
        player: {
            id: Number,
            name: String,
            photo: String
        },
        statistics: [{
            games: {
                minutes: Number,
                number: Number,
                position: String,
                rating: String,
                captain: Boolean,
                substitute: Boolean
            },
            offsides: Number,
            shots: {
                total: Number,
                on: Number
            },
            goals: {
                total: Number,
                conceded: Number,
                assists: Number,
                saves: Number
            },
            passes: {
                total: Number,
                key: Number,
                accuracy: String
            },
            tackles: {
                total: Number,
                blocks: Number,
                interceptions: Number
            },
            duels: {
                total: Number,
                won: Number
            },
            dribbles: {
                attempts: Number,
                success: Number,
                past: Number
            },
            fouls: {
                drawn: Number,
                committed: Number
            },
            cards: {
                yellow: Number,
                red: Number
            },
            penalty: {
                won: Number,
                commited: Number,
                scored: Number,
                missed: Number,
                saved: Number
            }
        }]
    });

    const teamSchema = new mongoose.Schema({
        team: {
            id: Number,
            name: String,
            logo: String,
            update: Date
        },
        players: [playerSchema]
    });

    const statisticsSchema = new mongoose.Schema({
        fixtureId: {
            type: Number,
            required: true,
            unique: true
        },
        status: String,
        teams: [teamSchema],
        habilidades: [
            {
                player_maior_gols: {
                    goleadores: [{
                        id: Number,
                        logoDoTime: String,
                        nome: String,
                        photo: String,
                        gols: Number,
                        ranking: Number
                    }]
                },
                player_maior_dribles: {
                    dribladores: [{
                        id: Number,
                        logoDoTime: String,
                        nome: String,
                        photo: String,
                        dribles: Number,
                        ranking: Number
                    }]
                },
                player_maior_passes: {
                    passadores: [{
                        id: Number,
                        logoDoTime: String,
                        nome: String,
                        photo: String,
                        passes: Number,
                        ranking: Number
                    }]
                },
                player_maior_defesas: {
                    defensores: [{
                        id: Number,
                        logoDoTime: String,
                        nome: String,
                        photo: String,
                        defesas: Number,
                        ranking: Number
                    }]
                },
                player_maior_desarme: {
                    desarmadores: [{
                        id: Number,
                        logoDoTime: String,
                        nome: String,
                        photo: String,
                        desarmes: Number,
                        ranking: Number
                    }]
                }
            }]
    });

    return dbConnection.model('PlayerStatisticsByFixture', statisticsSchema, 'player-statistics-by-fixture');
}

module.exports = {
    createStatisticsModel
};
