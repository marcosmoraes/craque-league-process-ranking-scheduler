const { getFixture } = require('../../api/football-api');
const dataAccess = require('../../infrastructure/data-access/mongodb');
const calculatePointsLeague = require('./calculate-points-league-service');
const playerService = require('./player-service');

async function processBet(bet, bubbleId) {
    const start = Date.now();
    const userId = bet.userId;

    const response = await getFixture(bet.fixture.id);
    if (!response || response.length === 0 || !response[0].fixture || !response[0].players) {
        console.error('Invalid response from getFixture');
        return;
    }

    await updateGame(response, bet.fixture.id, bubbleId);

    const calculatedPoints = calculatePointsLeague.calculateGameResultPoints(bet.betTeams, bet.goals);
    console.log('Calculated points:', calculatedPoints);

    if (response[0].fixture.status.short === 'FT') {
        await updateBetsPlacares(bet.fixture.id, bubbleId, userId, response[0].goals, response[0].fixture.status, calculatedPoints);
    }

    const playerRatings = await playerService.getPlayerRatings(bet.fixture.id, bubbleId, response[0].players);
    const skillPoints = calculatePointsLeague.calculateSkillPoints(playerRatings);

    await playerService.updateBetsPlayers(bubbleId, playerRatings, skillPoints);

    console.log(`Processing bet took ${Date.now() - start}ms`);
}

async function updateGame(response, fixtureId, bubbleId) {
    await dataAccess.updateGame(fixtureId, bubbleId, {
        'fixture.status': response[0].fixture.status,
        goals: response[0].goals
    });
}

async function updateBetsPlacares(fixtureId, bubbleId, userId, goals, status, calculatedPoints) {
    const updateFields = {
        goals,
        'fixture.status': status,
        totalDePontos: calculatedPoints,
        pontosCalculados: true
    };

    await dataAccess.updateBetsPlacares(fixtureId, bubbleId, userId, updateFields);
    console.log('Update successful for fixture:', fixtureId, 'and bubbleId:', bubbleId, 'and userId:', userId);
}

module.exports = {
    processBet,
    updateGame,
    updateBetsPlacares,
};
