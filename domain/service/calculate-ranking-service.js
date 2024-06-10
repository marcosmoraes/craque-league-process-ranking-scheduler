function createRanking(userPoints) {
    console.log('User points:', userPoints);
    
    const ranking = Object.keys(userPoints).map(userId => {
        const { gamePoints, playerPoints } = userPoints[userId];
        const totalPoints = (Number.isFinite(gamePoints) ? gamePoints : 0) + (Number.isFinite(playerPoints) ? playerPoints : 0);
        console.log(`User: ${userId}, Game Points: ${gamePoints}, Player Points: ${playerPoints}, Total Points: ${totalPoints}`);
        return { userId, points: totalPoints };
    });

    return ranking.sort((a, b) => {
        if (b.points === a.points) {
            return a.userId.localeCompare(b.userId);
        }
        return b.points - a.points;
    });
}

module.exports = { createRanking };