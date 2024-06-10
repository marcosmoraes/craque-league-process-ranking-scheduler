const dataAccess = require('../../infrastructure/data-access/mongodb');
const calculatePointsLeague = require('./calculate-points-league-service');

async function getPlayerRatings(fixtureId, bubbleId, allPlayerStatistics) {
    const players = await dataAccess.getPlayersByBubbleId(bubbleId);
    const playerStatistics = await dataAccess.getPlayerStatisticsByFixtureId(fixtureId);

    if (!playerStatistics || !playerStatistics.teams || !Array.isArray(playerStatistics.teams) || playerStatistics.teams.length === 0) {
        console.error('Player statistics or teams not found for fixture:', fixtureId);
        return [];
    }

    const playerRatings = [];

    for (let player of players) {
        const habilidade = player.pontosCategoria.habilidade;
        if (!allPlayerStatistics) {
            console.warn('allPlayerStatistics is undefined');
            continue;
        }
        const matchedPlayer = allPlayerStatistics.find(p => p.player && p.player.id === player.player.id);
        const rating = matchedPlayer && matchedPlayer.statistics && matchedPlayer.statistics[0] && matchedPlayer.statistics[0].games && matchedPlayer.statistics[0].games.rating
            ? parseFloat(matchedPlayer.statistics[0].games.rating)
            : 0;

        if (matchedPlayer) {
            const isBest = checkIfBestPlayer(playerStatistics, matchedPlayer, habilidade);
            playerRatings.push({ rating, skill: habilidade, isBest, playerId: player.player.id });
        } else {
            console.warn(`No matched player found for player id: ${player.player.id}`);
        }
    }

    console.log('Player ratings:', playerRatings);
    return playerRatings;
}

function checkIfBestPlayer(playerStatistics, matchedPlayer, habilidade) {
    let skillCategory;

    switch (habilidade) {
        case 'Defesas':
            skillCategory = 'player_maior_defesas';
            break;
        case 'Desarmes':
            skillCategory = 'player_maior_desarme';
            break;
        case 'Dribles':
            skillCategory = 'player_maior_dribles';
            break;
        case 'Passes':
            skillCategory = 'player_maior_passes';
            break;
        case 'Gols':
            skillCategory = 'player_maior_gols';
            break;
        default:
            skillCategory = '';
    }

    let isBest = false;

    if (skillCategory && Array.isArray(playerStatistics.habilidades)) {
        playerStatistics.habilidades.forEach(habilidadeObj => {
            if (habilidadeObj[skillCategory] && Array.isArray(habilidadeObj[skillCategory][Object.keys(habilidadeObj[skillCategory])[0]])) {
                const bestPlayers = habilidadeObj[skillCategory][Object.keys(habilidadeObj[skillCategory])[0]];
                const bestPlayer = bestPlayers.find(bp => bp.id === matchedPlayer.player.id && bp.ranking === 1);
                if (bestPlayer) {
                    isBest = true;
                }
            }
        });
    }

    return isBest;
}

async function updateBetsPlayers(bubbleId, playerRatings, skillPoints) {
    for (let player of playerRatings) {
        const playerSkillPoints = player.isBest ? player.rating * 2 : player.rating;
        const updateFieldsBetsPlayers = {
            'pontosCategoria.Dobrou': player.isBest,
            'totalDePontos': playerSkillPoints,
            'pontosCalculados': true
        };

        await dataAccess.updateBetsPlayers(bubbleId, player.playerId, updateFieldsBetsPlayers)
            .then(() => {
                console.log('Update successful for player:', player.playerId);
            })
            .catch((error) => {
                console.error('Error updating BetsPlayers:', error);
            });
    }
}

module.exports = {
    getPlayerRatings,
    updateBetsPlayers,
};
