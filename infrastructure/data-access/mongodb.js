const { createBetsPlacaresModel } = require('../../domain/model/bet-placares-model');
const { createBetPlayersModel } = require('../../domain/model/bet-players-model');
const { createLigaModel } = require('../../domain/model/create-league-model');
const { createStatisticsModel } = require('../../domain/model/players-statistics-model');
const { createProcessingStateModel } = require('../../domain/model/processing-state-model');

async function findActiveLeagues() {
    const Liga = await createLigaModel();
    return Liga.find({ active: true });
}

async function getUnprocessedBetsPlacares(bubbleId) {
    const BetsPlacares = await createBetsPlacaresModel();
    return BetsPlacares.find({ bubbleId, pontosCalculados: false });
}

async function updateGame(fixtureId, bubbleId, updateFields) {
    const BetsPlacares = await createBetsPlacaresModel();
    return BetsPlacares.updateMany({ 'fixture.id': fixtureId, bubbleId }, { $set: updateFields });
}

async function updateBetsPlacares(fixtureId, bubbleId, userId, updateFields) {
    const BetsPlacares = await createBetsPlacaresModel();
    return BetsPlacares.updateMany({ 'fixture.id': fixtureId, bubbleId, userId }, { $set: updateFields });
}

async function getPlayersByBubbleId(bubbleId) {
    const BetPlayers = await createBetPlayersModel();
    return BetPlayers.find({ bubbleId });
}

async function getPlayerStatisticsByFixtureId(fixtureId) {
    const PlayerStatistics = await createStatisticsModel();
    return PlayerStatistics.findOne({ fixtureId });
}

async function updateBetsPlayers(bubbleId, playerId, updateFields) {
    const BetPlayers = await createBetPlayersModel();
    return BetPlayers.updateMany({ bubbleId, 'player.id': playerId }, { $set: updateFields });
}

async function calculateUserPointsFromDB(bubbleId) {
    const BetsPlacares = await createBetsPlacaresModel();
    const BetPlayers = await createBetPlayersModel();

    const betsPlacaresPoints = await BetsPlacares.aggregate([
        { $match: { bubbleId, pontosCalculados: true } },
        { $group: { _id: "$userId", totalDePontos: { $sum: "$totalDePontos" } } }
    ]);

    const betsPlayersPoints = await BetPlayers.aggregate([
        { $match: { bubbleId, pontosCalculados: true } },
        { $group: { _id: "$userId", totalDePontos: { $sum: "$totalDePontos" } } }
    ]);

    const userPoints = {};

    betsPlacaresPoints.forEach(bet => {
        if (!userPoints[bet._id]) {
            userPoints[bet._id] = { gamePoints: 0, playerPoints: 0 };
        }
        userPoints[bet._id].gamePoints += bet.totalDePontos || 0;
    });

    betsPlayersPoints.forEach(bet => {
        if (!userPoints[bet._id]) {
            userPoints[bet._id] = { gamePoints: 0, playerPoints: 0 };
        }
        userPoints[bet._id].playerPoints += bet.totalDePontos || 0;
    });

    return userPoints;
}

module.exports = {
    findActiveLeagues,
    getUnprocessedBetsPlacares,
    updateGame,
    updateBetsPlacares,
    getPlayersByBubbleId,
    getPlayerStatisticsByFixtureId,
    updateBetsPlayers,
    calculateUserPointsFromDB
};
