/*/*
--- Resultado da partida ---
Acertar o time vencedor ou empate: +5 pontos
Acertar o saldo de gols em caso de vitória: +5 pontos
Acertar o número de gols dos times em caso de empate: +5 pontos

--- Escalação em cada habilidade ---
Pontua a nota do jogador referente ao seu jogo
Se o seu jogador escolhido na habilidade for o melhor dela em seu jogo, a nota dele é duplicada com o Dobrou!
 */

const {
    checkWinnerOrDraw,
    checkGoalDifferenceForVictory,
    checkGoalsForDraw,
    calculateGameResultPoints,
    calculateSkillPoints
} = require('../service/calculate-points-league-service');

describe('Game Points Calculation', () => {
    describe('checkWinnerOrDraw', () => {
        test('should return 5 points for correct home winner prediction', () => {
            const userBet = { home: { goals: 2 }, away: { goals: 1 } };
            const actualResult = { home: 2, away: 1 };
            expect(checkWinnerOrDraw(userBet, actualResult)).toBe(5);
        });

        test('should return 5 points for correct away winner prediction', () => {
            const userBet = { home: { goals: 1 }, away: { goals: 2 } };
            const actualResult = { home: 1, away: 2 };
            expect(checkWinnerOrDraw(userBet, actualResult)).toBe(5);
        });

        test('should return 5 points for correct draw prediction', () => {
            const userBet = { home: { goals: 1 }, away: { goals: 1 } };
            const actualResult = { home: 1, away: 1 };
            expect(checkWinnerOrDraw(userBet, actualResult)).toBe(5);
        });

        test('should return 5 points for incorrect prediction with correct winner', () => {
            const userBet = { home: { goals: 3 }, away: { goals: 1 } }; // User predicts home win
            const actualResult = { home: 2, away: 0 }; // Home wins, but goal numbers are different
            expect(checkWinnerOrDraw(userBet, actualResult)).toBe(5);
        });

        test('should return 0 points for completely incorrect prediction', () => {
            const userBet = { home: { goals: 2 }, away: { goals: 1 } }; // User predicts home win
            const actualResult = { home: 1, away: 3 }; // Away wins
            expect(checkWinnerOrDraw(userBet, actualResult)).toBe(0);
        });
    });



    describe('checkGoalDifferenceForVictory', () => {
        test('should return 5 points for correct goal difference prediction', () => {
            const userBet = { home: { goals: 3 }, away: { goals: 1 } };
            const actualResult = { home: 4, away: 2 };
            expect(checkGoalDifferenceForVictory(userBet, actualResult)).toBe(5);
        });

        test('should return 0 points for incorrect goal difference with correct winner', () => {
            const userBet = { home: { goals: 3 }, away: { goals: 1 } };
            const actualResult = { home: 4, away: 1 };
            expect(checkGoalDifferenceForVictory(userBet, actualResult)).toBe(0);
        });

        test('should return 0 points for a draw', () => {
            const userBet = { home: { goals: 2 }, away: { goals: 2 } };
            const actualResult = { home: 2, away: 2 };
            expect(checkGoalDifferenceForVictory(userBet, actualResult)).toBe(0);
        });
    });

    describe('checkGoalsForDraw', () => {
        test('should return 5 points for correct goal numbers in a draw', () => {
            const userBet = { home: { goals: 2 }, away: { goals: 2 } };
            const actualResult = { home: 2, away: 2 };
            expect(checkGoalsForDraw(userBet, actualResult)).toBe(5);
        });

        test('should return 0 points for incorrect goal numbers in a draw', () => {
            const userBet = { home: { goals: 3 }, away: { goals: 3 } };
            const actualResult = { home: 2, away: 2 };
            expect(checkGoalsForDraw(userBet, actualResult)).toBe(0);
        });

        test('should return 0 points when it is not a draw', () => {
            const userBet = { home: { goals: 2 }, away: { goals: 3 } };
            const actualResult = { home: 3, away: 2 };
            expect(checkGoalsForDraw(userBet, actualResult)).toBe(0);
        });
    });

    describe('calculateGameResultPoints', () => {
        test('should sum points correctly when all conditions are met', () => {
            const userBet = { home: { goals: 2 }, away: { goals: 1 } };
            const actualResult = { home: 2, away: 1 };
            expect(calculateGameResultPoints(userBet, actualResult)).toBe(10);  // Correto, pois vencedor e diferença de gols estão corretos.
        });


        test('should calculate correct points for a perfect draw prediction', () => {
            const userBet = { home: { goals: 1 }, away: { goals: 1 } };
            const actualResult = { home: 1, away: 1 };
            expect(calculateGameResultPoints(userBet, actualResult)).toBe(10);  // Points for both draw and exact goal match.
        });

        test('should return zero points for completely incorrect prediction', () => {
            const userBet = { home: { goals: 0 }, away: { goals: 3 } };
            const actualResult = { home: 3, away: 0 };
            expect(calculateGameResultPoints(userBet, actualResult)).toBe(0);  // No conditions met.
        });
    });
});

describe('calculateSkillPoints', () => {
    test('should return 0 when playerRatings is empty', () => {
        const playerRatings = [];
        const bestPlayerSkill = 'Defesas';
        const result = calculateSkillPoints(playerRatings, bestPlayerSkill);
        expect(result).toBe(0);
    });

    test('should return the sum of ratings when no player has the best skill', () => {
        const playerRatings = [
            { rating: 5, skill: 'Gols', isBest: false },
            { rating: 5, skill: 'Passes', isBest: false }
        ];
        const bestPlayerSkill = 'Defesas';
        const result = calculateSkillPoints(playerRatings, bestPlayerSkill);
        expect(result).toBe(10); // 5 + 5
    });

    test('should return the sum of ratings when players have the best skill but none is the best', () => {
        const playerRatings = [
            { rating: 5, skill: 'Defesas', isBest: false },
            { rating: 5, skill: 'Passes', isBest: false }
        ];
        const bestPlayerSkill = 'Defesas';
        const result = calculateSkillPoints(playerRatings, bestPlayerSkill);
        expect(result).toBe(10); // 5 + 5
    });

    test('should double the rating for the best player with the best skill', () => {
        const playerRatings = [
            { rating: 5, skill: 'Defesas', isBest: true },
            { rating: 5, skill: 'Passes', isBest: false }
        ];
        const bestPlayerSkill = 'Defesas';
        const result = calculateSkillPoints(playerRatings, bestPlayerSkill);
        expect(result).toBe(15); // 10 (doubled) + 5
    });

    test('should double the rating for the best player with the best skill in two different skills', () => {
        const playerRatings = [
            { rating: 5, skill: 'Defesas', isBest: true },
            { rating: 5, skill: 'Passes', isBest: true }
        ];
        const bestPlayerSkill = 'Defesas';
        const result = calculateSkillPoints(playerRatings, bestPlayerSkill);
        expect(result).toBe(20); // 10 (doubled for Defesas) + 10 (doubled for Passes)
    });

    test('should correctly sum ratings and double the rating for the best player among multiple players', () => {
        const playerRatings = [
            { rating: 5, skill: 'Defesas', isBest: true },
            { rating: 5, skill: 'Defesas', isBest: false },
            { rating: 5, skill: 'Passes', isBest: true },
            { rating: 5, skill: 'Gols', isBest: false }
        ];
        const bestPlayerSkill = 'Defesas';
        const result = calculateSkillPoints(playerRatings, bestPlayerSkill);
        expect(result).toBe(30); // 10 (doubled for Defesas) + 5 + 10 (doubled for Passes) + 5
    });
});



