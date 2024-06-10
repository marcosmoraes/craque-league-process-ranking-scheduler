const { createRanking } = require('./calculate-ranking-service');
describe('createRanking', () => {
    test('should return a sorted ranking based on total points', () => {
        const userPoints = {
            user1: { gamePoints: 10, playerPoints: 42.9 },
            user2: { gamePoints: 5, playerPoints: 43.9 }
        };

        const expectedRanking = [
            { userId: 'user1', points: 52.9 },
            { userId: 'user2', points: 48.9 }
        ];

        const ranking = createRanking(userPoints);
        expect(ranking).toEqual(expectedRanking);
    });

    test('should handle empty userPoints', () => {
        const userPoints = {};
        const expectedRanking = [];
        const ranking = createRanking(userPoints);
        expect(ranking).toEqual(expectedRanking);
    });

    test('should handle userPoints with zero points', () => {
        const userPoints = {
            user1: { gamePoints: 0, playerPoints: 0 },
            user2: { gamePoints: 0, playerPoints: 0 }
        };

        const expectedRanking = [
            { userId: 'user1', points: 0 },
            { userId: 'user2', points: 0 }
        ];

        const ranking = createRanking(userPoints);
        expect(ranking).toEqual(expectedRanking);
    });

    test('should correctly sum gamePoints and playerPoints', () => {
        const userPoints = {
            user1: { gamePoints: 5, playerPoints: 10 },
            user2: { gamePoints: 3, playerPoints: 7 }
        };

        const expectedRanking = [
            { userId: 'user1', points: 15 },
            { userId: 'user2', points: 10 }
        ];

        const ranking = createRanking(userPoints);
        expect(ranking).toEqual(expectedRanking);
    });

    test('should return a sorted ranking even with negative points', () => {
        const userPoints = {
            user1: { gamePoints: -5, playerPoints: 10 },
            user2: { gamePoints: 5, playerPoints: -10 },
            user3: { gamePoints: -5, playerPoints: -5 }
        };

        const expectedRanking = [
            { userId: 'user1', points: 5 },
            { userId: 'user2', points: -5 },
            { userId: 'user3', points: -10 }
        ];

        const ranking = createRanking(userPoints);
        expect(ranking).toEqual(expectedRanking);
    });

    test('should handle NaN points', () => {
        const userPoints = {
            user1: { gamePoints: NaN, playerPoints: 10 },
            user2: { gamePoints: 5, playerPoints: NaN },
            user3: { gamePoints: NaN, playerPoints: NaN }
        };

        const expectedRanking = [
            { userId: 'user1', points: 10 },
            { userId: 'user2', points: 5 },
            { userId: 'user3', points: 0 }
        ];

        const ranking = createRanking(userPoints);
        expect(ranking).toEqual(expectedRanking);
    });
});






