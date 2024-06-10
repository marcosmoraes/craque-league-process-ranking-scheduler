/*
Acertar o time vencedor ou empate: 5 pontos
Acertar o saldo de gols em caso de vitória: +5 pontos
Acertar o número de gols dos times em caso de empate: +5 pontos
*/

// Verifica se o usuário acertou o vencedor do jogo ou previu um empate corretamente.
function checkWinnerOrDraw(userBet, actualResult) {
    if ((userBet.home.goals > userBet.away.goals && actualResult.home > actualResult.away) ||
        (userBet.home.goals < userBet.away.goals && actualResult.home < actualResult.away) ||
        (userBet.home.goals === userBet.away.goals && actualResult.home === actualResult.away)) {
        return 5;
    }
    return 0;
}

// Verifica se o usuário acertou a diferença de gols em um jogo que não terminou em empate.
function checkGoalDifferenceForVictory(userBet, actualResult) {
    if ((userBet.home.goals - userBet.away.goals === actualResult.home - actualResult.away) && actualResult.home !== actualResult.away) {
        return 5;
    }
    return 0;
}

// Verifica se o usuário acertou o número exato de gols para cada time em um empate.
function checkGoalsForDraw(userBet, actualResult) {
    if (userBet.home.goals === actualResult.home && userBet.away.goals === actualResult.away && actualResult.home === actualResult.away) {
        return 5;
    }
    return 0;
}

// Calcula os pontos totais baseados no resultado do jogo, combinando as verificações de vencedor/empate, diferença de gols e gols exatos em empates.
function calculateGameResultPoints(userBet, actualResult) {
   // console.log('Calculating game result points for user bet:', userBet);
   // console.log('Actual result:', actualResult);
    let points = 0;

    points += checkWinnerOrDraw(userBet, actualResult);
    points += checkGoalDifferenceForVictory(userBet, actualResult);
    points += checkGoalsForDraw(userBet, actualResult);

    //console.log(`Total points earned: ${points}`);
    return points;
}

function calculateSkillPoints(playerRatings, bestPlayerSkill) {
    let points = 0;

    playerRatings.forEach(player => {
        if (player.isBest) {
            points += player.rating * 2; // Dobrar a nota se for o melhor
        } else {
            points += player.rating;
        }
    });

    return points;
}

module.exports = {
    checkWinnerOrDraw,
    checkGoalDifferenceForVictory,
    checkGoalsForDraw,
    calculateGameResultPoints,
    calculateSkillPoints
};
